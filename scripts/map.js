//global variables
    var tableID = 2060606;
    var layer;

    var tablePolling = 2060539;
    var layerPolling;

    //var tableAlder = 823626;
    //var layerAlder;

    //var tableCensus = 823626;
    //var layerCensus;

    var latlng = new google.maps.LatLng(43.08594,-89.423218);
    var zoom = 11;
    var map;
    var marker;
    var infowindow;
    var infoWindowContent = '';
    var geocoder = new google.maps.Geocoder();
    var coordinate;
    var markersArray = [];

//begin primary function
$(document).ready(function(){

    // Initialize the map
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: latlng,
        zoom: zoom,
        scrollwheel: false,		
        disableDragging: true,
        mapTypeControl: false,
        navigationControl: true,
        streetViewControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_TOP}
    });

    //set shapes fusion layer & supress info window
    layer = new google.maps.FusionTablesLayer(tableID, {suppressInfoWindows: true});
    layer.setQuery("SELECT geometry FROM " + tableID);
    layer.setMap(map);
    
    //set polling fusion layer & supress info window
    //layerPolling = new google.maps.FusionTablesLayer(tablePolling, {suppressInfoWindows: true});
    //layerPolling.setQuery("SELECT Lat FROM " + tablePolling);
    //layerPolling.setMap(map);
    
    //click listener on fusion layer
    google.maps.event.addListener(layer, 'click', function(e) {
        $("#display-blox").html(
            '<p class="table">You Live in Ward ' + e.row['Ward'].value + ' in Aldermanic District ' + e.row['District'].value + '</p>' + 
            '<p class="table">You vote at ' + e.row['Location'].value + '<br />'  + e.row['Geocoded'].value + '</p>' +
            '<p class="table">Your city council representative is:</p>' +
            '<table>' +
            '<tbody>' +
            '<tr>' +
            '<td><img src="' + e.row['Alder_Photo'].value + '" width="100" alt="' + e.row['Alder'].value + '" /></td>' +
            '<td><span class="table">' + e.row['Alder'].value + '</span><br>' + e.row['Phone_Number'].value + 
            '<br><a href="mailto:' + e.row['Email_Address'].value + '">Email</a><br>' +
            '<a href="' + e.row['Website'].value + '" target="_blank">Website</a></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>'
            /*'<p>About Ward ' + e.row['Ward'].value + '</p>' + 
            '<table>' +
            '<tbody>' +
            '<tr>' +
            '<th>2010 Population</td>' +
            '<th>2000 Population</td>' +
            '<th>Change in Population</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + e.row['2010_Total_Madison_Population'].value + '</td>' +
            '<td>' + e.row['2000_Total_Madison_Population'].value + '</td>' +
            '<td>' + e.row['2010_Total_Madison_Population_Change_From_2000'].value + '</td>' +
            '</tr>' +	
            '</tbody>' +
            '</table>'*/
            );

        marker.setMap();

    });

    //submit form
    window.onkeypress = enterSubmit;

});
//end primary function


    //address search function
    function generateInfoWindow(results, status) {
    
        if (status == google.maps.GeocoderStatus.OK) {
        
            //center and zoom map
            coordinate = results[0].geometry.location;

            marker = new google.maps.Marker({
                map: map,
                layer: layer,
                visible: true,
                animation: google.maps.Animation.DROP,
                position: coordinate
        });
        

        var script = document.createElement("script");
            script.setAttribute("src","https://www.google.com/fusiontables/api/query?sql=SELECT * FROM " +
            tableID + " WHERE ST_INTERSECTS(geometry, CIRCLE(LATLNG(" + coordinate.lat() + "," + coordinate.lng() + "), 0.1))&jsonCallback=addInfoWindow");
        document.getElementsByTagName("head")[0].appendChild(script);
            
            } else {
                alert("Please make sure you entered your City, State & Zip Code");
            }
    }

    //keyboard submit
    function enterSubmit() {
        if(event.keyCode==13) {
            zoomtoaddress();
        }
    }

    //geocode function
    function zoomtoaddress() {

        //geocode the address
        geocoder.geocode({'address': document.getElementById("address").value }, generateInfoWindow);
    }

            function addInfoWindow(response) {
                if(response.table.rows.length) {
                if(infowindow) { infowindow.close(); }
                else infowindow = new google.maps.InfoWindow();
    
        infowindow.setContent();
        map.setCenter(coordinate);
        marker.setMap(map);
        //infowindow.setPosition(coordinate);
        //infowindow.open(map);
        
        $("#display-blox").html(
            '<p class="table">You Live in Ward ' + response.table.rows[0][0] + ' in Aldermanic District ' + response.table.rows[0][1] + '</p>' + 
            '<p class="table">You vote at ' + response.table.rows[0][2] + '<br />'  + response.table.rows[0][7] + '</p>' +
            '<p class="table">Your city council representative is:</p>' +
            '<table>' +
            '<tbody>' +
            '<tr>' +
            '<td><img src="' + response.table.rows[0][16] + '" width="100" alt="' + response.table.rows[0][12] + '" /></td>' +
            '<td><span class="table">' + response.table.rows[0][12] + '</span><br>' + response.table.rows[0][13] + 
            '<br><a href="mailto:' + response.table.rows[0][14] + '">Email</a><br>' +
            '<a href="' + response.table.rows[0][15] + '" target="_blank">Website</a></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '<p>About Ward ' + response.table.rows[0][0] + '</p>' + 
            '<table>' +
            '<tbody>' +
            '<tr>' +
            '<th>2010 Population</td>' +
            '<th>2000 Population</td>' +
            '<th>Change in Population</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + response.table.rows[0][17] + '</td>' +
            '<td>' + response.table.rows[0][19] + '</td>' +
            '<td>' + response.table.rows[0][20] + '</td>' +
            '</tr>' +	
            '</tbody>' +
            '</table>');
            
    }
}