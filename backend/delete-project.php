<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "error" => "Not authenticated."]);
    exit();
}

require_once __DIR__ . '/../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);
$projectId = $data['id'] ?? null;

if (!$projectId) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Project ID required."]);
    exit();
}

try {
    $mediaStmt = $pdo->prepare("SELECT file_path FROM project_media WHERE project_id = :id");
    $mediaStmt->execute([':id' => $projectId]);
    $mediaFiles = $mediaStmt->fetchAll();

    foreach ($mediaFiles as $file) {
        $fullPath = __DIR__ . '/../' . $file['file_path'];
        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
    }

    $stmt = $pdo->prepare("DELETE FROM projects WHERE id = :id");
    $stmt->execute([':id' => $projectId]);

    echo json_encode(["success" => true, "message" => "Project deleted."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Could not delete project."]);
}