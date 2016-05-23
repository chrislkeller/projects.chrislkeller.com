//detects if user is mobile or desktop
function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map_canvas");
    
  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '300px';
    mapdiv.style.height = '600px';
  } else {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  }
}