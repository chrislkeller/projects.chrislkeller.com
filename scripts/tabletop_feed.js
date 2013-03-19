	var urlStart = 'https://docs.google.com/spreadsheet/pub?';
	var urlKey = 'key=0An8W63YKWOsxdHVreXpLbVRWUGlJUlcweHVfZ01ycVE&';
	var urloutput = 'single=true&gid=2&output=html';
	var public_spreadsheet_url = 	urlStart + urlKey + urloutput;
	var newDataSet = [];

	//set up your DataTables column headers.
	var tableColumnSet =   [
		{ "sTitle": "Name", "sClass": "center"},
		{ "sTitle": "Website", "sClass": "center"},
		{ "sTitle": "City", "sClass": "center"}
	];

	$(document).ready( function() {
		Tabletop.init( { key: public_spreadsheet_url,
			callback: showInfo,
			simpleSheet: false,
			debug: true } )
	});

	function showInfo(data, tabletop) {

		$.each( tabletop.sheets(), function(i, sheet) {
			$("#table_info").append("<p>Your sheet named " + sheet.name + " has " + sheet.column_names.join(", ") + " as columns that you can pull data from.</p>");
		});

		// access the data from your spreadsheet
		$.each( tabletop.sheets("Active Breweries").all(), function(i, brewery) {
			var nameData = brewery.name;
			var websiteData = brewery.website;
			var cityData = brewery.city;
			var myArray = [nameData, websiteData, cityData]

			newDataSet.push(myArray);
		});

		$('#demo').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );

		// push the data to the table
		$('#example').dataTable( {
			"aaData": newDataSet,
			"aoColumns": tableColumnSet
		});
	}

		//define two custom functions (asc and desc) for string sorting
		jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
			return ((x < y) ? -1 : ((x > y) ?  0 : 0));
		};

		jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
			return ((x < y) ?  1 : ((x > y) ? -1 : 0));
		};