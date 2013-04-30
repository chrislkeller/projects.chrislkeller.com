var jqueryNoConflict = jQuery;

// begin main function
$(document).ready(function(){
    writeTableWith('static-files/data/nicar_sessions_sked.json');
});
// end main function

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#data-table').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = $('#data-table-container').dataTable({
        'bProcessing': true,
        'sAjaxSource': dataSource,
        'sAjaxDataProp': 'objects',
        'aoColumns': createTableColumns()
    });

	hideShowDiv(oTable);
    formatNumberData();
};

// create table headers
function createTableColumns(){
    var tableColumns = [
        {'mDataProp': null, 'sClass': 'control center', 'sDefaultContent': '<i class="icon-plus icon-black"></i>'},
        {'mDataProp': "day", 'sTitle': 'Day'},
        {'mDataProp': "time", 'sTitle': 'Time'},
        {'mDataProp': "place", 'sTitle': 'Place'}
    ];
    return tableColumns;
}

// hide show drilldown details
function hideShowDiv(oTable){

    var anOpen = [];

    // animation to make opening and closing smoother
    jqueryNoConflict('#data-table td.control').live('click', function () {
        var nTr = this.parentNode;
        var i = $.inArray(nTr, anOpen);

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

// format details function
function fnFormatDetails(oTable, nTr){
    var oData = oTable.fnGetData(nTr);

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