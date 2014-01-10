# Demo: tabletop to datatables

Use [Tabletop.js](https://github.com/jsoma/tabletop) to pull json from Google Spreadsheet and feed it to the [DataTables](http://datatables.net/) jQuery plugin.

Demo by [Chris Essig](https://twitter.com/CourierEssig) &amp; [Chris Keller](https://twitter.com/ChrisLKeller) made possible thanks to the Open Source work of [Built By Balance](http://builtbybalance.com) &amp; [Allan Jardine](https://github.com/DataTables).

* [Demo Page](http://projects.chrislkeller.com/demos/tabletop_to_datatables)
* [Repo](https://github.com/chrislkeller/tabletop_to_datatables)
* [ReadMe](https://github.com/chrislkeller/tabletop_to_datatables#readme)
* Lisa Williams' [Absurdly Illustrated Guide to Sortable, Searchable Online Data Tables](http://dataforradicals.com/the-absurdly-illustrated-guide-to-sortable-searchable-online-data-tables/)

If interested in an enhanced version that allows you to choose between using a flat JSON file or tabletop.js to pull data from a Google spreadsheet, [here's a draft version](https://github.com/chrislkeller/datafeed_to_datatables).

----

**Step 1** - [Prepare Google Spreadsheet data](https://github.com/jsoma/tabletop).

**Step 2** - Add your spreadsheet key as an argument to the initializeTabletopObject function that is fired on document ready.

        initializeTabletopObject('0An8W63YKWOsxdHVreXpLbVRWUGlJUlcweHVfZ01ycVE');

**Step 3** - Set up your DataTables column headers in by adjusting the array in the createTableColumns() function. You'll be changing the value for both the mDataProp and sTitle keys.

        var tableColumns =   [
    		{'mDataProp': 'brewery', 'sTitle': 'Brewery', 'sClass': 'center'},
    		{'mDataProp': 'city', 'sTitle': 'City', 'sClass': 'center'},
    		{'mDataProp': 'website', 'sTitle': 'Website', 'sClass': 'center'}
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

* [Tabletop.js](https://github.com/jsoma/tabletop)
* [Datatables](http://datatables.net/index)
* [The Absurdly Illustrated Guide to Sortable, Searchable Online Data Tables](http://dataforradicals.com/the-absurdly-illustrated-guide-to-sortable-searchable-online-data-tables/)