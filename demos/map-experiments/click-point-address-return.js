//DETECTS USER MOBILE OR DESKTOP
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

//PULLS MAP, GEOCODER AND INFO WINDOW LIBRARIES
(function() {
	
	// DEFINES GLOBAL VARIABLES
	var map, geocoder, marker, infoWindow;

window.onload = function() {

	// CREATES NEW MAP
	var options = {
		zoom: 10,
		mapTypeControl: false,
		panControl: false,
		center: new google.maps.LatLng(43.074609,-89.384143),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}; 

	map = new google.maps.Map(document.getElementById('map'), options);
	
	//ADDS CLICK EVENT TO MAP
	google.maps.event.addListener(map, 'click', function(e) {

    //GETS ADDRESS FOR CLICK POINT
	getAddress(e.latLng);
});
}

//BEGIN FUNCTION
//PULLS LAT-LONG FOR CLICK POINT
function getAddress(latLng) {

	//SEE IF GEOCODER OPTION EXISTS
	if (!geocoder) {
		geocoder = new google.maps.Geocoder();
	}


    //CREATE GEOCODER REQUEST
    var geocoderRequest = {
      latLng: latLng
    }


 geocoder.geocode(geocoderRequest, function(results, status) {
 
	//CREATE INFO WINDOW
	if (!infoWindow) {
		infoWindow = new google.maps.InfoWindow();
	}
	
	
	// Setting the position for the InfoWindow
    infoWindow.setPosition(latLng);
	
	
	// Creating content for the InfoWindow
	var content = '<h3>Position: ' + latLng.toUrlValue() + '</h3>';
	
	
	// Check to see if the request went allright
	if (status == google.maps.GeocoderStatus.OK) {
	
    // Looping through the result
    for (var i = 0; i < results.length; i++) {
		if (results[0].formatted_address) {
			content += i + '. ' + results[i].formatted_address + '<br />';    			
    }
	}

	
	} else {
	
	content += '<p>No address could be found. Status = ' + status + '</p>';
}


      // Adding the content to the InfoWindow
      infoWindow.setContent(content);
  
      // Opening the InfoWindow
      infoWindow.open(map);

    });

}
	
})();