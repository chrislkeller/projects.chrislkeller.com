//global variables
	var layer;
	var tableID = 823626;
	var latlng = new google.maps.LatLng(43.08594,-89.423218);
	var zoom = 12;
	var map;
	var marker;
	var infowindow;
	var infoWindowContent = '';
	var geocoder = new google.maps.Geocoder();
	var coordinate;
	var markersArray = [];

function initialize() {

	// Initialize the map
	map = new google.maps.Map(document.getElementById('map_canvas'), {
		center: latlng,
		zoom: zoom,
		scrollwheel: false,		
		disableDragging: true,
		mapTypeControl: false,
		navigationControl: true,
		streetViewControl: false,
		scaleControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_TOP}
	});

  //style the map
	var style = [
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [
        { saturation: -90 }
      ]
    } ,
    {
      featureType: 'road.arterial',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    } ,
    {
      featureType: 'road.local',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    } ,
    {
      featureType: 'administrative.province',
      elementType: 'all',
      stylers: [
        { visibility: 'on' }
      ]
    } ,
    {
      featureType: 'administrative.locality',
      elementType: 'all',
      stylers: [
        { visibility: 'on' }
      ]
    } ,
    {
      featureType: 'administrative.neighborhood',
      elementType: 'all',
      stylers: [
        { visibility: 'on' }
      ]
    } ,
    {
      featureType: 'administrative.land_parcel',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    } ,
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    } ,
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        { visibility: 'on' }
      ]
    }
  ];

	var styledMapType = new google.maps.StyledMapType(style, {
		map: map,
		name: 'Styled Map'
	});

	map.mapTypes.set('map-style', styledMapType);
	map.setMapTypeId('map-style');

	//set fusion layer & supress fusion info window
	layer = new google.maps.FusionTablesLayer(tableID, {suppressInfoWindows: true});
	layer.setQuery("SELECT geometry FROM " + tableID);
	layer.setMap(map);


	//click listener on fusion layer
	google.maps.event.addListener(layer, 'click', function(e) {
	map.setZoom(12);
	if(infowindow) infowindow.close();
	else infowindow = new google.maps.InfoWindow();

		//info window on fusion layer
		infoWindowContent = infowindow.setContent(
		'<div id ="city-council">' +
			'<table>' +
			'<h4>Aldermanic District ' + e.row['2010_Madison_Aldermanic_District'].value + '</h4>' +
			'<tbody>' +
			'<tr>' + 
			'<td><img src="' + e.row['Alder_Photo'].value + '" width="100" alt="' + e.row['Alder'].value + '" /></td>' +
			'</tr>' +
			'<tr>' + 
			'<td><span class="bolder">' + e.row['Alder'].value + '</span><br>' + e.row['Phone_Number'].value + '<br><a href="mailto:' + e.row['Email_Address'].value + '">Email</a><br><a href="' + e.row['Website'].value + '" target="_blank">Website</a></td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
		'</div>');			

		infowindow.setPosition(e.latLng);
		map.setCenter(e.latLng);
		map.setZoom(12);
		infowindow.open(map);		
	});


	//submit form
	window.onkeypress = enterSubmit;
}

function generateInfoWindow(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
		
		//center and zoom map
		coordinate = results[0].geometry.location;

        marker = new google.maps.Marker({
			map: map,
			layer: layer,
			visible: false,
			animation: google.maps.Animation.DROP,
			position: coordinate
		});
		

		
        
        var script = document.createElement("script");
        script.setAttribute("src","https://www.google.com/fusiontables/api/query?sql=SELECT * FROM " +
            tableID + " WHERE ST_INTERSECTS(geometry, CIRCLE(LATLNG(" + coordinate.lat() + "," + coordinate.lng() + "), 0.1))&jsonCallback=addInfoWindow");
        document.getElementsByTagName("head")[0].appendChild(script);
				 
    } else {
        alert("Please make sure you entered your City, State & Zip Code");
    }
}


function enterSubmit() {
	if(event.keyCode==13) {
		zoomtoaddress();
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
	
        infowindow.setContent(
        
        '<div id ="city-council">' +
			'<table>' +
			'<h4>Aldermanic District ' + response.table.rows[0][0] + '</h4>' +
			'<tbody>' +
			'<tr>' + 
			'<td><img src="' + response.table.rows[0][7] + '" width="100" alt="' + response.table.rows[0][3] + '" /></td>' +
			'</tr>' +
			'<tr>' + 
			'<td><span class="bolder">' + response.table.rows[0][3] + '</span><br>' + response.table.rows[0][4] + '<br><a href="mailto:' + response.table.rows[0][5] + '">Email</a><br><a href="' + response.table.rows[0][6] + '" target="_blank">Website</a></td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
		'</div>');

        infowindow.setPosition(coordinate);
        map.setCenter(coordinate);
        infowindow.open(map);
    }
}