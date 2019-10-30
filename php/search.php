<?php
ini_set("display_errors", "1");
error_reporting(E_ALL);
// header("Access-Control-Allow-Origin:*");
// header("Content-Type: application/json");
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");
// echo '<pre>';

$today = date("d-m-Y", time());
			// echo $today . "<br />";

// connection settings
$host = "db.trueliq.com";
$dbname = "trueliq";
$user = "trueliq";
$pass = "Colombia12$";

$qrcodeQuery = urlencode(htmlspecialchars($_GET["qrcode"]));

			// echo "<h1>смени хедер!!!! </h1>DEBUG:<br />fjnjkk534jn53kj6nk3jh6k2j3n6nkj3ng3d3der<br />fjnjkk534jn53kj6nk3jh6k2j3n6nkj3ng3d3det";

// echo "<br /><br />QR query: $qrcode";
// echo "<br /><br />QR result:<br />";

try {  
	$DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);  

	// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT );
	$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION ); // debug

	// since it is an ordinary query without placeholder we can use query() method
	// $STH = $DBH->query('SELECT * FROM trueliq');  
	$STH = $DBH->query("SELECT * FROM trueliq WHERE `qr-code` = '$qrcodeQuery'");  // debug
	// $STH = $DBH->query("SELECT `brand`, `importer`, `reference`, `sub-reference`, `date-import`, `lot-number`, `date-first-query`, `date-expiration` FROM trueliq WHERE `qr-code` = '$qrcodeQuery'");  

/* 	// set associative 
	$STH->setFetchMode(PDO::FETCH_ASSOC);  
	
	while($row = $STH->fetch()) {  
		print_r($row);
	} */
	
	$STH->setFetchMode(PDO::FETCH_ASSOC); 
	$result = $STH->fetch();
	// print_r($result);
	echo json_encode($result);
	
/* 	if($result == 'null') {
		// echo "<br /><br />\n\nresult = NULL";
		// echo json_encode('not found');
	} else { */
		if(!$result["date-first-query"]) { // date-first-query is NULL, setting date and number-query
			
			// echo "<br /><br />date-first-query = NULL, setting today = " . $today . "; setting number-query = 1";
			// mysql_query("UPDATE `trueliq` SET `points`= `points` + 1 WHERE `user_id` = '".intval($userid)."'");
			
			
			// $sql = 'UPDATE user_alerts SET notif = notif + 2 WHERE ( user_id = :userid )';
			// $sql = 'UPDATE trueliq SET ( `date-first-query` ) = :today  WHERE ( `qr-code` = :qrcodeQuery )';
			// $sql = "UPDATE trueliq SET `date-first-query` = '$today' WHERE `qr-code` = '$qrcodeQuery'";
			// $STH = $DBH->prepare( $sql );
			// $STH->execute(array(':qrcodeQuery' => $qrcodeQuery, ':today' => $today));
			// $STH->execute();
			
			$data = array($today, 1, $qrcodeQuery);  
  
			// $STH = $DBH->prepare("INSERT INTO folks (name, addr, city) values (?, ?, ?)");  
			$STH = $DBH->prepare("UPDATE trueliq SET `date-first-query` = ?, `number-query` = ? WHERE `qr-code` = ?");  
			$STH->execute($data);
			
			
		} else { // date-first-query is NOT NULL, incrementing number-query
			// mysql_query("UPDATE `trueliq` SET `points`= `points` + 1 WHERE `user_id` = '".intval($userid)."'");
						// echo "<br /><br />date-first-query = " . $result["date-first-query"] . "; number-query = " . $result["number-query"];
			
			$data = array($qrcodeQuery);  
			$STH = $DBH->prepare("UPDATE trueliq SET `number-query` = `number-query` + 1 WHERE `qr-code` = ?");  
			$STH->execute($data);
			
		}
	// }
	// $json_decode($json));
	// print_r();
	
	
}  

catch(PDOException $e) {  
    echo $e->getMessage();  
	file_put_contents('PDOErrors.txt', "\r\n" . date("Ymd-His", time()) . "\t" . $e->getMessage(), FILE_APPEND); 
}

// echo '</pre>';
?>