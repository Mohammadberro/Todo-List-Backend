<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $json_data = file_get_contents("php://input");
    
    $data = json_decode($json_data, true);

    $emailOrUsername = $data["emailOrUsername"];
    $password = $data["password"];

    $conn = new mysqli("localhost", "root", "", "TodoUsers");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM users WHERE email = ? OR username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $emailOrUsername, $emailOrUsername);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if ($password === $row["password"]) {
            echo "Login successful!";
        } else {
            echo "Incorrect password.";
        }
    } else {
        echo "User not found.";
    }

    $stmt->close();
    $conn->close();
}