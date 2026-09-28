<?php

require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

if (!getenv('MAIL_HOST')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
}

function env($key) {
    return $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key) ?: null;
}

function sendQuoteEmail($fullName, $customerEmail, $product, $whatsappNumber, $message) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = env('MAIL_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = env('MAIL_USERNAME');
        $mail->Password = env('MAIL_PASSWORD');
        $mail->SMTPSecure = 'ssl';
        $mail->Port = env('MAIL_PORT');

        $mail->setFrom(env('MAIL_FROM'), 'Futurica Automations and Integrated Service Ltd');
        $mail->addAddress(env('OWNER_EMAIL'));
        $mail->addReplyTo($customerEmail, $fullName);

        $mail->isHTML(true);
        $mail->Subject = "New Quote Request: $product";

        $mail->Body = "
        <html>
        <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f7f9;'>
            <table width='100%' border='0' cellspacing='0' cellpadding='0' style='background-color: #f4f7f9; padding: 20px;'>
                <tr>
                    <td align='center'>
                        <table width='600' border='0' cellspacing='0' cellpadding='0' style='background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);'>
                            <!-- Header -->
                            <tr>
                                <td style='background-color: #D4AF37; padding: 30px; text-align: center;'>
                                    <h2 style='color: #1E3A8A; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 20px;'>Futurica Automations and Integrated Service Ltd</h2>
                                </td>
                            </tr>
                            <!-- Slate accent bar -->
                            <tr>
                                <td style='background-color: #0f172a; height: 4px; padding: 0; font-size: 0; line-height: 0;'>&nbsp;</td>
                            </tr>
                            <!-- Content -->
                            <tr>
                                <td style='padding: 40px;'>
                                    <h3 style='color: #0A0A0A; margin-top: 0;'>New Quote Request</h3>
                                    <p style='color: #555555; line-height: 1.5;'>You have received a new quote request from the website. Here are the details:</p>

                                    <table width='100%' style='margin: 20px 0;'>
                                        <tr>
                                            <td style='padding: 8px 0; border-bottom: 1px solid #eeeeee;'><strong>Full Name:</strong></td>
                                            <td style='padding: 8px 0; border-bottom: 1px solid #eeeeee; color: #333;'>$fullName</td>
                                        </tr>
                                        <tr>
                                            <td style='padding: 8px 0; border-bottom: 1px solid #eeeeee;'><strong>Email:</strong></td>
                                            <td style='padding: 8px 0; border-bottom: 1px solid #eeeeee; color: #1E3A8A;'>$customerEmail</td>
                                        </tr>
                                        <tr>
                                            <td style='padding: 8px 0; border-bottom: 1px solid #eeeeee;'><strong>Product:</strong></td>
                                            <td style='padding: 8px 0; border-bottom: 1px solid #eeeeee; color: #333;'>$product</td>
                                        </tr>
                                        <tr>
                                            <td style='padding: 8px 0; border-bottom: 1px solid #eeeeee;'><strong>WhatsApp Number:</strong></td>
                                            <td style='padding: 8px 0; border-bottom: 1px solid #eeeeee; color: #333;'>$whatsappNumber</td>
                                        </tr>
                                    </table>

                                    <div style='background-color: #f9f9f9; padding: 20px; border-left: 4px solid #D4AF37; border-radius: 4px;'>
                                        <p style='margin: 0; font-style: italic; color: #444;'>\"$message\"</p>
                                    </div>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style='background-color: #0A0A0A; padding: 15px; text-align: center;'>
                                    <p style='color: #999999; font-size: 12px; margin: 0;'>Futurica Automations and Integrated Service Ltd &middot; Automated notification from your website</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>";

        $mail->send();
    } catch (Exception $e) {
        error_log("Mailer error: {$mail->ErrorInfo}");
    }
}