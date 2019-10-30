<?php
ini_set("display_errors", "1");
error_reporting(E_ALL);
header("Access-Control-Allow-Origin:*");
echo '<pre>';

// connection settings
$host = "db.trueliq.com";
$dbname = "trueliq";
$user = "trueliq";
$pass = "Colombia12$";

try {  
  $DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);  
  
	# since it is an ordinary query without placeholder we can use query() method
	$STH = $DBH->query('SELECT * FROM trueliq');  
	  
	// set associative 
	$STH->setFetchMode(PDO::FETCH_ASSOC);  
	  
	while($row = $STH->fetch()) {  
		print_r($row);
	}
	
}  
catch(PDOException $e) {  
    echo $e->getMessage();  
}

echo '</pre>';
?>