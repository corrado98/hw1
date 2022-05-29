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

$evento=$cred['evento']; $data=$cred['data']; 
$ora=$cred['ora']; $luogo=$cred['luogo'];
$immagine=$cred['immagine']; $info=$cred['url'];

$query= "DELETE FROM pref WHERE user = '$user' AND evento = '$evento' AND luogo = '$luogo' AND data = '$data'  AND ora = '$ora'  AND immagine = '$immagine' AND info = '$info' ";

$res= mysqli_query($conn,$query);

if($res){ echo "eliminato" ;}else { echo "errore" ;}
mysqli_free_result($res);
mysqli_close($conn);



?>