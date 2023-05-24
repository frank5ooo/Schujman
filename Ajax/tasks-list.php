<?php

  include('database.php');

  $query = "SELECT * from todotabla";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => $row['name'],
      'apellido' => $row['apellido'],
      'id' => $row['id'],
      'dni' => $row['dni'],
      'mail' => $row['mail']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
