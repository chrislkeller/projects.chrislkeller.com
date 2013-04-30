var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){
    //writeTableWith('static-files/data/nicar_sessions_sked.json');
    initializeTabletopObject('0An8W63YKWOsxdE1aSVBMV2RBaWphdWFqT3VQOU1xeHc');
});
// end main function

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: evaluateTabletopObject,
        simpleSheet: true,
        debug: false
    });
}

// create object from google spreadsheet data
function evaluateTabletopObject(data){
    var dataSource = {
        objects: data
    };
    console.log(data);
    console.log(dataSource);
    writeTableWith(data)
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#data-table').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
        'bProcessing': true,

        /* works with tabletop */
        'aaData': dataSource,

        /* works with flat json file */
        //'sAjaxDataProp': 'objects',
        //'sAjaxSource': dataSource,

        'aoColumns': createTableColumns()
    });

	hideShowDiv(oTable);
    formatNumberData();
};

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display */
    var tableColumns = [
        {'mDataProp': null, 'sClass': 'control center', 'sDefaultContent': '<i class="icon-plus icon-black"></i>'},
        {'mDataProp': "day", 'sTitle': 'Day'},
        {'mDataProp': "time", 'sTitle': 'Time'},
        {'mDataProp': "place", 'sTitle': 'Place'}
    ];
    return tableColumns;
}

// format details function
function fnFormatDetails(oTable, nTr){
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
}

// hide show drilldown details
function hideShowDiv(oTable){

    var anOpen = [];

    // animation to make opening and closing smoother
    jqueryNoConflict('#data-table td.control').live('click', function () {
        var nTr = this.parentNode;
        var i = jqueryNoConflict.inArray(nTr, anOpen);

        if (i === -1) {
            jqueryNoConflict('i', this).attr('class', 'icon-minus icon-black');
            var nDetailsRow = oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
            jqueryNoConflict('div.innerDetails', nDetailsRow).slideDown();
            anOpen.push(nTr);
        } else {
            jqueryNoConflict('i', this).attr('class', 'icon-plus icon-black');
            jqueryNoConflict('div.innerDetails', jqueryNoConflict(nTr).next()[0]).slideUp( function (){
                oTable.fnClose(nTr);
                anOpen.splice(i, 1);
            });
        }
    });
}

//begin function
function formatNumberData(){

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