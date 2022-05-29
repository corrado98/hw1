<?php

$cred = json_decode(file_get_contents('php://input'), true);
$evento=$cred['ev'];
$data=$cred['data'];
$key= '9QzGLUGKLFiwZnAS6rLIec9OjrwWNgbb';
$d_0="T00:00:00Z";
//se la data è inserita
if(strcmp($data,$d_0)!==0){
if(isset($cred['citta'])&& isset($cred['nazione'])){
$dati = array("keyword" => $evento, "startDateTime" => $data,"city"=> $cred['citta'],"countryCode"=>$cred['nazione'], "apikey"=>$key, "locale"=>'*');
$dati = http_build_query($dati);
}else if(isset($cred['citta'])&& !isset($cred['nazione'])){
	 
	$dati = array("keyword" => $evento, "startDateTime" => $data,"city"=> $cred['citta'], "apikey"=>$key, "locale"=>'*');
	$dati = http_build_query($dati);
}else if(!isset($cred['citta'])&& isset($cred['nazione'])){
	 
	$dati = array("keyword" => $evento, "startDateTime" => $data,"countryCode"=> $cred['nazione'], "apikey"=>$key, "locale"=>'*');
	$dati = http_build_query($dati);
}else {
	 
	$dati = array("keyword" => $evento, "startDateTime" => $data, "apikey"=>$key, "locale"=>'*');
	$dati = http_build_query($dati);
}
}
//se la data non è inserita
else{
	if(isset($cred['citta'])&& isset($cred['nazione'])){
		$dati = array("keyword" => $evento,"city"=> $cred['citta'],"countryCode"=>$cred['nazione'], "apikey"=>$key, "locale"=>'*');
		$dati = http_build_query($dati);
		}else if(isset($cred['citta'])&& !isset($cred['nazione'])){
			 
			$dati = array("keyword" => $evento,"city"=> $cred['citta'], "apikey"=>$key, "locale"=>'*');
			$dati = http_build_query($dati);
		}else if(!isset($cred['citta'])&& isset($cred['nazione'])){
			 
			$dati = array("keyword" => $evento,"countryCode"=> $cred['nazione'], "apikey"=>$key, "locale"=>'*');
			$dati = http_build_query($dati);
		}else {
			 
			$dati = array("keyword" => $evento, "apikey"=>$key, "locale"=>'*');
			$dati = http_build_query($dati);
		}
}

$curl= curl_init();
curl_setopt($curl, CURLOPT_URL, "https://app.ticketmaster.com/discovery/v2/events.json?".$dati);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result= curl_exec($curl);
echo $result;
curl_close($curl);


?>