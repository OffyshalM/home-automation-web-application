<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../helpers/mailer.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = env('MAIL_HOST');
    $mail->SMTPAuth = true;
    $mail->Username = env('MAIL_USERNAME');
    $mail->Password = env('MAIL_PASSWORD');
    $mail->SMTPSecure = 'ssl';
    $mail->Port = env('MAIL_PORT');
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {
        echo "DEBUG: $str<br>";
    };

    $mail->setFrom(env('MAIL_FROM'), 'Test');
    $mail->addAddress(env('OWNER_EMAIL'));
    $mail->Subject = "Test Email";
    $mail->Body = "This is a direct test.";

    $mail->send();
    echo "<br>SUCCESS: Email sent!";

} catch (Exception $e) {
    echo "<br>FAILED: " . $mail->ErrorInfo;
}