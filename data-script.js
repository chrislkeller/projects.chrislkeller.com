var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function() {

    getFusionTableData();

});
// end

// retrive json from Fusion Table
function getFusionTableData() {
    var tableID = '113boV0mDDfay8ngXn8REwwIplC_uEWogLf6aepw';
    var query = 'SELECT * FROM ' + tableID;
    var encodedQuery = encodeURIComponent(query);
    var urlPrefix = 'https://www.googleapis.com/fusiontables/v1/query?key=';
    var apiKey = 'AIzaSyAtS1OYyuRY0inb23BK0nuGId3FiOC6Rb8';
    var urlSuffix = '&sql=' + encodedQuery + '&callback=?';
    var url = urlPrefix + apiKey + urlSuffix
    jqueryNoConflict.getJSON(url, createArrayFrom);
};
// end

// organize json data
function createArrayFrom(data){

    console.log(data);

    // begin loop
    for (var i = 0; i < data.rows.length; i++) {

        // set each item of loop to variable
        var row = data.rows[i];

        // set each item of object to variable
        var rank = row[0];
        var address = row[1];
        var integerOne = row[2];
        var integerTwo = row[3];
        var location = row[4];
        var latitude = row[5];
        var longitude = row[6];
        var emptyStringVariable = row[7];

        // write data to div
        jqueryNoConflict('#data-container').append(
            '<p>Location: ' + location + '</p>');
    };
    // end loop

};
// end