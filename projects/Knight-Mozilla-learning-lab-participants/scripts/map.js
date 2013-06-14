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
	var image = 'images/location.png';
	var infowindow;
	var tableid = 1137090;
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
	zoom: 3,
	center: point,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	scrollwheel: false,
	disableDragging: true,
	mapTypeControl: false,
	navigationControl: true,
	streetViewControl: false,
	scaleControl: false,
	navigationControlOptions: {
		style: google.maps.NavigationControlStyle.SMALL,
		position: google.maps.ControlPosition.RIGHT_TOP
		}
	});

	//write the layer
	layer = new google.maps.FusionTablesLayer(tableid, {suppressInfoWindows: true});
	//layer = new google.maps.FusionTablesLayer(tableid);
	//layer.setQuery("SELECT LAT FROM  " + tableid);
	layer.setMap(map);

			//profile text on initial layer
			document.getElementById('moz-profile').innerHTML = 
			'<h2>Moz News Lab</h2>' +
			'<p>The Knight-Mozilla learning lab blends learning and training via live webinars featuring leading digital journalism thinkers and open-web innovators.</p>' +
			'<p>This map builds off of <a href="http://twitter.com/#!/Tathagata" target="_blank">Tathagata Dasgupta\'\s</a> <a href="http://tathagata.github.com/moznewslab/" target="_blank">map</a> and <a href="http://twitter.com/#!/phillipadsmith" target="_blank">Phillip Smith\'\s</a> <a href="http://0fe5189b.dotcloud.com/" target="_blank">map</a> before it.</p>' +
			'<p>Click a marker to see your fellow participants are, links to their sites and profiles and their interests. You can also search to see if anyone has the same interests listed as you.</p>' +
			'<p>Haven\'\t filled out your interests? <a href="http://p2pu.org/en/profile/edit/" target="_blank">Edit your profile</a> and find potential co-consiprators. And hit me up on <a href="http://twitter.com/#!/ChrisLKeller" target="_blank">Twitter</a> with a link to your profile if you do and I\'\ll update the map. </p>';

//place marker at user's location
	new google.maps.Marker({
	position: point,
	map: map,
	icon: image,
	animation: showMe,

    });

//click listener
	google.maps.event.addListener(layer, 'click', function(e) {

		//writes FT data to profile
		document.getElementById('moz-profile').innerHTML = 
			'<h2>' + e.row['FULL_NAME'].value + '</h2>' +
			'<img src="' + e.row['PHOTO'].value + '" width="60" height="70" alt="' + e.row['FULL_NAME'].value + '" />' +
			'<p>' + e.row['CITY'].value + ', ' + e.row['STATE'].value + ', ' + e.row['COUNTRY'].value + '</p>' +
			'<a href="' + e.row['PROFILE'].value + '" target="_blank">P2P Profile</a><br>' +
			'<a href="http://twitter.com/#!/' + e.row['TWITTER'].value + '" target="_blank">Twitter</a><br>' +
			'<a href="http://www.' + e.row['WEBSITE'].value + '" target="_blank">Website</a><br>' +
			'<p><strong>Interests:</strong><br>' + e.row['INTERESTS'].value + '</p>' ;

		map.setCenter(e.latLng);

	});
}); 

	//alert if no location
	} else {
	  alert('W3C Geolocation API is not available');
	} 

	//search FT layer
	function changeMap(store_name) {
	store_name = store_name.replace("'", "\\'");
	layer.setQuery("SELECT LAT FROM " + tableid + " WHERE 'INTERESTS' CONTAINS '" + store_name + "'");

	google.maps.event.addListener(layer, 'click', function(e) {

		//writes FT data to profile
		document.getElementById('moz-profile').innerHTML = 
			'<h2>' + e.row['FULL_NAME'].value + '</h2>' +
			'<img src="' + e.row['PHOTO'].value + '" width="60" height="70" alt="' + e.row['FULL_NAME'].value + '" />' +
			'<p>' + e.row['CITY'].value + ', ' + e.row['STATE'].value + ', ' + e.row['COUNTRY'].value + '</p>' +
			'<a href="' + e.row['PROFILE'].value + '" target="_blank">P2P Profile</a><br>' +
			'<a href="http://twitter.com/#!/' + e.row['TWITTER'].value + '" target="_blank">Twitter</a><br>' +
			'<a href="http://www.' + e.row['WEBSITE'].value + '" target="_blank">Website</a><br>' +
			'<p><strong>Interests:</strong><br>' + e.row['INTERESTS'].value + '</p>' ;

		map.setCenter(e.latLng);
	});

	}
