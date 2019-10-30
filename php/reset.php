<?php
// по $qrcodeQuery
// скрипт сбрасывает:
// - дату первого обращения
// - счетчик запросов

ini_set("display_errors", "1");
error_reporting(E_ALL);
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
	
	$data = array($qrcodeQuery);
	// $STH = $DBH->prepare("UPDATE trueliq SET `date-first-query` = null `number-query` = null WHERE `qr-code` = ?");  
	// $STH = $DBH->prepare("UPDATE trueliq SET `date-first-query` = '' `number-query` = '' WHERE `qr-code` = ?");  
	$STH = $DBH->prepare("UPDATE trueliq SET `date-first-query` = null, `number-query` = null WHERE `qr-code` = ?");  
	$STH->execute($data);
    // echo 'ok';  
	// echo json_encode(array('result' => 'ok'));
	echo json_encode('reset ok');

}  

catch(PDOException $e) {  
    echo $e->getMessage();  
	file_put_contents('PDOErrors.txt', "\r\n" . date("Ymd-His", time()) . "\t" . $e->getMessage(), FILE_APPEND); 
}

// echo '</pre>';
?>