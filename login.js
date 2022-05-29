
const errore = document.querySelector('.errori');
const e2=document.querySelector('.errori2');

function log(event){
event.preventDefault();
let parametri = { 'username': form.username.value, 'password': form.password.value };
if(form.username.value.length == 0 || form.password.value.length == 0){
e2.textContent="";
errore.textContent="Riempire tutti i campi";
event.preventDefault();
}else {
    
    fetch('http://localhost:8080/hw1/login.php', {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametri)
    }).then(gest).then(res)


}
}

const form = document.forms['log_form'];
form.addEventListener('submit', log);

function gest(response) {

    const r = response.text();
    return r;
}

function res(r) {
    const e_reg=document.querySelector('.hidden');
    e2.textContent="";
    errore.textContent="";
    if (r.includes('no_reg')) { e2.textContent="Account non esistente";
    e_reg.classList.remove('hidden');
    e_reg.classList.add('es');
}
if(r.includes('pass_err')) {e2.textContent="Password errata"}
if(r.includes('ok')){window.location = "http://localhost:8080/hw1/home.php";}
}