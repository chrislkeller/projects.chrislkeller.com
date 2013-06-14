var jqueryNoConflict = jQuery;
var defaultTableOptions = defaultTableOptions || {};
var dataTablesConfig = dataTablesConfig || {};

// begin main function
jqueryNoConflict(document).ready(function(){
    dataTablesConfig.initialize();
});
// end main function

// default configuration options
var defaultTableOptions = {

    // specifies source of data for the table, either 'tabletop' or 'flatfile'.
    dataSource: 'tabletop',

    // add the key from your Google spreadsheet if the dataSource is set to tabletop.
    spreadsheetKey: '0An8W63YKWOsxdE1aSVBMV2RBaWphdWFqT3VQOU1xeHc',

    // add the path to a flat json file if the dataSource is set to flatfile.
    jsonFile: 'static-files/data/nicar_sessions_sked.json',

    // the div id in which the table will be displayed.
    tableElementContainer: '#demo',

    // the type of table to render, either 'standard' or 'drilldown'.
    // drilldown adds drill-down rows that contain more information.
    tableType: 'drilldown',

    // names of the columns in your spreadsheet or keys in the json.
    // tabletop.js strips spaces and underscores and lowercases everything.
    dataHeaders: ['day', 'time', 'place'],

    // proper display names as you want them to appear in the table
    columnHeaders: ['Day', 'Time', 'Place'],

    // The table sorting method.
    // The first value is the zero-indexed column to sort on. The second value can be 'asc' or 'desc'.
    tableSorting: [[ 3, "asc" ]],

    // needs to at least be set to a minimum of 10 needed to alter the per page select menu.
    displayLength: 15
};

// begin main datatables object
var dataTablesConfig = {

    initialize: function(){

        if (!defaultTableOptions.dataSource){
            //jqueryNoConflict.error('please set the dataSource to either tabletop or flatfile');
            alert('Please set the dataSource to either tabletop or flatfile');

        } else if (defaultTableOptions.dataSource === 'tabletop'){
            dataTablesConfig.retrieveTabletopObject();

        } else if (defaultTableOptions.dataSource === 'flatfile'){
            dataTablesConfig.writeTableWith(defaultTableOptions.jsonFile);

        } else {
            //jqueryNoConflict.error('please set the dataSource to either tabletop or flatfile');
            alert('Please set the dataSource to either tabletop or flatfile');
        }
    },

    retrieveTabletopObject: function(){
        Tabletop.init({
            key: defaultTableOptions.spreadsheetKey,
            callback: dataTablesConfig.writeTableWith,
            simpleSheet: true,
            parseNumbers: true,
            debug: true
        });
    },

    // function to push splice object to table column array if drilldown selected
    createArrayOfTableColumns: function(){

        var dataHeaders = defaultTableOptions.dataHeaders;
        var displayHeaders = defaultTableOptions.columnHeaders;

        if (defaultTableOptions.tableType === 'drilldown'){
            var oTableColumnsObject = {'mDataProp': null, 'sClass': 'control center', 'sTitle': 'Details', 'sDefaultContent': '<img src="static-files/images/details_open_base.png">'};
            dataTablesConfig.oTableColumns.splice(0, 0, oTableColumnsObject);
        }

        for (var i=0;i<dataHeaders.length;i++){
            var oTableColumnBuild = {
                'mDataProp': dataHeaders[i].toLowerCase().replace(/\s/g, "").replace(/_/g, ""),
                'sTitle': displayHeaders[i]
            };
            dataTablesConfig.oTableColumns.push(oTableColumnBuild);
        }

    },

    // create table headers with array of table header objects
    oTableColumns: [],

    oTableDefaultObject: {
        'oLanguage': {
            'sLengthMenu': '_MENU_ records per page'
            },
        'bProcessing': true,
        'sPaginationType': 'bootstrap',
        'iDisplayLength': defaultTableOptions.displayLength,

        // sets table sorting
        'aaSorting': defaultTableOptions.tableSorting,

        // sets column headers
        'aoColumns': null,

        /* data source needed for tabletop */
        'aaData': null,

        /* data source needed for flat json file */
        'sAjaxDataProp': null,
        'sAjaxSource': null
    },

    // create the table container and object
    writeTableWith: function(dataSource){
        dataTablesConfig.createArrayOfTableColumns();

        jqueryNoConflict(defaultTableOptions.tableElementContainer).html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

        // write values to oTableDefaultObject if tabletop
        if (defaultTableOptions.dataSource === 'tabletop'){
            dataTablesConfig.oTableDefaultObject['aaData'] = dataSource;
            dataTablesConfig.oTableDefaultObject['aoColumns'] = dataTablesConfig.oTableColumns;

        // else write values if flatfile
        } else {
            dataTablesConfig.oTableDefaultObject['aoColumns'] = dataTablesConfig.oTableColumns;
            dataTablesConfig.oTableDefaultObject['sAjaxDataProp'] = 'objects';
            dataTablesConfig.oTableDefaultObject['sAjaxSource'] = dataSource;
        }

        var oTable = jqueryNoConflict('#data-table-container').dataTable(dataTablesConfig.oTableDefaultObject);

    	dataTablesConfig.hideShowDiv(oTable);
        dataTablesConfig.formatNumberData();
    },

    // format details function
    fnFormatDetails: function (oTable, nTr){
        var oData = oTable.fnGetData(nTr);

        /* swap out the properties of oData to reflect
        the names of columns or keys you want to display */
        var sOut =
            '<div class="innerDetails">' +
                '<p>' + oData.day + '</p>' +
                '<p>' + oData.time + '</p>' +
                '<p>' + oData.place + '</p>' +
                '<p>' + oData.title + '</p>' +
                '<p>' + oData.speaker + '</p>' +
                '<p>' + oData.description + '</p>' +
            '</div>';

        return sOut;
    },

    // hide show drilldown details
    hideShowDiv: function (oTable){

        var anOpen = [];

        // animation to make opening and closing smoother
        jqueryNoConflict(defaultTableOptions.tableElementContainer + ' td.control').live('click', function () {
            var nTr = this.parentNode;
            var i = jqueryNoConflict.inArray(nTr, anOpen);

            if (i === -1) {
                jqueryNoConflict('img', this).attr('src', 'static-files/images/details_close_base.png');
                var nDetailsRow = oTable.fnOpen(nTr, dataTablesConfig.fnFormatDetails(oTable, nTr), 'details');
                jqueryNoConflict('div.innerDetails', nDetailsRow).slideDown();
                anOpen.push(nTr);
            } else {
                jqueryNoConflict('img', this).attr('src', 'static-files/images/details_open_base.png');
                jqueryNoConflict('div.innerDetails', jqueryNoConflict(nTr).next()[0]).slideUp( function (){
                    oTable.fnClose(nTr);
                    anOpen.splice(i, 1);
                });
            }
        });
    },

    formatNumberData: function (){

        //define two custom functions (asc and desc) for string sorting
        jqueryNoConflict.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
            return ((x < y) ? -1 : ((x > y) ?  0 : 0));
        };

        jqueryNoConflict.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
            return ((x < y) ?  1 : ((x > y) ? -1 : 0));
        };

        // More number formatting
        jqueryNoConflict.fn.dataTableExt.oSort['number-asc'] = function (x, y) {
            x = x.replace('N/A','-1').replace(/[^\d\-\.\/]/g, '');
            y = y.replace('N/A', '-1').replace(/[^\d\-\.\/]/g, '');
            if (x.indexOf('/') >= 0) x = eval(x);
            if (y.indexOf('/') >= 0) y = eval(y);
            return x / 1 - y / 1;
        };

        jqueryNoConflict.fn.dataTableExt.oSort['number-desc'] = function (x, y) {
            x = x.replace('N/A', '-1').replace(/[^\d\-\.\/]/g, '');
            y = y.replace('N/A', '-1').replace(/[^\d\-\.\/]/g, '');
            if (x.indexOf('/') >= 0) x = eval(x);
            if (y.indexOf('/') >= 0) y = eval(y);
            return y / 1 - x / 1;
        };
    }
}
// end main datatables object