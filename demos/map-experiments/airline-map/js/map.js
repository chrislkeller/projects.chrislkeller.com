// Global Variable Declaration
var table1 = "3281924";
var map;
var geocoder;
var mapdrawn = false;
var basemap_location = "http://project.wnyc.org/news-maps/air-commuting/index.html";
// var kml_path = "http://dl.dropbox.com/u/466610/"
var nyLayer1 = new google.maps.KmlLayer(null);
var nyLayer2 = new google.maps.KmlLayer(null);


// get named params from the URL, if the exist, using jquery.url.min.js
var map_lat = $.url.param("lat");
var map_lon = $.url.param("lon");
var map_zoom = $.url.param("zoom");
var map_select = $.url.param("sel");

// set defaults if no named params in URL
if (map_lat === "") {
	map_lat = 40;
}

if (map_lon === "") {
	map_lon = -98.7;
}

if (map_zoom === "") {
	map_zoom = 4;
} else {
	map_zoom = parseInt(map_zoom);
}

if (map_select === "") {
	map_select = 0;
}

// set initial starting point for map
var centerpoint = new google.maps.LatLng(map_lat, map_lon);

var MY_MAPTYPE_ID = 'wnyc';


function drawmap(table_number_1) {

	var ROUTE_COLORS = ["#E31F26", "#12C4D6", "#d6c879", "#4EAF49", "#FF5F88", "#ED0FA3", "#984EA3", "#377EB8", "#FF7F00", "#9FBD30", "#43494F", "#6D5545"];

	 $.get("kml/air-commuters-us-2.kml", function(data) {

		gmap.load_polygons({
			map: map,
			data: data, //required. all other params are optional
			data_type: "kml", // 'json' is default. can also use 'kml' in which case pass the kml document as data as a string

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
				console.log("Highlighted from:"+this.fields.from + " to:" + this.fields.to);
				topperTextChange(this.fields.from, this.fields.to, this.fields.other_means, ROUTE_COLORS[this.fields.to_code]);


			},
			selectCallback: function(e) {
				console.log("Clicked " + this.id);
				topperTextChange(this.fields.from, this.fields.to, this.fields.other_means, ROUTE_COLORS[this.fields.to_code]);
			}
		});
	});

}


function currentMapUrl() {
	// builds the current view's URL for sharing, embedding
	var embed_url_response = basemap_location +
			"?lat=" + map.getCenter().lat().toFixed(4) +
			"&lon=" + map.getCenter().lng().toFixed(4) +
			"&zoom=" + map.getZoom();
			// + "&sel=" + $('#map_menu').attr('selectedIndex');
	return embed_url_response;
}

function embedBox() {
	var embed_url_response = currentMapUrl();
	jAlert('<strong>The link for this view of the map is:<br></strong>'+ embed_url_response+'<br><br><strong>To embed this view on a blog or site, copy this:<br></strong>&lt;iframe src=\"'+embed_url_response+'\" height=\"650\" width=\"100%\" scrolling=\"no\" frameborder=\"0\"&gt;&lt;/iframe>', 'Share or Embed');

}

function infoBox() {
	jAlert("<p><strong>Deeper Data Details</strong></p><p>This map is inspired by and built from analysis done at the <a href='http://wagner.nyu.edu/rudincenter/' target='_blank'>Rudin Center for Transportaiton Policy &amp; Management</a> at the NYU Wagner School. It's supplementary to the center's <a href='http://wagner.nyu.edu/rudincenter/publications/supercommuter_report.pdf' target='_blank'>recent report about supercommunters</a>. Traveler numbers from <a href='http://www.fhwa.dot.gov/planning/census_issues/ctpp/' target='_blank'>U.S. Census packages</a> prepared for the U.S. Dept. of Transportation from 2006-2008 American Community Survey data.</p><p>Our entire <a href='https://www.google.com/fusiontables/DataSource?docid=1mrAGr8KEGHXpkNGSxJjMGBR9q1MkouRXrf2nE60' target='_blank'>data set is here</a>.</p><p>Values shown are estimates of commuters who live beyond their work's metro area and responded \"other\" to how they got there -- other than car, truck, van, bus, taxicab, motorcycle, trolley, streetcar, subway, elevated train, railroad, ferryboat, bicycle, walked or worked at home. Given the remaining possibilities, and the distances involved, we feel comfortable assuming the rest are by air. (<a href='mailto:jkeefe@wnyc.org?subject=Commuter_Map_Feedback' target='_blank'>Let us know</a> if you have other ideas.)</a></p><p>ACS data is subject to high margins of error at smaller populations, so the exact number of travelers is not known, and only estimates of 25 or more people are shown.</p><p>The data is county-based, so paths begin and end at points in each county, not necessarily at cities or airports.</p>", "More Info");

}

// Espands current map to full size in a new window
function expandWindow() {
    window.open( currentMapUrl() );
    return false;
}

function topperTextChange (county_from, county_to, estimated_other, route_color) {
	$('#mapTopperInfo').html("<strong>" + county_from + "</strong><br>to <strong style='color:" + route_color + "'>"  + county_to +   "</strong><br>Census surveys suggest <strong>" + estimated_other + "</strong> people<br>fly this route for work each week.");

	$('#mapTopperInfo').show();

	return false;
}

function initialize() {
  // set up custom Google Maps styling
  var stylez =


[
	{
	    featureType: "road",
	    elementType: "all",
	    stylers: [
	      { visibility: "off" },
	      { gamma: 2.78 }
	    ]
	  },{
	    featureType: "poi",
	    elementType: "all",
	    stylers: [
	      { saturation: -50 },
	      { gamma: 2.96 }
	    ]
	  },{
	    featureType: "transit",
	    elementType: "all",
	    stylers: [
	      { visibility: "off" }
	    ]
	  },{
	    featureType: "road.arterial",
	    elementType: "geometry",
	    stylers: [
	      { hue: "#fff700" },
	      { gamma: 2.05 }
	    ]
	}, {
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" },
        { saturation: -71 },
        { lightness: 0 },
        { gamma: 1.1 }
      ]
    },   {
	    featureType: "water",
	    stylers: [
	      { saturation: -16 },
	      { gamma: 1.65 }
	    ]
	  }

  ];

  // set base map options
  var mapOptions = {
    zoom: map_zoom,
    center: centerpoint,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
	zoomControlOptions: {style: google.maps.ZoomControlStyle.DEFAULT},
    panControl: false,
	scrollwheel: false,
    mapTypeControlOptions: {
       mapTypeIds: [MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

	// Set one option for the styled map: Its name
	var styledMapOptions = {
    name: "WNYC"
	};

	// this creates the new StyledMapType object, using the styles variable and the options
	var myMapType = new google.maps.StyledMapType(stylez, styledMapOptions);

	// set 'WNYC' as a map type, naming it ... then use that one to start with
	map.mapTypes.set('WNYC', myMapType);
	map.setMapTypeId('WNYC');

	// This runs our map-drawing menu, passing info used to set table, zoom, etc.
	drawmap(table1);

}

// Do the following when the page is ready
$(document).ready(function(){

	 // Initialize address box in wnyclabs.addressbox.js
	 addressBoxSetup();

	 // run the initialize function
	 initialize();

});


