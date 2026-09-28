<?php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/db.php';

$email = "futuricaautomations@gmail.com";
$plainPassword = "admin123##";

$hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("SELECT id FROM admins WHERE email = :email");
    $stmt->execute([':email' => $email]);

    if ($stmt->fetch()) {
        echo json_encode(["success" => false, "message" => "Admin with this email already exists."]);
        exit();
    }

    $insert = $pdo->prepare("INSERT INTO admins (email, password_hash) VALUES (:email, :password_hash)");
    $insert->execute([
        ':email' => $email,
        ':password_hash' => $hashedPassword,
    ]);

    echo json_encode(["success" => true, "message" => "Admin account created successfully."]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}