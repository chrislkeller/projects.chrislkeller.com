var jqueryNoConflict = jQuery;
var fn = fn || {};
var mapIsMoving = false;

// begin main function
jqueryNoConflict(document).ready(function() {
    google.maps.event.addDomListener(window, 'load', fn.writeMapToCanvas);
});

jqueryNoConflict(document).scroll(function(){
    var elem = jqueryNoConflict('.subnav');
    if (!elem.attr('data-top')) {
        if (elem.hasClass('navbar-fixed-top'))
            return;
         var offset = elem.offset()
        elem.attr('data-top', offset.top);
    }
    if (elem.attr('data-top') - elem.outerHeight() <= jqueryNoConflict(this).scrollTop() - jqueryNoConflict(elem).outerHeight())
        elem.addClass('navbar-fixed-top');
    else
        elem.removeClass('navbar-fixed-top');
});

// begin data configuration object
var fn = {

    // set default map options
    mapOptions: {
        center: new google.maps.LatLng(36.173326622799024, -120.025634765625),
        zoom: 6,
        disableDefaultUI: false,
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
            position: google.maps.ControlPosition.LEFT_TOP
        }
    },

    styleForMaps: [{
        featureType: 'all',
        elementType: 'all',
        stylers: [{
            saturation: -35
        }]
    }, {
        featureType: 'road.local',
        elementType: 'all',
        stylers: [{
            visibility: 'off'
        }]
    }, {
        featureType: 'administrative.country',
        elementType: 'all',
        stylers: [{
            visibility: 'off'
        }]
    }, {
        featureType: 'administrative.province',
        elementType: 'all',
        stylers: [{
            visibility: 'on'
        }]
    }, {
        featureType: 'administrative.land_parcel',
        elementType: 'all',
        stylers: [{
            visibility: 'off'
        }]
    }, {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{
            visibility: 'off'
        }]
    }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
            visibility: 'off'
        }]
    }],

    // create map instances
    writeMapToCanvas: function() {
        californiaBridgeMap = new google.maps.Map(document.getElementById('california_bridge_index'), fn.mapOptions);
        nationalBridgeMap = new google.maps.Map(document.getElementById('national_bridge_index'), fn.mapOptions);

        // zoom both maps when zoom changes
        google.maps.event.addListener(californiaBridgeMap, 'zoom_changed', function() {
            fn.mapMover(californiaBridgeMap, nationalBridgeMap);
        });

        google.maps.event.addListener(californiaBridgeMap, 'drag', function() {
            fn.mapMover(californiaBridgeMap, nationalBridgeMap);
        });

        google.maps.event.addListener(nationalBridgeMap, 'zoom_changed', function() {
            fn.mapMover(nationalBridgeMap, californiaBridgeMap);
        });

        google.maps.event.addListener(nationalBridgeMap, 'drag', function() {
            fn.mapMover(nationalBridgeMap, californiaBridgeMap);
        });

        google.maps.event.addDomListener(californiaBridgeMap, 'idle', function() {
          fn.calculateCenter(californiaBridgeMap);
        });

        google.maps.event.addDomListener(californiaBridgeMap, 'resize', function() {
          californiaBridgeMap.setCenter(fn.mapOptions.center);
        });

        google.maps.event.addDomListener(nationalBridgeMap, 'idle', function() {
          fn.calculateCenter(nationalBridgeMap);
        });

        google.maps.event.addDomListener(nationalBridgeMap, 'resize', function() {
          nationalBridgeMap.setCenter(fn.mapOptions.center);
        });

        californiaBridgeMap.mapTypes.set('map-style', new google.maps.StyledMapType(
            fn.styleForMaps, {
                name: 'Styled Map'
            }
        ));
        californiaBridgeMap.setMapTypeId('map-style');

        nationalBridgeMap.mapTypes.set('map-style', new google.maps.StyledMapType(
            fn.styleForMaps, {
                name: 'Styled Map'
            }
        ));
        nationalBridgeMap.setMapTypeId('map-style');
    },

    /*
    riff of Ryan Murphy's split-map repo:
    https://github.com/rdmurphy/gmaps-split-view
    sets action on map to mirror on the other
    */
    mapMover: function(clickedMap, targetMap) {
        if (mapIsMoving) {
            return;
        }

        mapIsMoving = true;
        if (clickedMap == californiaBridgeMap) {
            console.log('californiaBridgeMap clicked');

        } else {
            console.log('nationalBridgeMap clicked');
        }

        reZoom = clickedMap.getZoom();
        targetMap.setZoom(reZoom);
        reCenter = clickedMap.getCenter();
        targetMap.setCenter(reCenter);
        console.log(reCenter);
        mapIsMoving = false;
    },


    // function to maintain center point of map
    calculateCenter: function(map){
        center = map.getCenter();
    },


};
// end data configuration object