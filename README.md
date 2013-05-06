# Demo: Tabletop or flat file to Datatables Table

Use either [Tabletop.js](http://builtbybalance.com/Tabletop/) and a Google Spreadsheet to feed data to the [DataTables](http://datatables.net/) jQuery plugin, or use a flat JSON file.

Demo by [Chris Essig](https://twitter.com/CourierEssig) &amp; [Chris Keller](https://twitter.com/ChrisLKeller) made possible thanks to the Open Source work of [Built By Balance](http://builtbybalance.com) &amp; [Allan Jardine](https://github.com/DataTables).

- [Demo Page](http://projects.chrislkeller.com/demos/datafeed_to_datatables)
- [Repo](https://github.com/chrislkeller/datafeed_to_datatables)
- [ReadMe](https://github.com/chrislkeller/datafeed_to_datatables#readme)

----

## Options

The following options can be passed to the plugin when called:

* ```key```: This is the ID of the Google Spreadsheet.
  * Data type: string
  * Default value: ```0AsmHVq28GtVJdG1fX3dsQlZrY18zTVA2ZG8wTXdtNHc```
* ```sheetName```: This is name of the sheet in the Google Spreadsheet.
  * Data type: string
  * Default value: ```Posts```


*```dataSource```:  Specifies source of data for the table, either tabletop or flatfile. Default is tabletop

    // add if dataSource is tabletop
    spreadsheetKey: '0An8W63YKWOsxdE1aSVBMV2RBaWphdWFqT3VQOU1xeHc',

    // add if dataSource is a flat json file
    jsonFile: 'static-files/data/nicar_sessions_sked.json',

    // div to write table to
    tableElementContainer: '#demo',

    // table type can be standard or drilldown
    tableType: 'drilldown',

    // column headers from the spreadsheet you want to appear
    columnHeaders: ['Day', 'Time', 'Place'],

    // table sorting method
    // first value is the column to sort on
    // second is 'asc' or 'desc'
    tableSorting: [[ 3, "asc" ]],

    // minimum of 10 needed to alter the per page select menu
    displayLength: 15
















**Step 1** - [Prepare Google Spreadsheet data](http://builtbybalance.com/Tabletop/#tabletop-instructions).

**Step 2** - Add your spreadsheet key as an argument to the initializeTabletopObject function that is fired on document ready.

        initializeTabletopObject('0An8W63YKWOsxdHVreXpLbVRWUGlJUlcweHVfZ01ycVE');

**Step 3** - Set up your DataTables column headers in by adjusting the array in the createTableColumns() function. You'll be changing the value for both the mDataProp and sTitle keys.

        var tableColumns =   [
    		{'mDataProp': 'name', 'sTitle': 'Name', 'sClass': 'center'},
    		{'mDataProp': 'website', 'sTitle': 'Website', 'sClass': 'center'},
    		{'mDataProp': 'city', 'sTitle': 'City', 'sClass': 'center'}
    	];

**Step 4** - Push the data to the table in tabletop_feed.js. I am creating a table with an id of data-table-container in the #demo div. I am then writing the datatable to that data-table-container div.

        // create the table container and object
        function writeTableWith(dataSource){
            jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

            var oTable = jqueryNoConflict('#data-table-container').dataTable({
                'aaData': dataSource,
                'aoColumns': createTableColumns()
            });
        };

## Links & Resources

* [Data Tables](http://datatables.net/index)