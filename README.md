# Demo: tabletop to datatables

Use [Tabletop.js](http://builtbybalance.com/Tabletop/) to pull json from Google Spreadsheet and feed it to the [DataTables](http://datatables.net/) jQuery plugin.

Demo by [Chris Essig](https://twitter.com/CourierEssig) &amp; [Chris Keller](https://twitter.com/ChrisLKeller) made possible thanks to the Open Source work of [Built By Balance](http://builtbybalance.com) &amp; [Allan Jardine](https://github.com/DataTables).

- [Demo Page](http://projects.chrislkeller.com/demos/tabletop_to_datatables)
- [Repo](https://github.com/chrislkeller/tabletop_to_datatables)
- [ReadMe](https://github.com/chrislkeller/tabletop_to_datatables#readme)

If interested in choosing between use of tabletop.js or a flat file, [here's a draft version](https://github.com/chrislkeller/datafeed_to_datatables).

----

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