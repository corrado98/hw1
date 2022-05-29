<?php
session_start();

if(!isset($_SESSION['user']))
{
    header('Location: login.php');
    exit; 
}

$user = $_SESSION['user'];

$conn=mysqli_connect('localhost','root','','hw1');
$query= "SELECT * FROM pref WHERE user= '$user' ";

$res= mysqli_query($conn,$query);
$eventi = array("lunghezza" => mysqli_num_rows($res));

while($row = mysqli_fetch_assoc($res)){
    $eventi[] = $row;
}

$events  = json_encode($eventi);
print_r($events) ;

mysqli_free_result($res);
mysqli_close($conn);



?>