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

$title = trim($_POST['title'] ?? '');
$body = trim($_POST['body'] ?? '');

if (!$title || !$body) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Title and body are required."]);
    exit();
}

$allowedTypes = [
    'video/mp4' => 'video',
    'video/webm' => 'video',
    'video/quicktime' => 'video',
    'audio/mpeg' => 'audio',
    'audio/wav' => 'audio',
    'audio/mp3' => 'audio',
    'image/jpeg' => 'image',
    'image/png' => 'image',
    'image/webp' => 'image',
    'image/gif' => 'image',
];

$uploadDir = __DIR__ . '/../uploads/projects/';
$uploadedFiles = [];

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("INSERT INTO projects (title, body) VALUES (:title, :body)");
    $stmt->execute([':title' => $title, ':body' => $body]);
    $projectId = $pdo->lastInsertId();

    if (!empty($_FILES['media'])) {
        $fileCount = count($_FILES['media']['name']);

        for ($i = 0; $i < $fileCount; $i++) {
            if ($_FILES['media']['error'][$i] !== UPLOAD_ERR_OK) {
                continue;
            }

            $mimeType = $_FILES['media']['type'][$i];
            if (!isset($allowedTypes[$mimeType])) {
                continue;
            }

            $fileType = $allowedTypes[$mimeType];
            $originalName = basename($_FILES['media']['name'][$i]);
            $safeName = time() . '_' . $i . '_' . preg_replace('/[^A-Za-z0-9._-]/', '', $originalName);
            $destination = $uploadDir . $safeName;

            if (move_uploaded_file($_FILES['media']['tmp_name'][$i], $destination)) {
                $relativePath = 'uploads/projects/' . $safeName;

                $mediaStmt = $pdo->prepare(
                    "INSERT INTO project_media (project_id, file_path, file_type) VALUES (:project_id, :file_path, :file_type)"
                );
                $mediaStmt->execute([
                    ':project_id' => $projectId,
                    ':file_path' => $relativePath,
                    ':file_type' => $fileType,
                ]);

                $uploadedFiles[] = $relativePath;
            }
        }
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Project created successfully.",
        "id" => $projectId,
        "uploadedFiles" => $uploadedFiles,
    ]);

} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Could not create project."]);
}