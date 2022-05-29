
<?php
session_start();
$cred = json_decode(file_get_contents('php://input'), true);

if(isset($cred['username'])&&isset($cred['nome'])&&isset($cred['cognome'])&&isset($cred['email'])&&isset($cred['password'])){

    $conn =mysqli_connect('localhost','root','','hw1') or die(mysqli_error($conn));
    $error=array();
    
    if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $cred['username'])) {
        echo "Usernamenonvalido";
        $error[] = "Username non valido";
    } else {
        $username = mysqli_real_escape_string($conn, $cred['username']);
        $q1 = "SELECT username FROM users WHERE username='$username'";
        $res = mysqli_query($conn, $q1);
        if (mysqli_num_rows($res) > 0) {
            echo 'Utilizzato';
            $error[] = "Username utilizzato";
        }
    }
    if (strlen($cred["password"]) < 8 || strlen($cred["password"]) > 16) {
        $error[] = "La password deve contenere da 8 a 16 caratteri";
    }

    if (!filter_var($cred['email'], FILTER_VALIDATE_EMAIL)) {
       echo "Emailnonvalida";
       $error[] = "Email non valida";
    } else {
        $email = mysqli_real_escape_string($conn, strtolower($cred['email']));
        $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
        if (mysqli_num_rows($res) > 0) {
            echo  "Utilizzato";
            $error[] = "Email utilizzata";
        }
    }
    if (count($error) == 0) {
        $name = mysqli_real_escape_string($conn, $cred['nome']);
        $surname = mysqli_real_escape_string($conn, $cred['cognome']);

        $password = mysqli_real_escape_string($conn, $cred['password']);
        $password = password_hash($password, PASSWORD_BCRYPT);

        $query = "INSERT INTO users(username, password, name, surname, email) VALUES('$username', '$password', '$name', '$surname', '$email')";
        
        if (mysqli_query($conn, $query)) {
            echo "registrato";
            mysqli_close($conn);
            exit;
        }else {
            echo "erroredb";
            $error[] = "erroredb";
        }
    }
    mysqli_free_result($res);
    mysqli_close($conn);
}

?>

<html>
    <head>
        <meta charset="utf-8">
        <title>Registrazione</title>
        <link rel="stylesheet" href="reg_log.css"/>
        <script src="reg.js" defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
        <!-- specificare action -->
       <body>
        <main>
        <h1> Registrazione </h1>
        <div id="loghi">
        <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSoqe_MhG0alZP5qTK0f_T0CqVqNh-S68yeQ&usqp=CAU"/>
        <img src="img/logo1.png"/>
        </div>
        <form name='reg' method='post' id='registra'>
                <p>
            <label>Nome <input type='text' name='nome' id='no'></label>
                </p>
                <p>
                <label>Cognome <input type='text' name='cognome' id='cogn'></label>
                </p>
                <p>
                <label>E-mail <input type='text' name='email'id='e_mail'></label>
                </p>
                <p>
                <label id="nom">Username <input type='text' name='username' id='nome_ut'></label>
                </p>
                <p>
                <label>Password <input type='password' name='password' id ='pass'></label>
                </p>
                <p>
                <label>&nbsp;<input type='submit' id='submit' value='Registrati' ></label>
                </p>
        </form>
        <div class='errori'>
    </div><br>
    <div class='errori2'>
    </div><br>
    <div class='errori3'>
    </div><br>
    <div class='errori4'>
    </div><br>
    <div class='errori5'>
    </div><br>
    <div class='errori6'>
    </div><br>
    <div class="log">Hai già un account? <a href="login.php">Accedi</a> </div>
    
    </main>

</body>
</html>