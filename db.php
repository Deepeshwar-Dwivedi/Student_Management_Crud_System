<?php
$host = "localhost";
$user = "root";
$pass = ""; // Change if your MySQL has a password
$db   = "student_management";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>