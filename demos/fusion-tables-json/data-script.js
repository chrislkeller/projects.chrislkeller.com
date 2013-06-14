var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function() {
    getFusionTableData();
});
// end

// retrieve json from Fusion Table
function getFusionTableData() {
    var tableID = '1JoBPVazF_LHrzNAKzPWW6CLLEe8S5V7hbvScbfY';
    var query = 'SELECT * FROM ' + tableID;
    var encodedQuery = encodeURIComponent(query);
    var urlPrefix = 'https://www.googleapis.com/fusiontables/v1/query?key=';
    var apiKey = 'AIzaSyBRs68D8JTAbrLy6R_zsYABLMgOV6zxC-4';
    var urlSuffix = '&sql=' + encodedQuery + '&callback=?';
    var url = urlPrefix + apiKey + urlSuffix
    jqueryNoConflict.getJSON(url, createArrayFrom);
};
// end

// organize json data
function createArrayFrom(data){

    // begin loop
    for (var i = 0; i < data.rows.length; i++) {

        // set each item of loop to variable
        var row = data.rows[i];

        // set each item of object to variable
        var Endorser = row[0];
        var Position = row[1];
        var Endorsee = row[2];
        var Endorsee_Image = row[3];
        var Story_Url = row[4];

        if(Endorsee == "Eric Garcetti") {
            jqueryNoConflict("#data-container-garcetti").append(
                '<a href="' + Story_Url + '">' + Endorser + '</a>, ' + Position + '<br />');

        } else if(Endorsee == "Wendy Greuel") {
            jqueryNoConflict("#data-container-greuel").append(
                '<a href="' + Story_Url + '">' + Endorser + '</a>, ' + Position + '<br />');

        } else if(Endorsee == "Jan Perry") {
            jqueryNoConflict("#data-container-perry").append(
                '<a href="' + Story_Url + '">' + Endorser + '</a>, ' + Position + '<br />');

        } else if(Endorsee == "Kevin James") {
            jqueryNoConflict("#data-container-james").append(
                '<a href="' + Story_Url + '">' + Endorser + '</a>, ' + Position + '<br />');

        } else {

        }

   };
    // end loop

};
// end function