<!-- creating my connection code -->
<?php
$mysqli = new mysqli("127.0.0.1", "cosmirateam", "cosmira25","cosmira", 3306);

    if ($mysqli ->connect_errno) {
        print"Failed Connection! ❌ ". $mysqli->error;
    } 
    
?>