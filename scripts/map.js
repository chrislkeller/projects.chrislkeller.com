//write the map on page load
$(document).ready(function() {

	createMap();

});


//select menu - out-thought myself with this one and couldn't create dynamically
var searchVariables = '<select id="newState">' +
'<option value="">All States</option>' +
'<option value="Alaska">Alaska</option>' +
'<option value="Alabama">Alabama</option>' +
'<option value="Arkansas">Arkansas</option>' +
'<option value="Arizona">Arizona</option>' +
'<option value="California">California</option>' +
'<option value="Colorado">Colorado</option>' +
'<option value="Connecticut">Connecticut</option>' +
'<option value="District of Columbia">District of Columbia</option>' +
'<option value="Delaware">Delaware</option>' +
'<option value="Florida">Florida</option>' +
'<option value="Georgia">Georgia</option>' +
'<option value="Hawaii">Hawaii</option>' +
'<option value="Iowa">Iowa</option>' +
'<option value="Idaho">Idaho</option>' +
'<option value="Illinois">Illinois</option>' +
'<option value="Indiana">Indiana</option>' +
'<option value="Kansas">Kansas</option>' +
'<option value="Kentucky">Kentucky</option>' +
'<option value="Louisiana">Louisiana</option>' +
'<option value="Massachusetts">Massachusetts</option>' +
'<option value="Maryland">Maryland</option>' +
'<option value="Maine">Maine</option>' +
'<option value="Michigan">Michigan</option>' +
'<option value="Minnesota">Minnesota</option>' +
'<option value="Missouri">Missouri</option>' +
'<option value="Mississippi">Mississippi</option>' +
'<option value="Montana">Montana</option>' +
'<option value="North Carolina">North Carolina</option>' +
'<option value="North Dakota">North Dakota</option>' +
'<option value="Nebraska">Nebraska</option>' +
'<option value="New Hampshire">New Hampshire</option>' +
'<option value="New Jersey">New Jersey</option>' +
'<option value="New Mexico">New Mexico</option>' +
'<option value="Nevada">Nevada</option>' +
'<option value="New York">New York</option>' +
'<option value="Ohio">Ohio</option>' +
'<option value="Oklahoma">Oklahoma</option>' +
'<option value="Oregon">Oregon</option>' +
'<option value="Pennsylvania">Pennsylvania</option>' +
'<option value="Rhode Island">Rhode Island</option>' +
'<option value="South Carolina">South Carolina</option>' +
'<option value="South Dakota">South Dakota</option>' +
'<option value="Tennessee">Tennessee</option>' +
'<option value="Texas">Texas</option>' +
'<option value="Utah">Utah</option>' +
'<option value="Virginia">Virginia</option>' +
'<option value="Vermont">Vermont</option>' +
'<option value="Washington">Washington</option>' +
'<option value="Wisconsin">Wisconsin</option>' +
'<option value="West Virginia">West Virginia</option>' +
'<option value="Wyoming">Wyoming</option>' +
'</select>' +
'<select id="newYear">' +
'<option value="">All Years</option>' +
'<option value="2012">2012</option>' +
'<option value="2011">2011</option>' +
'<option value="2010">2010</option>' +
'<option value="2009">2009</option>' +
'<option value="2008">2008</option>' +
'<option value="2007">2007</option>' +
'<option value="2006">2006</option>' +
'<option value="2005">2005</option>' +
'<option value="2004">2004</option>' +
'<option value="2003">2003</option>' +
'<option value="2002">2002</option>' +
'<option value="2001">2001</option>' +
'<option value="2000">2000</option>' +
'</select>' +
'<input type="button" class="mapActionButton" value="Search" id="searchBanks" onclick="changeSearch()"/>' +
'<input type="button" class="mapActionButton" value="Reset Map" onClick="window.location.href=window.location.href" />';

//ft layer
var layer; 

//ft table
var tableid = 926367;

//map
var map;

//geocoder instance
var geocoder = new google.maps.Geocoder();

//gviz
var table;

//FT data in gviz object
var datatable;

//infowindow
var infowindow;

//center of map
var center = new google.maps.LatLng(38.134557,-98.349609);

//default zoom
var zoom = 4;

google.load('visualization', '1', {'packages':['table']});

function createMap() {
		
		//map options
		map = new google.maps.Map(document.getElementById('map_canvas'), {
			center: center,
			zoom: zoom,
			minZoom: 4,
			maxZoom: 6,
			scrollwheel: false,		
			disableDragging: true,
			mapTypeControl: false,
			navigationControl: true,
			streetViewControl: false,
			scaleControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_TOP}
		});

		//intial fusion layer & supress fusion info window
		layer = new google.maps.FusionTablesLayer(tableid, {suppressInfoWindows: true});
		layer.setQuery("SELECT Location FROM " + tableid);
		layer.setMap(map);

		//writes the select menus to the search bar		
		document.getElementById('map-action-bar').innerHTML = searchVariables;
		
		//adds click listener on layer
		google.maps.event.addListener(layer, 'click', function(e) {
		if(infowindow) infowindow.close();
		else infowindow = new google.maps.InfoWindow();

			//write FT data to info window
			text = infowindow.setContent(
				'<p><strong>Bank Name: </strong>' + e.row['Name'].value + '</p>' +
				'<p><strong>Closing Date: </strong>' + e.row['Year'].value + '</p>' +
				'<p><strong>Location: </strong>' + e.row['Location'].value + '</p>' +
				'<p><strong>Purchased By: </strong>' + e.row['Purchaser'].value + '</p>' +
				'<p><a href="' + e.row['Info'].value + '" target="_blank">Information</a></p>'
			);			

			infowindow.setPosition(e.latLng);
			map.setCenter(e.latLng);
			infowindow.open(map);		
		});
	
		//query FT data for visualization
		var queryText = encodeURIComponent("SELECT Name, Year, Location, Purchaser, Info FROM 926367 ORDER BY Year DESC");
		var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
		query.send(getData);
}


		//write FT data to table
		function getData(response) {
			table = new google.visualization.Table(document.getElementById('visualization'));
			datatable = response.getDataTable();
			table.draw(datatable, {showRowNumber: true});
			
			//add table listener when row clicked
			google.visualization.events.addListener(table, 'select', selectHandler);
		}
		//end function


		//match table data to map data
		function selectHandler() {

			//get lat/lng from FT
				var selection = table.getSelection();
				var namer = datatable.getValue(selection[0].row, 0);
				var closeDate = datatable.getValue(selection[0].row, 1);
				var location = datatable.getValue(selection[0].row, 2);
				var purchaser = datatable.getValue(selection[0].row, 3);
				var info = datatable.getValue(selection[0].row, 4);

			infoWindowContent = (
			'<p><strong>Bank Name: </strong>' + namer + '</p>' +
			'<p><strong>Closing Date: </strong>' + closeDate + '</p>' +
			'<p><strong>Location: </strong>' + location + '</p>' +
			'<p><strong>Purchased By: </strong>' + purchaser + '</p>' +
			'<p><a href="' + info + '" target="_blank">Information</a></p>');

			//geocode the address
			geocoder.geocode({ 'address': location }, generateInfoWindow);
		}
		//end function

        //write info window at geocoded location
        function generateInfoWindow(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                coordinate = results[0].geometry.location;
                
            //display the info window at the geocoded location
                if(infowindow) { infowindow.close(); }
                    else infowindow = new google.maps.InfoWindow();
                    
                infowindow.setContent(infoWindowContent);
                infowindow.setPosition(coordinate);
                map.setCenter(coordinate);
                infowindow.open(map);

        		} else {
        		  alert('Sorry, The bank location can\'t be found.');
                }

        }
        //end function
	

		/* search function based on user's selection
		that I wrote longhand, though there must 
		be some kind of shortcut because I'm basically
		rewriting the main function again? */
		function changeSearch(stater, yearer) {
			if(infowindow) infowindow.close();
			layer.setMap();
			
				//assigns select menu values to variables
				stater = document.getElementById('newState').value;
				yearer = document.getElementById('newYear').value;

			//sets new layer to map
			layer = new google.maps.FusionTablesLayer(tableid, {suppressInfoWindows: true});

			//with a query based on the variables
			layer.setQuery("SELECT Location FROM " + tableid + " WHERE Bank_State CONTAINS '" + stater + "' AND Year CONTAINS '" + yearer + "' ORDER BY 'Location'");

			//and sets the map
			layer.setMap(map);

			/* here we build the table again but based on the variables from the menu values */
			var queryText = encodeURIComponent("SELECT Name, Year, Location, Purchaser, Info FROM " + tableid + " WHERE Bank_State CONTAINS '" + stater + "' AND Year CONTAINS '" + yearer + "' ORDER BY 'Year' DESC");
			var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
			query.send(getData);

			//adds a click listener on search layer
			google.maps.event.addListener(layer, 'click', function(e) {
			 if(infowindow) infowindow.close();
			 else infowindow = new google.maps.InfoWindow();

                //writes the info window on search layer
                infowindow.setContent(
                    '<p><strong>Bank Name: </strong>' + e.row['Name'].value + '</p>' +
                    '<p><strong>Closing Date: </strong>' + e.row['Year'].value + '</p>' +
                    '<p><strong>Location: </strong>' + e.row['Location'].value + '</p>' +
                    '<p><strong>Purchased By: </strong>' + e.row['Purchaser'].value + '</p>' +
                    '<p><a href="' + e.row['Info'].value + '" target="_blank">Information</a></p>');
				
                infowindow.setPosition(e.latLng);
                map.setCenter(e.latLng);
                infowindow.open(map);
            });
    		
        }
        //end function