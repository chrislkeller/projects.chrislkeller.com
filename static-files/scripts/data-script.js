    var jqueryNoConflict = jQuery;

    // begin main function
    jqueryNoConflict(document).ready(function(){
        createMap();
    });
    // end


    // begin function
    function createMap() {

        var locationColumn = '';
        var results2010Table = '';
        var centerCalif = new google.maps.LatLng(37.335194502529724, -119.366455078125);

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: centerCalif,
            zoom: 6,
            scrollwheel: false,
            draggable: false,
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
                from: results2010Table
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
    }

    // function to generate iframe embed code
    function embedBox() {
        var embed_url = '#';

        jAlert('<strong>To embed this on your blog or site, just copy this code:<br></strong>&lt;iframe src=\"'+ embed_url +'\" width=\"420px\" height=\"450px\" scrolling=\"no\" frameborder=\"0\"&gt;&lt;/iframe>', 'Share or Embed');
    };
    // end