
const errore1 = document.querySelector('#errore1');
const errore2 = document.querySelector('#errore2');
const errore3 = document.querySelector('#errore3');
const errore4 = document.querySelector('#errore4');
let nu = document.querySelector('#nome_ut');
let pass = document.querySelector('#pass');
let nome = document.querySelector('#no');
let cognome = document.querySelector('#cogn');
let email = document.querySelector('#e_mail');



function controllo(event)
{
const ev = event.currentTarget;
event.preventDefault();

if (form.nome.value.length == 0 || form.cognome.value.length == 0 || form.username.value.length == 0 || form.email.value.length == 0 || form.password.value.length == 0|| form.password.value.length < 8|| form.password.value.length > 16) {
  err = document.querySelector('.errori');      
  err2 = document.querySelector('.errori2');
  if(form.password.value.length < 8 || form.password.value.length > 16){
    err.textContent="";
    err2.textContent="";
    err.textContent=" La password deve contenere da 8 a 16 caratteri ";
    if(form.password.value.length == 0 || form.nome.value.length == 0 || form.cognome.value.length == 0 || form.username.value.length == 0 || form.email.value.length == 0){
            err2.textContent=" Riempire tutti i campi "; 
          }
    }
        else {
          err.textContent="";
          err2.textContent="";
          err.textContent="Riempire tutti i campi";
        }
    }
    else {
      err = document.querySelector('.errori');      
      err2 = document.querySelector('.errori2');
      err.textContent="";
      err2.textContent="";
        let parametri = {
            'username': form.username.value,
            'password': form.password.value,
            'nome': form.nome.value,
            'cognome': form.cognome.value,
            'email':form.email.value,
        };
        console.log(parametri);
        fetch('http://localhost:8080/hw1/reg.php', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(parametri)
      }).then(gest).then(res)
  }
    
}
const form = document.forms['reg'];
form.addEventListener('submit', controllo);

function gest(response) {

  const r = response.text();
  return r;
}

function res(r) {
  console.log(r);
  const e3=document.querySelector('.errori3');
  const e4=document.querySelector('.errori4');
  const e5=document.querySelector('.errori5');
  const e6=document.querySelector('.errori6');
  e3.textContent="";
  e4.textContent="";
  e5.textContent="";
  e6.textContent="";
  if (r.includes('Usernamenonvalido')) { e5.textContent="Username non valido";}
  if (r.includes('Emailnonvalida')) { e6.textContent="Email non valida";}
  if (r.includes('Utilizzato')) { e3.textContent="username o e-mail già utilizzati"; }
  if (r.includes( 'erroredb')) { e4.textContent="Qualcosa non ha funzionato..."; }
  if (r.includes( 'registrato')) {  window.location = "http://localhost:8080/hw1/login.php"; }
}
