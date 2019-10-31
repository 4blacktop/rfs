document.addEventListener("offline", onOffline, false);
// document.addEventListener("online", onOnline, false);
document.addEventListener("backbutton", onBackKeyDown, false);

var timeoutID;

function onBackKeyDown(e) {
  e.preventDefault();
}

document.addEventListener('deviceready', function () {
	// navigator.splashscreen.show();
	alert('deviceready');
	// navigator.splashscreen.hide();

	spscreen();
	// setTimeout(scan, 10000);
});
