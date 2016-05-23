function initialize() {
	
	var madison = new google.maps.LatLng(43.074609,-89.384143);
		map = new google.maps.Map(document.getElementById('map_canvas'), {
		center: madison,
		zoom: 11,
        minZoom: 10,
        maxZoom: 14,
		mapTypeControl: false,
		panControl: false,
		mapTypeId: "simple",
		mapTypeId: 'roadmap'
	});
 
	layer = new google.maps.FusionTablesLayer(661293);
	layer.setMap(map);	
  }