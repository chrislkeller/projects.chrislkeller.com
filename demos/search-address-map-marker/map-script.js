    var layer;
    var tableid = 655224;
    var center = new google.maps.LatLng(43.459182,-89.344149);
    var zoom = 7;
    var map;
    var geocoder = new google.maps.Geocoder();
    var jqueryNoConflict = jQuery;

    //begin main function
    jqueryNoConflict(document).ready(function(){
        initialize();
    });
    //end main function

    //write the map
    function initialize() {

        // Initialize the map
        map = new google.maps.Map(document.getElementById('map_canvas'), {
          center: center,
        	zoom: zoom,
        	mapTypeId: google.maps.MapTypeId.ROADMAP,
        	scrollwheel: false,
        	scaleControl: true,
        	mapTypeControl: false,
        	navigationControl: true,
        	streetViewControl: false,
        });

        //add the fusion layer
        layer = new google.maps.FusionTablesLayer(tableid);
        layer.setMap(map);
    };


    //find submitted address
    function zoomtoaddress() {

        //geocode the address
        geocoder.geocode( { 'address': document.getElementById("address").value }, function(results, status) {

        	// If the status of the geocode is OK
        	if (status == google.maps.GeocoderStatus.OK) {

        		// Change the center and zoom of the map
        		map.setCenter(results[0].geometry.location);
        		map.setZoom(14);
        		var marker = new google.maps.Marker({
        			map: map,
        			position: results[0].geometry.location
        		});

        		} else {

        		//fire alert if city and state aren't entered
        		alert("Please make sure you entered your City and State");

        	// OPTIONAL: find the new map bounds, and run a spatial query to return
        	// Fusion Tables results within those bounds.
        	sw = map.getBounds().getSouthWest();
        	ne = map.getBounds().getNorthEast();
        	layer.setQuery("SELECT lat FROM " + tableid + " WHERE ST_INTERSECTS(lat, RECTANGLE(LATLNG(" + sw.lat() + "," + sw.lng() + "), LATLNG(" + ne.lat() + "," + ne.lng() + ")))")
            }
        });

        window.onkeypress = enterSubmit;
    };

    //reset the map zoom, center layer query
    function reset() {
    	map.setCenter(center);
    	map.setZoom(zoom);
    	layer.setMap(map);
    };

    // Register Enter key press to submit form
    function enterSubmit() {
    	if(event.keyCode==13) {
    		zoomtoaddress();
      }
    };