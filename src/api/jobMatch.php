<?php
include 'dbconnect.php';
include 'config.php';  

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

$OPENAI_API_KEY = "API_KEY";

function getEmbedding($text) {
    global $OPENAI_API_KEY;
    
    $url = "https://api.openai.com/v1/embeddings";
    $data = json_encode([
        "input" => $text,
        "model" => "text-embedding-ada-002"
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $OPENAI_API_KEY",
        "Content-Type: application/json"
    ]);

    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        echo json_encode(["error" => curl_error($ch)]);
        return null;
    }
    
    curl_close($ch);
    
    $responseData = json_decode($response, true);
    return $responseData['data'][0]['embedding'] ?? null;
}

function cosineSimilarity($vecA, $vecB) {
    $dotProduct = 0.0;
    $normA = 0.0;
    $normB = 0.0;

    for ($i = 0; $i < count($vecA); $i++) {
        $dotProduct += $vecA[$i] * $vecB[$i];
        $normA += pow($vecA[$i], 2);
        $normB += pow($vecB[$i], 2);
    }

    return $dotProduct / (sqrt($normA) * sqrt($normB));
}

function aggregateEmbeddings($embeddings) {
    $numEmbeddings = count($embeddings);
    if ($numEmbeddings == 0) return [];

    $aggregated = array_fill(0, count($embeddings[0]), 0);

    foreach ($embeddings as $embedding) {
        for ($i = 0; $i < count($embedding); $i++) {
            $aggregated[$i] += $embedding[$i];
        }
    }

    for ($i = 0; $i < count($aggregated); $i++) {
        $aggregated[$i] /= $numEmbeddings;
    }

    return $aggregated;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputData = json_decode(file_get_contents("php://input"), true);
    $applicant_id = $inputData['applicant_id'] ?? null; 

    if (!$applicant_id) {
        echo json_encode(["error" => "Applicant ID is required."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT m.*, j.* 
                            FROM `js_job_applicant_matches` m
                            JOIN active_job_postings j ON m.job_id = j.job_id 
                            WHERE m.applicant_id = :applicant_id");
    $stmt->execute(['applicant_id' => $applicant_id]);

    $cachedMatches = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $matchedJobs = [];
    foreach ($cachedMatches as $cachedMatch) {
        $matchedJobs[] = [
            'job_id' => $cachedMatch['job_id'],        
            'score' => $cachedMatch['match_score'],    
            'jobTitle' => $cachedMatch['jobTitle'],   
            'company_name' => $cachedMatch['company_name'],      
            'job_description' => $cachedMatch['jobDescription'],  
            'minSalary' => $cachedMatch['minSalary'],  
            'maxSalary' => $cachedMatch['maxSalary'],  
            'city' => $cachedMatch['city'],  
            'jobType' => $cachedMatch['jobType'],  
            'logo' =>  $cachedMatch['logo'],  
        ];
    }

    if (empty($matchedJobs)) {
        // If no cached matches found, perform the matching
        $skills = [];
        $stmt = $conn->prepare("SELECT skill_name FROM js_skills WHERE applicant_id = :applicant_id");
        $stmt->execute(['applicant_id' => $applicant_id]);
        $skills = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $skillEmbeddings = [];
        foreach ($skills as $skill) {
            $embedding = getEmbedding($skill['skill_name']);
            if ($embedding) {
                $skillEmbeddings[] = $embedding;
            }
        }

        $workExperience = [];
        $stmt = $conn->prepare("SELECT job_title FROM js_work_experience WHERE applicant_id = :applicant_id");
        $stmt->execute(['applicant_id' => $applicant_id]);
        $workExperience = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $workEmbeddings = [];
        foreach ($workExperience as $jobTitle) {
            $embedding = getEmbedding($jobTitle['job_title']);
            if ($embedding) {
                $workEmbeddings[] = $embedding;
            }
        }

        $allEmbeddings = array_merge($skillEmbeddings, $workEmbeddings);
        $userEmbedding = aggregateEmbeddings($allEmbeddings);

        if (empty($userEmbedding)) {
            echo json_encode(["error" => "Failed to get valid embeddings for skills and work experience."]);
            exit;
        }

        $stmt = $conn->prepare("SELECT * FROM active_job_postings");
        $stmt->execute();
        $jobResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($jobResult as $jobRow) {
            $jobEmbedding = getEmbedding($jobRow['jobDescription']);
            if (!$jobEmbedding) continue;

            $similarity = cosineSimilarity($userEmbedding, $jobEmbedding);

            $jobRow['score'] = $similarity;
            $matchedJobs[] = $jobRow;

            $insertStmt = $conn->prepare(
                "INSERT INTO js_job_applicant_matches (applicant_id, job_id, match_score) VALUES (:applicant_id, :job_id, :match_score)
                ON DUPLICATE KEY UPDATE match_score = :match_score"
            );
            $insertStmt->execute([
                'applicant_id' => $applicant_id,
                'job_id' => $jobRow['job_id'],
                'match_score' => $similarity
            ]);
        }
    }
    // Sort the matched jobs by score
    usort($matchedJobs, function($a, $b) {
        return $b['score'] <=> $a['score'];
    });

    // Add logo URLs to matched jobs
    foreach ($matchedJobs as &$matchedJob) {
        if (isset($matchedJob['logo']) && !empty($matchedJob['logo'])) {
            $matchedJob['logo'] = BASE_URL . $matchedJob['logo'];
        }
    }

    echo json_encode(["jobs" => $matchedJobs]);
}
?>
