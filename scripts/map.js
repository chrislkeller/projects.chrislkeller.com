//global variables
	var tableID = 3114477;
	var layer;
	var latlng = new google.maps.LatLng(44.824708282300236, -89.8681640625);
	var zoom = 7;
    var new_zoom = 9;
	var map;
	var marker;
	var infowindow;
	var infoWindowContent = '';
	var geocoder = new google.maps.Geocoder();
	var coordinate;
	var markersArray = [];

//begin primary function
$(document).ready(function(){

	// Initialize the map
	map = new google.maps.Map(document.getElementById('map_canvas'), {
		center: latlng,
		zoom: zoom,
        scrollwheel: false,
        draggable: true,
        mapTypeControl: false,
        navigationControl: false,
        streetViewControl: false,
        panControl: true,
        scaleControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP}
	});

	//set shapes fusion layer & supress info window
	layer = new google.maps.FusionTablesLayer(tableID, {suppressInfoWindows: true});
	layer.setQuery("SELECT geometry FROM " + tableID);
	layer.setMap(map);
	
	//click listener on fusion layer
	google.maps.event.addListener(layer, 'click', function(e) {
		$("#display-blox").html(
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td><p class="table">You Live in State Senate District ' + e.row['district'].value + '.<br />' + 
			'<br />Your State Senator is ' + e.row['party'].value + ' ' + e.row['full_name'].value + '.</p></td>' +
			'<td><img src="' + e.row['photo_url'].value + '" width="100" style="margin-left: auto; margin-right: auto" alt="' + e.row['full_name'].value + '" /></td>' +
			'</tr>' +	
			'</tbody>' +
			'</table>');

        marker.setMap();

	});

	//submit form
	window.onkeypress = enterSubmit;

});
//end primary function

	//address search function
	function generateInfoWindow(results, status) {
	
		if (status == google.maps.GeocoderStatus.OK) {
		
			//center and zoom map
			coordinate = results[0].geometry.location;

			marker = new google.maps.Marker({
				map: map,
				layer: layer,
				visible: true,
				animation: google.maps.Animation.DROP,
				position: coordinate,
		});
		

		var script = document.createElement("script");
			script.setAttribute("src","https://www.google.com/fusiontables/api/query?sql=SELECT * FROM " +
            tableID + " WHERE ST_INTERSECTS(geometry, CIRCLE(LATLNG(" + coordinate.lat() + "," + coordinate.lng() + "), 0.1))&jsonCallback=addInfoWindow");
        document.getElementsByTagName("head")[0].appendChild(script);
			
			} else {
				alert("Please make sure you entered your City, State & Zip Code");
			}
	}

	//geocode function
	function zoomtoaddress() {

		//geocode the address
		geocoder.geocode({'address': document.getElementById("address").value }, generateInfoWindow);
	}

    function addInfoWindow(response) {
        if(response.table.rows.length) {
		if(infowindow) { infowindow.close(); }
		else infowindow = new google.maps.InfoWindow();
	
        infowindow.setContent();
        map.setCenter(coordinate);
        map.setZoom(new_zoom);
        marker.setMap(map);
        infowindow.setPosition(coordinate);
        //infowindow.open(map);
        
        $("#display-blox").html(
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td><p class="table">You Live in State Senate District ' + response.table.rows[0][9] + '.<br />' + 
			'<br />Your State Senator is ' + response.table.rows[0][8] + ' ' + response.table.rows[0][1] + '.</p></td>' +
			'<td><img src="' + response.table.rows[0][5] + '" width="100" style="margin-left: auto; margin-right: auto" alt="' + response.table.rows[0][1] + '" /></td>' +
			'</tr>' +	
			'</tbody>' +
			'</table>');			
    }
}

	//keyboard submit
	function enterSubmit() {
		if(event.keyCode==13) {
			zoomtoaddress();
		}
	}