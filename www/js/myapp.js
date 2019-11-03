document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
document.addEventListener("backbutton", onBackKeyDown, false);

function onOffline(){
	document.getElementById('status-connection').style.backgroundColor = "#FB9898";
	document.getElementById('status-traffic').style.backgroundColor = "#FB9898";
}

function onOnline(){
	document.getElementById('status-connection').style.backgroundColor = "#98FB98";
	document.getElementById('status-traffic').style.backgroundColor = "#98FB98";
}

function onBackKeyDown(e) {
	e.preventDefault();
}
 
function test(){
	// console.log(document.getElementById('result').innerHTML);
	// document.getElementById('result').innerHTML = 'test';
	// result.text = "test";
	alert("test");
	$.get( "http://moibiz27.ru/rfs/log.php?qrcode=testapp", function( data ) { // ajax GET // console.log('data: ' + data.toSource());
	alert(data);
	if(data == Boolean(false)) { // error qr code not found
		document.getElementById('status-connection').style.backgroundColor = "#9898FB";
		document.getElementById('status-traffic').style.backgroundColor = "#9898FB";
	} else {
		alert(data);
		// console.log(data);
		// document.getElementById('status-traffic').innerHTML = result.text;
		// if (data['date-first-query'] == null) { // first query
			// ok(data);
		// } else { // already queried
			// warning(data);
		}
	});
	
	

	
}

function scan(){
	document.getElementById('result').value = 'test';
	cordova.plugins.barcodeScanner.scan(
		function(result){
			//success callback
			// alert(JSON.stringify(result));
			document.getElementById('result').innerHTML = result.text;
			$.get( "http://moibiz27.ru/rfs/log.php?qrcode=" + result.text, function( data ) { // ajax GET // console.log('data: ' + data.toSource());
			if(data == Boolean(false)) { // error qr code not found
				document.getElementById('status-connection').style.backgroundColor = "#9898FB";
				document.getElementById('status-traffic').style.backgroundColor = "#9898FB";
			} else {
				// console.log(data);
				// document.getElementById('status-traffic').innerHTML = result.text;
				// if (data['date-first-query'] == null) { // first query
					// ok(data);
				// } else { // already queried
					// warning(data);
				}
			});
		},
	function(error){
			//error callback
			alert(JSON.stringify(error));
		},
		{
			saveHistory: true, // Android, save scan history (default false)
			prompt : "Направьте камеру на QR код", // Android
			resultDisplayDuration: 1000, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
			orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
		}
	);
}

/* 
function qr(){
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			alert("We got a barcode\n" +
				  "Result: " + result.text + "\n" +
				  "Format: " + result.format + "\n" +
				  "Cancelled: " + result.cancelled);

			document.getElementById('status-connection').value = result.text
		},
		function (error) {
			alert("Scanning failed: " + error);
		},
		{
			preferFrontCamera : true, // iOS and Android
			showFlipCameraButton : true, // iOS and Android
			showTorchButton : true, // iOS and Android
			torchOn: true, // Android, launch with the torch switched on (if available)
			saveHistory: true, // Android, save scan history (default false)
			prompt : "Place a barcode inside the scan area", // Android
			resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
			orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
			disableAnimations : true, // iOS
			disableSuccessBeep: false // iOS and Android
		}
	 );
} 

 */


/* 
function scan(){
		alert('scan');
		// window.clearTimeout(timeoutID);
	}

	function QRScan(){
		cordova.plugins.barcodeScanner.scan(
			function (result) {
				alert("We got a barcode\n" +
					  "Result: " + result.text + "\n" +
					  "Format: " + result.format + "\n" +
					  "Cancelled: " + result.cancelled);

				document.getElementById('cryptoId').value = result.text
			},
			function (error) {
				alert("Scanning failed: " + error);
			},
			{
				preferFrontCamera : true, // iOS and Android
				showFlipCameraButton : true, // iOS and Android
				showTorchButton : true, // iOS and Android
				torchOn: true, // Android, launch with the torch switched on (if available)
				saveHistory: true, // Android, save scan history (default false)
				prompt : "Place a barcode inside the scan area", // Android
				resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
				formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
				orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
				disableAnimations : true, // iOS
				disableSuccessBeep: false // iOS and Android
			}
		 );
	} 

	function scan(){
		alert('scan');
		// window.clearTimeout(timeoutID);
	}
 */

// document.addEventListener("offline", onOffline, false);
// document.addEventListener("online", onOnline, false);
// document.addEventListener("backbutton", onBackKeyDown, false);

// var timeoutID;

// function onBackKeyDown(e) {
	// e.preventDefault();
// }

// document.addEventListener('deviceready', function () {
	// alert('deviceready');

	// setTimeout(scan, 10000);
// });
/* 


	

}	




function scan2(){
	alert('scan2');
	cordova.plugins.barcodeScanner.scan(
	  function (result) {
		  alert("We got a barcode\n" +
				"Result: " + result.text + "\n" +
				"Format: " + result.format + "\n" +
				"Cancelled: " + result.cancelled);
	  },
	  function (error) {
		  alert("Scanning failed: " + error);
	  },
	  {
		  preferFrontCamera : true, // iOS and Android
		  showFlipCameraButton : true, // iOS and Android
		  showTorchButton : true, // iOS and Android
		  torchOn: true, // Android, launch with the torch switched on (if available)
		  saveHistory: true, // Android, save scan history (default false)
		  prompt : "Place a barcode inside the scan area", // Android
		  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
		  formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
		  orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
		  disableAnimations : true, // iOS
		  disableSuccessBeep: false // iOS and Android
	  }
	);
}	 */



/* var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		// alert('deviceready');
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};


 */