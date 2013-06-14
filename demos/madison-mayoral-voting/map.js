//function
function initialize() {

	//API options
    var options = {
		zoom: 12,
		center: new google.maps.LatLng(43.083433,-89.403305),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		disableDragging: true,
		mapTypeControl: false,
		navigationControl: true,
		streetViewControl: false,
		scaleControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_TOP
		}
	};

	//write the map
	var map = new google.maps.Map(document.getElementById('map_canvas'), options);

	//intial fusion layer
	layer = new google.maps.FusionTablesLayer(835224);
	layer.setMap(map);

}
	//write the map
	setTimeout('initialize()', 500); 