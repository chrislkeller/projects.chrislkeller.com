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

//sets global variables
	var geocoder;
	var map;
	var tableid = 831673;
	var layer = new google.maps.FusionTablesLayer(tableid); 

//sets function
function initialize() {

	//these are options straight from the google API
    var options = {
		zoom: 12,
		center: new google.maps.LatLng(43.074609,-89.384143),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		scaleControl: true,
		draggableCursor: 'move',
		mapTypeControl: false,
		navigationControl: true,
		streetViewControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL,
		}
	};

	//this is what write the map to div id="map" up top
	var map = new google.maps.Map(document.getElementById('map_canvas'), options);

	//this adds the intial fusion layer
	layer = new google.maps.FusionTablesLayer(tableid);
	layer.setMap(map);
}

// Change the query based on the user's selection
function changeMap(Category) {
  var whereClause = "";
  if(Category) {
    whereClause = " WHERE Category = '" + Category + "'";
  }
  layer.setQuery("SELECT Location FROM " + tableid + whereClause);
}