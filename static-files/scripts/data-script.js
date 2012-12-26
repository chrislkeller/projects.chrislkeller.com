    var jqueryNoConflict = jQuery;
    var map;

    // begin main function
    jqueryNoConflict(document).ready(function(){
        google.maps.event.addDomListener(window, 'load', createMap);
    });
    // end


    // begin function
    function createMap() {

        var centerCalif = new google.maps.LatLng(34.29461534118775, -118.26919555664062);
        var accentTableId = '15uGEmPSJfMKzwU8nV0eARKgrSBAy-F3CsTiv4ic';
        var locationColumn = 'location';

        map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: centerCalif,
            zoom: 8,
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

        // Initialize ft layer
        layer = new google.maps.FusionTablesLayer({
            query: {
                select: locationColumn,
                from: accentTableId
            },
            map: map,
            suppressInfoWindows: true
        });

        google.maps.event.addDomListener(map, 'idle', function() {
          calculateCenter();
        });

        google.maps.event.addDomListener(window, 'resize', function() {
          map.setCenter(centerCalif);
        });

    };
    // end function

    // function to maintain center point of map
    function calculateCenter() {
        center = map.getCenter();
    };