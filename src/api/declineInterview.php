<?php
include 'dbconnect.php'; 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php'; 
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();  
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}
$data = json_decode(file_get_contents('php://input'), true);
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $application_id = isset($data['application_id']) ? $data['application_id'] : null;
    $job_id = isset($data['job_id']) ? $data['job_id'] : null;
    $reason = isset($data['reason']) ? $data['reason'] : null;
    $interview_id = isset($data['interview_id']) ? $data['interview_id'] : null;
    $jobTitle = isset($data['jobTitle']) ? $data['jobTitle'] : null;
    $email = isset($data['email']) ? $data['email'] : null;
    $firstname = isset($data['firstname']) ? $data['firstname'] : null;
    $lastname = isset($data['lastname']) ? $data['lastname'] : null;
    $company_name = isset($data['company_name']) ? $data['company_name'] : null;
    $messages = "The applicant has declined the interview schedule for the $jobTitle position.";


    try {
        $declined_sql = "INSERT INTO js_declined_schedule (interview_id, reason) 
        VALUES (:interview_id, :reason)";
        $declined_stmt = $conn->prepare($declined_sql);
        $declined_stmt->bindParam(':interview_id', $interview_id, PDO::PARAM_INT);
        $declined_stmt->bindParam(':reason', $reason, PDO::PARAM_STR);
        $declined_stmt->execute();

        $email_message = html_entity_decode($reason ?? "No message available", ENT_QUOTES | ENT_HTML5);
        $email_message_plain = strip_tags($email_message);  

        $email_message_plain = strip_tags($email_message, '<li><p><h3>');  
        $email_message_plain = preg_replace('/<h[1-6]>(.*?)<\/h[1-6]>/i', "$1\n\n", $email_message_plain);
        $email_message_plain = preg_replace('/<p>(.*?)<\/p>/i', "$1\n\n", $email_message_plain);
        $email_message_plain = preg_replace('/<li>(.*?)<\/li>/i', "• $1\n", $email_message_plain);
        $email_message_plain = strip_tags($email_message_plain);
        $email_message_plain = preg_replace('/\n{2,}/', "\n\n", trim($email_message_plain));

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USER'];
        $mail->Password = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['SMTP_PORT'];

        $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
        $mail->addAddress($email);
        $mail->isHTML(false); 
        $mail->Subject = trim($firstname) . ' ' . trim($lastname) . ' ' . ' declined the interview schedule with ' . $company_name;
        $mail->Body = trim($email_message_plain);  
        $mail->send();

        $stmt = $conn->prepare("UPDATE js_interview_schedule SET status = 'Declined' WHERE application_id = :application_id AND job_id = :job_id");
        $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
        $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);

        $stmt->execute();

        $notification_employer_sql = "INSERT INTO js_employer_notification (application_id, job_id, message, type) 
        VALUES (:application_id, :job_id, :message, 'declined')";
        $notif_employer_stmt = $conn->prepare($notification_employer_sql);
        $notif_employer_stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
        $notif_employer_stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
        $notif_employer_stmt->bindParam(':message', $messages, PDO::PARAM_STR);
        $notif_employer_stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Interview status updated successfully']);
        } else {
            echo json_encode(['success' => false]);
        }

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
