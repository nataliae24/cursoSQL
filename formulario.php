<?php

if(empty($_POST) == true) {
        echo "El formulario no ha sido enviado";
} else {
    $name = $_POST['userName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];

    if ($_POST) {
        //data connection db
        $servername = 'localhost';
        $database = 'agenda_db';
        $user = 'root';
        $pswd = '';
        $connection = new mysqli($servername,$user,$pswd,$database);	
 
        if ($connection->connect_error) {
            die("Connection failed: " . $connection->connect_error);
        }

        $sql_insert = "INSERT INTO users (name, lastname, email)
        VALUES ('$name', '$lastName','$email') ";

        if ($connection->query($sql_insert)==true) {
            echo '<script language="javascript">alert("¡Registro con éxito!");window.location.href="index.html"</script>';
        } else {
            echo "Error: " . $sql_insert . "<br>" . $connection->error;
        }
         
        //close connection db
        $connection->close();
    }
}

?>
