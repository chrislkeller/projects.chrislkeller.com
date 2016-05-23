    var tableID = "1kgPO58I9WMKxXwgoeWK5NTBJElfRg3t3BV8bbtc";
    var map;
    var mapdrawn = false;
    var jqueryNoConflict = jQuery;

    // do the following when the page is ready
    jqueryNoConflict(document).ready(function(){

    	 // run the initialize function
    	 createMap();

    });

    // write the map and call drawMap()
    function createMap(){

        // encrypted table id
        var centerCalif = new google.maps.LatLng(37.335194502529724, -119.366455078125);

        map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: centerCalif,
            zoom: 5,
            scrollwheel: false,
            draggable: true,
            mapTypeControl: false,
            navigationControl: true,
            streetViewControl: false,
            panControl: false,
            scaleControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_TOP}
        });

        drawMap(tableID);

    };


    // draw the map using kml
    function drawMap(table_number_1){

        var ROUTE_COLORS = ["#E31F26", "#12C4D6", "#d6c879", "#4EAF49", "#FF5F88", "#ED0FA3", "#984EA3", "#377EB8", "#FF7F00", "#9FBD30", "#43494F", "#6D5545"];

        jqueryNoConflict.get("kml/veterans-served.kml", function(data) {
            gmap.load_polygons({
                map: map,

                // required. all other params are optional
                data: data,

                // 'json' is default. can also use 'kml'
                // in which case pass the kml document
                // as data as a string
    			data_type: "kml",

    			getColor: function(data) {

        			// runs in the scope of each feature.
        			// Note: Hijacked to affect the line weight instead of fillcolor
        			// has access to the data in this.fields
    				return ROUTE_COLORS[data.to_code];
    			},

    			unselected_opts: {
        			strokeOpacity: 0.60
                },

    			highlighted_opts: {
    				//strokeColor: '#0000ff',
    				strokeOpacity: 1.0,
    				strokeWeight: 3
    			},

    			selected_opts: {
    				//strokeColor: '#0000ff',
    				strokeOpacity: 1.0,
    				strokeWeight: 3
    			},

    			 highlightCallback: function(e) {
    			     console.log("Highlighted from: "+this.fields.home + " to: " + this.fields.served);
    			     topperTextChange(this.fields.home, this.fields.served, ROUTE_COLORS[this.fields.to_code]);
    			 },

    			 selectCallback: function(e) {
    			     console.log("Clicked " + this.id);
    			     topperTextChange(this.fields.home, this.fields.served, ROUTE_COLORS[this.fields.to_code]);
    			 }
			 });
        });
    };


    function topperTextChange (county_from, county_to, route_color){
        jqueryNoConflict('#mapTopperInfo').html(
        "<strong>" + county_from + "</strong> to <strong style='color:" + route_color + "'>" +
        county_to + "</strong>: Narrative here.....");

        jqueryNoConflict('#intro-text').hide();

    	jqueryNoConflict('#mapTopperInfo').show();

    	return false;
    }