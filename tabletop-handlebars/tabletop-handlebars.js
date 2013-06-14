var jqueryNoConflict = jQuery;

// variable to hold the url to your spreadsheet
var dataSpreadsheet = 'https://docs.google.com/spreadsheet/pub?key=0An8W63YKWOsxdC1rbVVTUGRUdXBwTHY3SHNnSFZrNWc&output=html';

// the sheet being queried
var dataSheet = 'Sheet1';

    // function to initialize tabletop
    jqueryNoConflict(document).ready(function() {

        Tabletop.init({
            key: dataSpreadsheet,
            callback: retriveData,
            parseNumbers: true,
            simpleSheet: false,
            debug: false
        });

    });
    // end

// display data on template
function retriveData(data, tabletop) {

    var handlebarsData = {
        objects: data.Sheet1.elements
    };

    handlebarsDebugHelper();
    renderHandlebarsTemplate('table-content.handlebars', '#handlebars-content', handlebarsData);

};
// end