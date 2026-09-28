<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/../config/db.php';

try {
    $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
    $projects = $stmt->fetchAll();

    foreach ($projects as &$project) {
        $mediaStmt = $pdo->prepare("SELECT file_path, file_type FROM project_media WHERE project_id = :id");
        $mediaStmt->execute([':id' => $project['id']]);
        $project['media'] = $mediaStmt->fetchAll();
    }

    echo json_encode(["success" => true, "data" => $projects]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Could not fetch projects."]);
}