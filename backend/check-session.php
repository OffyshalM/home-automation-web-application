<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

session_start();

require_once __DIR__ . '/../config/db.php';

if (isset($_SESSION['admin_id'])) {
    $stmt = $pdo->prepare("SELECT email FROM admins WHERE id = :id");
    $stmt->execute([':id' => $_SESSION['admin_id']]);
    $admin = $stmt->fetch();

    echo json_encode([
        "success" => true,
        "loggedIn" => true,
        "adminEmail" => $admin['email'] ?? null,
    ]);
} else {
    echo json_encode(["success" => true, "loggedIn" => false]);
}