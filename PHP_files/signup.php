<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $json_data = file_get_contents("php://input");
    
    $data = json_decode($json_data, true);

    $email = $data["email"];
    $username = $data["username"];
    $password = $data["password"];

    if (empty($email) || empty($username) || empty($password)) {
        echo "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
    } elseif (strlen($username) < 3 || strlen($username) > 20) {
        echo "Username must be between 3 and 20 characters.";
    } elseif (strlen($password) < 6) {
        echo "Password must be at least 6 characters long.";
    } else {
        $conn = new mysqli("localhost", "root", "", "TodoUsers");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $email, $username, $password);

        if ($stmt->execute()) {
            echo "User registered successfully!";
        } else {
            echo "Error: " . $conn->error;
        }
        
        $stmt->close();
        $conn->close();
    }
}