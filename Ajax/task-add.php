<?php

include('database.php');

if(isset($_POST['name'])) {
  # echo $_POST['name'] . ', ' . $_POST['apellido'];
  $name = $_POST['name'];
  $apellido = $_POST['apellido'];
  $dni = $_POST['dni'];
  $mail = $_POST['mail'];
  $query = "INSERT into todotabla(name, apellido, dni, mail) VALUES ('$name', '$apellido', '$dni', '$mail')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }

  echo "Task Added Successfully";  
}
?>
