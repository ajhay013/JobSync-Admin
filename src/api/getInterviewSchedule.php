<?php
include 'dbconnect.php';
include 'config.php';  

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()])); 
}

$data = json_decode(file_get_contents('php://input'), true);
$job_id = $data['job_id'] ?? null;
$application_id = $data['application_id'] ?? null;

if ($job_id === null) {
    echo json_encode(['error' => 'Employer ID is required']);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM js_interview_schedule WHERE job_id = :job_id AND application_id = :application_id");
    $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
    $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $interview = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['interview' => $interview]);
    } else {
        echo json_encode(['error' => 'No company information found for the given employer ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
}

$conn = null;
?>
