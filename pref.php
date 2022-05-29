<?php

session_start();

if(!isset($_SESSION['user']))
{
    header('Location: login.php');
    exit; 
}

$user = $_SESSION['user'];
$cred = json_decode(file_get_contents('php://input'), true);
$conn=mysqli_connect('localhost','root','','hw1');
$evento=mysqli_real_escape_string($conn,$cred['titolo']);
$luogo=mysqli_real_escape_string($conn,$cred['luogo']); $ora=mysqli_real_escape_string($conn,$cred['ora']);
$data=mysqli_real_escape_string($conn,$cred['data']); $immagine=mysqli_real_escape_string($conn,$cred['immagine']);
$info=mysqli_real_escape_string($conn,$cred['url']);

$query = "SELECT * FROM pref WHERE user = '$user' AND evento = '$evento' AND luogo = '$luogo' AND data = '$data'  AND ora = '$ora'  AND immagine = '$immagine' AND info = '$info' ";
$res= mysqli_query($conn,$query);

if(mysqli_num_rows($res)>0){
echo 'gia preferito';
mysqli_free_result($res);
mysqli_close($conn);
}else{
$query2 = "INSERT into pref(user, evento, luogo, data, ora, immagine, info) values( '$user', '$evento', '$luogo', '$data', '$ora', '$immagine', '$info')";
$res2= mysqli_query($conn,$query2);
echo 'aggiunto';
mysqli_free_result($res);
mysqli_close($conn);
}
?>