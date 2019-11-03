<?php
// header("Content-Type: text/html; charset=utf-8"; "Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: *");
// error_reporting(E_ALL);
$person = "\r\n" . $_GET["qrcode"];
echo $person;
$file = 'log.txt';
file_put_contents($file, $person, FILE_APPEND | LOCK_EX);

?>