document.addEventListener("offline", onOffline, false);
// document.addEventListener("online", onOnline, false);
document.addEventListener("backbutton", onBackKeyDown, false);

var timeoutID;

$(function() {// Handler for .ready() called.

	$("#main").hide();
	// $("#result").hide();
	// alert('ready');
	// scan();
	// alert('dollar');
	// navigator.splashscreen.show();
});

function onBackKeyDown(e) {
  e.preventDefault();
}

document.addEventListener('deviceready', function () {
	// navigator.splashscreen.show();
	// alert('deviceready');
	// navigator.splashscreen.hide();

	spscreen();
	// setTimeout(scan, 10000);
});

function spscreen(){
	navigator.splashscreen.show();
	// timeoutID = window.setTimeout(navigator.splashscreen.hide, 5000);
	timeoutID = window.setTimeout(scan, 5000);
	// scan();
}


function scan(){
	// alert('scan');
	navigator.splashscreen.hide();
	window.clearTimeout(timeoutID);
	if (navigator.connection.type == Connection.NONE) { // error qr code not found
	// alert('Connection.NONE: 25');
			 onOffline();
	} else {
		$("#result").hide();
		document.getElementById('result').innerHTML = '';
		document.getElementById('icon').innerHTML = '';
		cordova.plugins.barcodeScanner.scan(function(result){ // success callback
			// document.getElementById('result').innerHTML = "Result:<br />" + result.text + "<br />" + "Format: " + result.format + "<br />" + "Cancelled: " + result.cancelled;
			// alert("Result:<br />" + result.text + "<br />" + "Format: " + result.format + "<br />" + "Cancelled: " + result.cancelled);
			if(result.cancelled) {
				document.getElementById('icon').innerHTML = '<img src="img/icon-error.png" width="100%" alt="ok" />';
				document.getElementById('home').innerHTML = '<img src="img/icon-app-big.png" height="100%" alt="home" />';
				// document.getElementById('result').innerHTML = '<font color="#e35520">scan<br />cancelled</font>'; 
				document.getElementById('result').innerHTML = '<font color="#e35520">escaneo<br />cancelado</font>'; 
				$("#main").show();
				$("#home").show();
				$("#icon").show();
				$("#result").show();
				timeoutID = window.setTimeout(scan, 10000);
			} else {
				checkResult(result.text);
			}
		},function(error){ // error callback
			document.getElementById('result').innerHTML = JSON.stringify(error); // send text to error function
			$("#result").show();
		},
		{
			  "preferFrontCamera" : false, // iOS and Android
			  "showFlipCameraButton" : false, // iOS and Android
			  "resultDisplayDuration" : 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			  // "prompt" : "Place a barcode inside the scan area", // supported on Android only
			  "formats" : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
			  "orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
		  }
		);
	}
}

function checkResult(result){ // check results from qr code scanner and fires function to show content
 	$.get( "http://trueliq.com/search.php?qrcode=" + result, function( data ) { // ajax GET // console.log('data: ' + data.toSource());
		if(data == Boolean(false)) { // error qr code not found
			 error();
		} else {
			if (data['date-first-query'] == null) { // first query
				ok(data);
			} else { // already queried
				warning(data);
			}
		}
	}); 
}


function ok(data){
	document.getElementById('icon').innerHTML = '<img src="img/icon-ok.png" width="100%" alt="ok" />';
	document.getElementById('home').innerHTML = '<img src="img/icon-app-big.png" height="100%" alt="home" />';
	document.getElementById('result').innerHTML = 
	data["reference"] + " " + data["brand"] + "<br />" + 
	data["sub-reference"] + "<br />" + 
	data["importer"] + "<br />" + 
	data["date-import"] + "<br />" + 
	data["lot-number"] + "<br />";
	$("#main").show();
	$("#home").show();
	$("#result").show();
	$("#icon").show();
	timeoutID = window.setTimeout(scan, 10000);
}

function warning(data){
	document.getElementById('home').innerHTML = '<img src="img/icon-app-big.png" height="100%" alt="home" />';
	document.getElementById('icon').innerHTML = '<img src="img/icon-warning.png" width="100%" alt="ok" />';
	document.getElementById('result').innerHTML = 
	'<div><font color="#e35520">este código<br />ya fue consultado el:</font><br />' + 
	data["date-first-query"] + "<br />" +
	data["reference"] + " " + data["brand"] + "<br />" + 
	data["sub-reference"] + "<br />" + 
	data["importer"] + "<br />" + 
	data["date-import"] + 
	"</div>"; 
	$("#main").show();
	$("#result").show();
	$("#home").show();
	$("#icon").show();
	
	timeoutID = window.setTimeout(scan, 10000);
}

function error(){
	document.getElementById('icon').innerHTML = '<img src="img/icon-error.png" width="100%" alt="ok" />';
	document.getElementById('home').innerHTML = '<img src="img/icon-app-big.png" height="100%" alt="home" />';
	document.getElementById('result').innerHTML = '<font color="#e35520">código no registrado</font>'; 
	$("#main").show();
	$("#home").show();
	$("#icon").show();
	$("#result").show();
	timeoutID = window.setTimeout(scan, 10000);
}

function onOffline(){
	document.getElementById('icon').innerHTML = '<img src="img/icon-offline.png" width="100%" alt="ok" />';
	document.getElementById('result').innerHTML = '<font color="#e35520">revise su<br />conexión de red</font>'; 
	$("#main").show();
	$("#home").hide();
	$("#icon").show();
	$("#result").show(); 
}

function onOnline(){
	scan();
}

function home(){
	scan();
}

function toDate(dateStr) { // http://stackoverflow.com/questions/7151543/convert-dd-mm-yyyy-string-to-date
    var parts = dateStr.split("-");
	var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
	dateConverted = new Date(parts[2], parts[1] - 1, parts[0]);
	dateFormatted = dateConverted.getDate() + ' ' + monthNames[dateConverted.getMonth()] + " " + dateConverted.getFullYear();
    return dateFormatted;
}