<?php

include('database.php');

if(isset($_POST['id'])) {
  $task_name = $_POST['name']; 
  $task_apellido = $_POST['apellido'];
  $id = $_POST['id'];
  $dni = $_POST['dni'];
  $mail = $_POST['mail'];
  $query = "UPDATE todotabla SET name = '$task_name', apellido = '$task_apellido', dni = '$dni', mail = '$mail' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "Task Update Successfully";

}
?>
