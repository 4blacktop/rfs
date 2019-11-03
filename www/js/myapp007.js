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

function scan(){
	alert('scan');
	// window.clearTimeout(timeoutID);
	

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