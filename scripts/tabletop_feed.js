var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){
    initializeTabletopObject('0An8W63YKWOsxdHVreXpLbVRWUGlJUlcweHVfZ01ycVE');
});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create the table container and object
function writeTableWith(dataSource){
    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
        'aaData': dataSource,
        'aoColumns': createTableColumns()
    });
};

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display */
    var tableColumns =   [
		{'mDataProp': 'name', 'sTitle': 'Name', 'sClass': 'center'},
		{'mDataProp': 'website', 'sTitle': 'Website', 'sClass': 'center'},
		{'mDataProp': 'city', 'sTitle': 'City', 'sClass': 'center'}
	];
    return tableColumns;
}

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};