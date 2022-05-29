<?php
session_start();

if(isset($_SESSION['user']))
{
    header('Location: home.php');
    exit; 
}

$cred = json_decode(file_get_contents('php://input'), true);

if(isset($cred['username'])&& isset($cred['password'])) {
    
    $conn=mysqli_connect('localhost','root','','hw1');
    $username=mysqli_real_escape_string($conn,$cred['username']);
    $password=mysqli_real_escape_string($conn,$cred['password']);
    
    $query="SELECT * FROM  users where username='$username' ";
    $res= mysqli_query($conn,$query);
    
    if(mysqli_num_rows($res)>0){
    $db_cred = mysqli_fetch_assoc($res);
    
    if (password_verify($cred['password'], $db_cred['password'])){
        $_SESSION['user']=$cred['username'];
        echo 'ok';
    } else {
    echo 'pass_err';
    }
    }else{
        echo 'no_reg' ;
    }
    mysqli_free_result($res);
    mysqli_close($conn);}
?>

<html>
    <head>
        <meta charset="utf-8">
        <title>Login</title>
        <link rel="stylesheet" href="reg_log.css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="login.js" defer></script>
    </head>
       <body>
        <main>
        <h1> Login </h1>
        <div id="loghi">
        <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6MwCgv7v-hiJBQDR6cZRu_xxnxIDdPxOhw&usqp=CAU"/>
        <img src="img/logo1.png"/>
        </div>
        <form name='log_form' method='post'>
             <p>
                <label>Username <input type='text' name='username'></label>
            </p>
            <p>
                <label>Password <input type='password' name='password'></label>
            </p>
            <p>
                <label>&nbsp;<input type='submit'></label>
            </p>
        </form>
        <div class='errori'>
    </div><br>
    <div class='errori2'>
    </div><br>
    <div class="hidden">Registrati al seguente link! <a href="reg.php"> Registrazione  </a> </div>  
</main>
</body>
</html>