//mobile browser detection
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

//set global variables
	var geocoder;
	var map;
	var image = 'images/location-marker.png';
	var tableid = 847900;
	var layer = new google.maps.FusionTablesLayer(tableid); 
	var showMe = function toggleBounce() {
		if (marker.getAnimation() != null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.DROP);
			}
	}

//get user's location 
//full geolocation here:
//http://code.google.com/apis/maps/documentation/javascript/basics.html#Geolocation
if (navigator.geolocation) {
	browserSupportFlag = true;
	navigator.geolocation.getCurrentPosition(function(position) {
		var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

// Initialize the Google Maps API v3
var map = new google.maps.Map(document.getElementById('map_canvas'), {
	zoom: 12,
	center: point,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	scrollwheel: false,
	scaleControl: true,
	mapTypeControl: false,
	navigationControl: true,
	streetViewControl: false,
	navigationControlOptions: {
		style: google.maps.NavigationControlStyle.SMALL,
		}
	});


//add the fusion layer
	layer = new google.maps.FusionTablesLayer(tableid);
	layer.setMap(map);

//adds fusion layer but supresses info window
	//layer = new google.maps.FusionTablesLayer(tableid, {
		//suppressInfoWindows: true
	//});
	//layer.setMap(map);




//adding biking layer
document.getElementById('bicycling').onclick = function() {
	bikeLayer = new google.maps.BicyclingLayer();
	bikeLayer.setMap(map);
	}


//remove biking layer
document.getElementById('bicycling-off').onclick = function() {
	bikeLayer.setMap();
	}



//place marker at user's location
	new google.maps.Marker({
	position: point,
	map: map,
	icon: image,
	animation: showMe,


    });
}); 


//change the layer based on the user's selection
function changeMap(Activity) {
  var whereClause = "";
  if(Activity) {
    whereClause = " WHERE Activity = '" + Activity + "'";
  }
  layer.setQuery("SELECT GeocodedAddress FROM " + tableid + whereClause);
}

//alert if no location
} 
else {
  alert('W3C Geolocation API is not available');
} 