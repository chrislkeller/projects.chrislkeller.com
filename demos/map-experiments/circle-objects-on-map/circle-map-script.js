var jqueryNoConflict = jQuery;
var cityCircle;
var cityIntersections = [];
var infoWindows = [];
var map;
var cityInfoWindow = '';

// begin main function
jqueryNoConflict(document).ready(function() {

    getFusionTableData();

});
// end

// retrive json
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

    var columnRank = 0;
    var columnName = 1;
    var columnCollisions = 2;
    var columnCouncilDistrict = 3;
    var columnLocation = 4;
    var columnLat = 5;
    var columnLong = 6;

    // begin loop
    for (var i = 0; i < data.rows.length; i++) {

        var row = data.rows[i];
        var lat = row[columnLat];
        var lng = row[columnLong];
        var cityLatLng = new google.maps.LatLng(lat, lng)

        cityIntersections[parseInt(i)] = {

            'center': cityLatLng,
            'intersectionRank': row[columnRank],
            'intersectionName': row[columnName],
            'intersectionCollisions': row[columnCollisions],
            'intersectionCouncilDistrict': row[columnCouncilDistrict],
            'intersectionLocation': row[columnLocation],
            'radius': 80
        }

    };
    // end loop

    createMap();

};

// begin function
function createMap(){

    // add encrypted table id
    var userContributedTableId = '1RvesiAIGe14Gw3w7zjQm_2NBlZLl5EBSstdvf6E';
    var locationColumn = 'Location';
    var centerLosAngeles = new google.maps.LatLng(34.061841979429445, -118.26370239257812);

    map = new google.maps.Map(document.getElementById('data-map-canvas'), {
        center: centerLosAngeles,
        //center: new google.maps.LatLng(37.09024, -95.712891),
        zoom: 13,
        scrollwheel: false,
        draggable: true,
        mapTypeControl: false,
        navigationControl: true,
        streetViewControl: false,
        panControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP}
    });

    // begin loop to place intersection circles
    for (var i = 0; i < cityIntersections.length; i++) {
        var intersectionOptions = {
            strokeColor: "#000000",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "#000",
            fillOpacity: 1,
            map: map,
            center: cityIntersections[i].center,
            radius: cityIntersections[i].radius
        };

        cityCircle = new google.maps.Circle(intersectionOptions);
        cityCircle.setMap(map);

        //createInfoWindow(cityIntersections.center, i);
        attachClick(cityCircle, cityIntersections[i].intersectionName, cityIntersections[i].intersectionRank, cityIntersections[i].intersectionCollisions, i);

    };
    // end loop

    // Initialize ft layer of user contributed issues
    var userContributedLayer = new google.maps.FusionTablesLayer({
        query: {
            select: locationColumn,
            from: userContributedTableId
        },
        map: map,
        suppressInfoWindows: true
    });

    // click listener that writes to FT data to #my_map_data_div
    google.maps.event.addListener(userContributedLayer, 'click', function(e) {
        jqueryNoConflict('#data-map-info').html(
            '<p>' + e.row['What\'s your name?'].value + ' told us about <strong> ' +
            e.row['What intersection or address is the trouble?'].value + '</strong>:</p>' +
            '<blockquote>"' + e.row['Tell us, in short, what the issue is there or your story.'].value +
            '"</blockquote>');

    });

    google.maps.event.addDomListener(map, 'idle', function() {
      calculateCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(centerLosAngeles);
    });

};
// end

// function to maintain center point of map
function calculateCenter(){
    center = map.getCenter();
};
// end

// add click event/listener to circle
function attachClick(circle, name, rank, collisions, iwIndex) {
    google.maps.event.addListener (circle, 'click', function(evt) {
        jqueryNoConflict('#data-map-info').html(
            '<p>Coming in at No. ' + rank + ', the intersection of <strong>' + name +
            '</strong> has had ' + collisions +
            ' vehicle/pedestrian accidents over the last five years according to Los Angeles city officials.</p>');
        });
};
// end


// begin
function userSubmit(){

    jqueryNoConflict('#data-user-submit').show();

};
// end