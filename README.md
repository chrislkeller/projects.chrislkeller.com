tabletop to datatables
======================

Use [Tabletop.js](http://builtbybalance.com/Tabletop/) to pull json from Google Spreadsheet and feed it to the [DataTables](http://datatables.net/) jQuery plugin.

**Step 1** - [Prepare Google Spreadsheet data](http://builtbybalance.com/Tabletop/#tabletop-instructions).

**Step 2** - Adjust tabletop_feed.js to account for spreadsheet key.

    var urlStart = 'https://docs.google.com/spreadsheet/pub?';
    var urlKey = 'key=0An8W63YKWOsxdHVreXpLbVRWUGlJUlcweHVfZ01ycVE&';
    var urloutput = 'single=true&gid=2&output=html';
    var public_spreadsheet_url = 	urlStart + urlKey + urloutput;

**Step 3** - Set up your DataTables column headers in tabletop_feed.js.

    var tableColumnSet =   [
	{ "sTitle": "Name", "sClass": "center"},
    	{ "sTitle": "Website", "sClass": "center"},
    	{ "sTitle": "City", "sClass": "center"}
    ];

**Step 4** - Access the data from your spreadsheet in tabletop_feed.js.

    $.each( tabletop.sheets("Active Breweries").all(), function(i, brewery) {
    	var nameData = brewery.name;
    	var websiteData = brewery.website;
    	var cityData = brewery.city;
    	var myArray = [nameData, websiteData, cityData]
    	newDataSet.push(myArray);
    });

**Step 5** - Push the data to the table in tabletop_feed.js.

    $('#example').dataTable( {
	"aaData": newDataSet,
	"aoColumns": tableColumnSet
    });