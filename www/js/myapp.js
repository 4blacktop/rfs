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
	var text = "Тестов Тест Тестович-01.11.2019-18:20";
	// var text = result.text;
				var searchTerm = '-';
				var indexOfFirst = text.lastIndexOf(searchTerm);
				var divider = text.lastIndexOf(searchTerm, (indexOfFirst - 1));	
				var part1 = text.substr(0, divider);
				var part2 = text.substr(divider+1);
				document.getElementById('status-connection').innerHTML = part1;
				document.getElementById('status-traffic').innerHTML = part2;
	// var searchTerm = '-';
	// var indexOfFirst = text.lastIndexOf(searchTerm);
	// var divider = text.lastIndexOf(searchTerm, (indexOfFirst - 1));	
	// var part1 = text.substr(0, divider);
	// var part2 = text.substr(divider+1);
	
	// console.log("indexOfFirst: " + indexOfFirst);
	// console.log("divider: " + divider);
	// console.log("text: " + text);
	// console.log("part1: " + part1);
	// console.log("part2: " + part2);
}

function scan(){
	document.getElementById('result').value = 'test';
	cordova.plugins.barcodeScanner.scan(
		function(result){
			//success callback
			// alert(JSON.stringify(result));
			// document.getElementById('result').innerHTML = result.text;
			var text = result.text;
			var searchTerm = '-';
			var indexOfFirst = text.lastIndexOf(searchTerm);
			var divider = text.lastIndexOf(searchTerm, (indexOfFirst - 1));	
			var part1 = text.substr(0, divider);
			var part2 = text.substr(divider+1);
			document.getElementById('status-connection').innerHTML = part1;
			document.getElementById('status-traffic').innerHTML = part2;
			// alert("text: " + text);
			// alert("indexOfFirst: " + indexOfFirst);
			// alert("divider: " + divider);
			// alert("part1: " + part1);
			// alert("part2: " + part2);
			
			$.get( "https://moibiz27.ru/rfs/log.php?qrcode=" + result.text, function( data ) { // ajax GET // console.log('data: ' + data.toSource());


				
				
			/* if(data == Boolean(false)) { // error 
			document.getElementById('status-connection').style.backgroundColor = "#9898FB";
			document.getElementById('status-traffic').style.backgroundColor = "#9898FB";
			} else { 
			// console.log(data);
			// document.getElementById('status-traffic').innerHTML = result.text;
			// if (data['date-first-query'] == null) { // first query
				// ok(data);
			// } else { // already queried
				// warning(data);
			} */
				
			});
		},
		function(error){
			//error callback
			alert(JSON.stringify(error));
		},
		{
			saveHistory: true, // Android, save scan history (default false)
			prompt : "Направьте камеру на QR код", // Android
			resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
			orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
			disableSuccessBeep: false // iOS and Android
		}
	);
}