    var jqueryNoConflict = jQuery;

    /* url for 2012 congressional json:
    http://project.wnyc.org/election-2012-ca-results/data/election_data.json
    http://vote.sos.ca.gov/returns/us-rep/district/all/
    */

    var results2010Table = '188FSkJxrQD7qG6W-tLiKYL7MdQD9NmZv9lW2vEI';
    var results2012Table = '1rk85qhtG8Qy_i_TVXD3gDkvzTHPKfLpSlhibco0';
    var locationColumn =  'geometry_simplified';
    var map;
    var layer;

    //begin main function
    jqueryNoConflict(document).ready(function(){
        createMap();
        createSlider();
    });

    // begin function
    function createMap() {

        // encrypted table id

        var centerCalif = new google.maps.LatLng(37.335194502529724, -119.366455078125);

        map = new google.maps.Map(document.getElementById('map-canvas'), {
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
    };
    // end function

    // begin function
    function createSlider(){

        var increment;

        //creates slider
        jqueryNoConflict("#slider").slider();

        var sliderBar = jqueryNoConflict('#slider'),
        play_btn = jqueryNoConflict('#play-btn');

        // begin slider options
        sliderBar.slider({
            'value':0,
            'min': 2010,
            'max': 2012,
            'step': 2,

            // displays when user slides the controller
            slide: function(event, ui) {
                var increment = ui.value;
                var handle = ui.handle;
            },

            // begin when slider change is made
            change: function(event, ui) {
                var increment = ui.value;
                var handle = ui.handle;
                var ftLayer = 'results' + increment;

                    if(ftLayer == "results2010") {
                        ftLayer = results2010Table;
                        jqueryNoConflict("#2010-chart").removeClass("hide-chart");
                        jqueryNoConflict("#2012-chart").addClass("hide-chart");

                    } else if(ftLayer == "results2012") {
                        ftLayer = results2012Table;
                        jqueryNoConflict("#2010-chart").addClass("hide-chart");
                        jqueryNoConflict("#2012-chart").removeClass("hide-chart");
                    }

                layer.setMap();

                layer = new google.maps.FusionTablesLayer({
                    query: {
                        select: locationColumn,
                        from: ftLayer
                    },
                    map: map,
                    suppressInfoWindows: true
                });

            }
            // end slider change is made

      });
        // end slider options

    };
    // end function