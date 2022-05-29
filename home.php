<?php

session_start();

if(!isset($_SESSION['user']))
{
    header('Location: login.php');
    exit; 
}
?>

<html>
   <head>
    <link rel="stylesheet" href="home.css" />
    <script src="home.js" defer></script>
    <title>Eventfinder</title>
</head>
   <body>
       <article>
           <header>
           <div id= "logo"><img src="img/logo1.png"/></div>    
           <nav>
            <a href="logout.php"> Logout </a>
               </nav>
           </header>
           <section class="welcome">
            <div> <?php echo "Benvenuto <a>".$_SESSION['user']."</a>" ?> </div>
            <button id = "vis"> Visualizza i tuoi preferiti </button>
        </section>
<section id="preferiti" >

</section>
<section class ="ric_1" class='blocco1'>
<div id = cont class='blocco1'>
    <div id=img1 class='blocco1'>
    
    </div>
    <div id= img2 class='blocco1'>
    
    </div>    
</div>
   
<form name='ricerca_evento' method='post' id='cerca' class='blocco1' >
                <a id = 'tit'>Cerca un evento!</a>
                <p>
                <label>Evento<input type='text' name='evento'></label>
                </p>
                <p>
                <label>Nazione(ISO CODE)<input type='text' name='nazione'></label>
                </p>
                <p>
                <label>Città<input type='text' name='citta'></label>
                </p>
                <p>
                <label id="nom">Data dell'evento <input type='date' name='data' id='data'></label>
                </p>
                <p>
                <label>&nbsp;<input type='submit' id='submit' value='Cerca' ></label>
                </p>
                <p>
                <a href="https://countrycode.org/"> Trova qui il Codice della Nazione (ISO CODES)</a><br>
                
                <a class = 'hidden' id ='err_p'> Inserire evento! </a><br>
                </p>
                <p id='avviso'>Inserire i dati in inglese</p>

    </form>

</section> 

<section id="sect" class="hidden" >

</section>    
<footer>
<?php echo " <a> Account: ".$_SESSION['user']."</a>" ?>
</footer>    
</article>
   </body> 
</html>