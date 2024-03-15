<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    $user_id = $data["user_id"];
    $title = $data["title"];
    $description = $data["description"];
    $completed = $data["completed"];

    $conn = new mysqli("localhost", "root", "", "TodoUsers");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $conn->close();
    http_response_code(200);
    echo "Todo created successfully.";
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}