const im1= document.querySelector('#img1');
const im2= document.querySelector('#img2');
window.addEventListener("load", aggiungi);
const v= 'concerto';
const a ='stadio';

function aggiungi(){
    fetch("https://pixabay.com/api/?key=26954894-be96704e052e3e2792a685dbd&image_type=photo&lang=it&q="+ v).then(gest).then(res2);
    fetch("https://pixabay.com/api/?key=26954894-be96704e052e3e2792a685dbd&image_type=photo&lang=it&q="+ a).then(gest).then(res1);
    
}

function gest(response){
     return response.json();
   }

function res1(json){
    //console.log(json);
    let h =json.total;
    if(h > 12) h = 1;
    const hit =json.hits[0];
    const img_url=hit.webformatURL;
    const imm= document.createElement('img');
    imm.src=img_url;
    im1.appendChild(imm);
    }

function res2(json){
let h =json.total;
if(h > 12) h = 1;
const hit =json.hits[6];
const img_url=hit.webformatURL;
const imm= document.createElement('img');
imm.src=img_url;
im2.appendChild(imm);
}

const form= document.forms['ricerca_evento'];
form.addEventListener('submit',gestione);
const e1 = document.querySelector('#err_p');
const e2 = document.querySelector('#errp2');


function gestione(event){
let d= form.data.value;
let b = 'T00:00:00Z';
let data_c = d.concat(b);
event.preventDefault();
let ev = encodeURIComponent(form.evento.value);
let nazione = encodeURIComponent(form.nazione.value);
let citta = encodeURIComponent(form.citta.value);
let parametri = undefined;

if (ev == 0 ){
    e1.classList.remove('hidden');
}else{
    e1.classList.add('hidden');
    if(nazione !== 0 && citta === 0){
    let p = { 
    'data': data_c, 'ev': ev,
    'nazione': nazione, 
    };
    parametri = p;
    }else if(nazione === 0 && citta !== 0){
        let p = { 
            'data': data_c, 'ev': ev,
            'citta': citta, 
        };
        parametri = p;
    }else if(nazione !== 0 && citta !== 0){
        let p = { 
            'data': data_c, 'ev': ev,
            'citta': citta, 'nazione': nazione,
        };
    parametri = p;
    }else{
        let p = { 
            'data': data_c, 'ev': ev,
        };
    parametri = p;
    }

fetch('http://localhost:8080/hw1/f_form.php', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametri)
    }).then(gest2).then(res)
}

}


function gest2(response){
    return response.json();
           
}
const ti =[]; const o=[];
const lu =[]; const imma=[];
const da =[]; const info=[];
let num_tot = undefined;

function res(json){
    //sezione
    console.log(json);
    const res= document.querySelector('#sect');
    res.innerHTML="";
    let h = json.page.totalElements;
    console.log(h);
    if(json.page.totalElements===0){alert('Nessun evento trovato...')
    }else{
    if(h>10){h=10;}else if(h<10 && h>4){h=5;} else if(h>1 && h<5){h=2;} else{h=1;}
    num_tot = h;
    const div_t =document.createElement('div'); div_t.textContent="Eventi trovati"; 
    div_t.classList.add('Ris_t'); res.appendChild(div_t);
    for(let i = 0; i<h; i++){
    //div in colonna
    const divp= document.createElement('div');
    divp.classList.add('results');
    const elem= json._embedded.events[i];
    const titolo = elem.name;
    const luogo = elem.dates.timezone;
    const data = elem.dates.start.localDate;
    const ora = elem.dates.start.localTime;
    const immag = elem.images[0].url;
    const ur = elem.url;
    const con_imm = document.createElement('div');
    const con_info = document.createElement('div');
    con_info.classList.add('contenitore');
    let d= form.data.value;
    //Salvo i dati del Json
    ti[i]= titolo; lu[i]= luogo; da[i]= data;
    o[i]= ora; imma[i]=immag; info[i]=ur;
    
    if(data !== d && d){
        console.log(d);
        const e = document.createElement('div');
        e.classList.add('Err');
        e.textContent="Ho trovato questo evento in un altra data";
        con_info.appendChild(e);
    }
    const im = document.createElement('img');
    im.src= immag;
    con_imm.appendChild(im);
    divp.appendChild(con_imm);
    const div1=document.createElement('div'); const div2=document.createElement('div'); const div6=document.createElement('div');
    const div3=document.createElement('div'); const div4=document.createElement('div');
    const div5=document.createElement('div');  const bu=document.createElement('button');
    const u =document.createElement('a'); u.textContent="Clicca qui per avere più informazioni";
    u.href=ur; bu.classList.add('bu'); bu.textContent="Aggiungi ai preferiti";

    const s1="Evento: "; const s2="Luogo: "; const s3= "Data: "; const s4= "Ora: ";
    
    div1.textContent= s1.concat(titolo); div2.textContent= s2.concat(luogo); div3.textContent= s3.concat(data);
    div4.textContent= s4.concat(ora); 
    

    con_info.appendChild(div1);
    con_info.appendChild(div2);
    con_info.appendChild(div3);
    con_info.appendChild(div4);
    div5.appendChild(u);
    con_info.appendChild(div5);
    div6.appendChild(bu);
    con_info.appendChild(div6);
    divp.appendChild(con_info);
    res.appendChild(divp);
    bu.addEventListener('click', pref);
    
}
    }
}

function pref(event){
    let num = undefined;
    event.preventDefault();
    const ev= event.currentTarget;
    //console.log(ev);
    //console.log(bu);
    ev.classList.add('hidden'); ev.classList.add('ident');
    const all =document.querySelectorAll('.bu');
    //console.log(all);
for(let j=0; j<num_tot; j++){
    if(all[j].className === 'bu hidden ident'){num=j
    ev.classList.remove('ident');
    }
}

let parametri = { 
    'titolo': ti[num], 'luogo': lu[num],
    'data': da[num], 'ora': o[num],
    'immagine': imma[num], 'url':info[num],
};


fetch('http://localhost:8080/hw1/pref.php', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametri)
    }).then(ritorno).then(risultato)
}

function ritorno(response){
    return response.text();
    
}


function risultato(risp){
console.log(risp);

if(risp == 'gia preferito'){
    alert("Elemento già presente nei preferiti");
}
else{
    alert("Elemento aggiunto nei preferiti");
}
}

const b_pref = document.querySelector('#vis');
b_pref.addEventListener('click', preferiti);

const ti_pr =[]; const o_pr=[];
const lu_pr =[]; const imma_pr=[];
const da_pr =[]; const info_pr=[];

function preferiti(event){
event.currentTarget.classList.add('hidden');
fetch('http://localhost:8080/hw1/gestionepref.php').then(gest).then(ge);
}

function ge(r){

const lun = r.lunghezza;
 if(lun === 0){
    alert("Non hai preferiti..")
 }
else{
const sez_pref= document.querySelector('#preferiti');
const blocco1= document.querySelectorAll('.blocco1');
const ris= document.querySelector('#sect');
for(let i of blocco1){
i.classList.add('hidden');
}
ris.innerHTML="";
for(let i=0; i<lun; i++){
ti_pr[i] = r[i].evento; da_pr[i] = r[i].data; lu_pr[i] = r[i].luogo;
o_pr[i]= r[i].ora; imma_pr[i] = r[i].immagine; info_pr[i] = r[i].info;
//fare come sopra(creazione dinamica)
const divp= document.createElement('div');
divp.classList.add('results2');
const con_imm = document.createElement('div');
const con_info = document.createElement('div');
con_info.classList.add('contenitore');
const im = document.createElement('img');
im.src= r[i].immagine;
con_imm.appendChild(im);
divp.appendChild(con_imm);
 
const div1=document.createElement('div'); const div2=document.createElement('div'); const div6=document.createElement('div');
const div3=document.createElement('div'); const div4=document.createElement('div');
const div5=document.createElement('div');  const bu=document.createElement('button');

const u =document.createElement('a'); u.textContent="Clicca qui per avere più informazioni";
u.href=r[i].info; bu.classList.add('bu2'); bu.textContent="Rimuovi dai preferiti";

const s1="Evento: "; const s2="Luogo: "; const s3= "Data: "; const s4= "Ora: ";

div1.textContent= s1.concat(r[i].evento); div2.textContent= s2.concat(r[i].luogo); div3.textContent= s3.concat(r[i].data);
div4.textContent= s4.concat(r[i].ora); 

con_info.appendChild(div1);
con_info.appendChild(div2);
con_info.appendChild(div3);
con_info.appendChild(div4);
div5.appendChild(u);
con_info.appendChild(div5);
div6.appendChild(bu);
con_info.appendChild(div6);
divp.appendChild(con_info);
sez_pref.appendChild(divp);
bu.addEventListener('click', remove);
}
}
}
let nu = undefined;
function remove(event){
    
    event.preventDefault();
    const ev= event.currentTarget;
    ev.classList.add('hidden2'); ev.classList.add('ident');
    const all =document.querySelectorAll('.bu2');
    const numtotali = all.length;
    //console.log(all);
for(let j=0; j<numtotali; j++){
    if(all[j].className === 'bu2 hidden2 ident'){nu=j
    //console.log(nu);
    ev.classList.remove('ident');
    }
}

let parametri = { 
    'evento': ti_pr[nu], 'luogo': lu_pr[nu],
    'data': da_pr[nu], 'ora': o_pr[nu],
    'immagine': imma_pr[nu], 'url':info_pr[nu],
};


fetch('http://localhost:8080/hw1/rem_pref.php', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametri)
    }).then(ritorno).then(risultato_pr)
}

function risultato_pr(r){
console.log(r);
if(r === 'eliminato'){alert("Elemento eliminato dai preferiti");
const el = document.querySelectorAll('.results2'); 
el[nu].textContent="";
}else{alert("Errore")}
}


const ric= document.querySelector('#logo img' );
ric.addEventListener('click', ricarica);

function ricarica(event){
    window.location = "http://localhost:8080/hw1/home.php";
}