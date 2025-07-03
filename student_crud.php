<?php
include 'db.php';

// Add Student
if(isset($_POST['action']) && $_POST['action'] == "add") {
    $name   = $_POST['name'];
    $email  = $_POST['email'];
    $phone  = $_POST['phone'];
    $course = $_POST['course'];
    $stmt = $conn->prepare("INSERT INTO students (name, email, phone, course) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $course);
    $stmt->execute();
    echo "success";
    exit;
}

// Get Students
if(isset($_GET['action']) && $_GET['action'] == "fetch") {
    $result = $conn->query("SELECT * FROM students ORDER BY id DESC");
    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
    exit;
}

// Update Student
if(isset($_POST['action']) && $_POST['action'] == "update") {
    $id     = $_POST['id'];
    $name   = $_POST['name'];
    $email  = $_POST['email'];
    $phone  = $_POST['phone'];
    $course = $_POST['course'];
    $stmt = $conn->prepare("UPDATE students SET name=?, email=?, phone=?, course=? WHERE id=?");
    $stmt->bind_param("ssssi", $name, $email, $phone, $course, $id);
    $stmt->execute();
    echo "success";
    exit;
}

// Delete Student
if(isset($_POST['action']) && $_POST['action'] == "delete") {
    $id = $_POST['id'];
    $stmt = $conn->prepare("DELETE FROM students WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo "success";
    exit;
}
?>