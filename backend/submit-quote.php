<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/mailer.php';
require_once __DIR__ . '/../helpers/whatsapp.php';

$data = json_decode(file_get_contents("php://input"), true);

$fullName = trim($data['fullName'] ?? '');
$email = trim($data['email'] ?? '');
$product = trim($data['product'] ?? '');
$whatsappNumber = trim($data['whatsappNumber'] ?? '');
$message = trim($data['message'] ?? '');

if (!$fullName || !$email || !$product || !$whatsappNumber) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Missing required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid email address."]);
    exit();
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO submissions (full_name, email, product, whatsapp_number, message)
         VALUES (:full_name, :email, :product, :whatsapp_number, :message)"
    );
    $stmt->execute([
        ':full_name' => $fullName,
        ':email' => $email,
        ':product' => $product,
        ':whatsapp_number' => $whatsappNumber,
        ':message' => $message,
    ]);

    $submissionId = $pdo->lastInsertId();

    sendQuoteEmail($fullName, $email, $product, $whatsappNumber, $message);
    sendWhatsappNotification($fullName, $email, $product, $whatsappNumber, $message);

    echo json_encode([
        "success" => true,
        "message" => "Submission received successfully.",
        "id" => $submissionId
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Could not save submission."]);
}