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
    
    $conn->beginTransaction();

} catch (PDOException $e) {
    $error_message = 'Database connection failed: ' . $e->getMessage();
    die(json_encode(['error' => $error_message]));  
}

$data = json_decode(file_get_contents('php://input'), true);

$channel_name = htmlspecialchars($data['channel_name']);
$date = htmlspecialchars($data['date']);
$time = htmlspecialchars($data['time']);
$message = isset($data['message']) ? htmlspecialchars($data['message']) : null;
$application_id = (int)$data['application_id'];
$employer_id = (int)$data['employer_id'];
$job_id = (int)$data['job_id'];
$email = isset($data['email']) ? htmlspecialchars($data['email']) : null;
$company_name = isset($data['company_name']) ? htmlspecialchars($data['company_name']) : null;
$custom_message = "Your interview has been successfully scheduled. Kindly make a note of this for your reference.";

try {
    $stmt = $conn->prepare("
        INSERT INTO js_interview_schedule (channel_name, schedule, time, message, application_id, employer_id, job_id, status)
        VALUES (:channel_name, :date, :time, :message, :application_id, :employer_id, :job_id, 'Pending')
    ");
    $stmt->bindParam(':channel_name', $channel_name, PDO::PARAM_STR);
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
    $stmt->bindParam(':time', $time, PDO::PARAM_STR);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
    $stmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
    $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
    $stmt->execute();
 
    $schedule_id = $conn->lastInsertId();  
    $retrieve_stmt = $conn->prepare("SELECT message FROM js_interview_schedule WHERE interview_id = :id");
    $retrieve_stmt->bindParam(':id', $schedule_id, PDO::PARAM_INT);
    $retrieve_stmt->execute();
    $schedule = $retrieve_stmt->fetch(PDO::FETCH_ASSOC);


    $email_message = html_entity_decode($schedule['message'] ?? "No message available", ENT_QUOTES | ENT_HTML5);
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
    $mail->Subject = 'Your interview with ' . $company_name . ' has been scheduled.';
    $mail->Body = trim($email_message_plain);  

    if ($mail->send()) {
        $conn->commit();

        $notification_sql = "INSERT INTO js_notification (application_id, job_id, message, type) 
                             VALUES (:application_id, :job_id, :message, 'interview')";
        $notification_stmt = $conn->prepare($notification_sql);
        $notification_stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
        $notification_stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
        $notification_stmt->bindParam(':message', $custom_message, PDO::PARAM_STR);
        $notification_stmt->execute();

        // Update applicant status
        $applied_status = 'To Interview';
        $update_sql = "UPDATE js_applicant_application_resume 
        SET applied_status = :applied_status
        WHERE application_id = :application_id";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bindParam(':applied_status', $applied_status, PDO::PARAM_STR);
        $update_stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
        $update_stmt->execute();

        http_response_code(201);
        echo json_encode(['message' => 'Interview schedule saved and notification sent successfully']);
    } else {
        // Rollback transaction if email failed
        $conn->rollBack();
        throw new Exception('Failed to send email.');
    }

} catch (PDOException $e) {
    // Rollback transaction on database error
    $conn->rollBack();
    $error_message = 'Failed to save interview schedule: ' . $e->getMessage();
    error_log($error_message, 3, 'error.log');
    http_response_code(500);
    echo json_encode(['error' => $error_message]);
} catch (Exception $e) {
    // Rollback transaction on email error
    $conn->rollBack();
    $error_message = $e->getMessage();
    error_log($error_message, 3, 'error.log');
    http_response_code(500);
    echo json_encode(['error' => $error_message]);
}
?>
