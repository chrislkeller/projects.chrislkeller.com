var map = null;
var center = new google.maps.LatLng(43.075, -89.382);

function fetch_tile(coord, zoom) {
    return "./.tiles/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
}

// --- begin geocoding stuff --
var geocoder = new google.maps.Geocoder();
var southwest_limit = new google.maps.LatLng(41.6, -88);
var northeast_limit = new google.maps.LatLng(42.05, -87.5);    
var bounding_box = new google.maps.LatLngBounds(southwest_limit, northeast_limit);
var outside_il = false; // until prove true
var user_marker = null;
var has_zoomed = false;
var has_moved = false;

function geocode(query) {
    if (typeof(query) == 'string') {
        pattr = /\sil\s|\sillinois\s/gi;
        match = query.match(pattr);
        if (!match) {
            query = query + ' IL';
        }
        gr = { 'address': query };
    } else {
        gr = { 'location': query };
    }
    geocoder.geocode(gr, handle_geocode);
}
 
function handle_geocode(results, status) {
    alt_addresses(results);
 
    lat = results[0].geometry.location.lat();
    lng = results[0].geometry.location.lng();
    
    normalized_address = results[0].formatted_address;
    $('#query').val(normalized_address)

    var zoom = (has_zoomed) ? map.zoom : 10;
    process_location(lat, lng, zoom, true);
}

function alt_addresses(results) {
    $('#alt-addresses').html('');
 
    keep = new Array();
 
    $.each(results, function(i,val) {
        if (i==0) return; // skip the first result
 
        for (var t in val.types) {
            if (val.types[t] == 'street_address' || val.types[t] == 'intersection') {
                keep.push(val.formatted_address);
                break;
            }
        }
    });
 
    if (keep.length <= 1) {
        $('#did-you-mean')
            .addClass('disabled-link')
            .unbind();
    } else {
        $('#did-you-mean')
            .removeClass('disabled-link')
            .click(function(e) { 
                    e.stopPropagation(); 
                    toggle_alt_addresses(); 
                    });
 
        $('#alt-addresses').append('<p>Did you mean...</p>');
        for (var i in keep) {
            $('#alt-addresses').append('<a href="javascript:geocode(\'' + keep[i] + '\');">' + keep[i] + '</a>');
        }
    }
}
function process_location(lat, lng, zoom, showMarker) {
    var center = new google.maps.LatLng(lat, lng);
    map.panTo(center);
    if (zoom) {
        map.setZoom(zoom);
    }
    if (showMarker instanceof Array) {
        show_user_marker(showMarker[0],showMarker[1]); //?
    } else if (showMarker) {
            show_user_marker(lat, lng); //?
  }
}

function show_user_marker(lat, lng) {
    if (user_marker == null) {
        user_marker = new google.maps.Marker();
        user_marker.setMap(map);
    }
    user_marker.setPosition(new google.maps.LatLng(lat, lng));
}

function toggle_alt_addresses() {
    alt_adds_div = $('#alt-addresses');
    if (alt_adds_div.is(':hidden')) {
        show_alt_addresses();
    } else if (alt_adds_div.is(':visible')) {
        hide_alt_addresses();
    }
}
 
function show_alt_addresses() {
    $('#alt-addresses').slideDown(250);
    $('#did-you-mean').addClass('highlight');
}
 
function hide_alt_addresses() {
    $('#alt-addresses').hide();
    $('#did-you-mean.highlight').removeClass('highlight');
}
 

function parse_hash(s) {
    try {
        if (s[0] == "#") {
            s = s.substr(1);
        }
        parts = s.split(",");
        lat = parseFloat(parts[0]);
        lng = parseFloat(parts[1]);
        zoom = parseInt(parts[2]);
        if (parts.length == 5) {
          marker_location = [parts[3], parts[4]];
        process_location(lat, lng, zoom, marker_location);
        } else {
        process_location(lat, lng, zoom, false);
        }
    } catch (e) { }
}

function make_hash() {
    var parts = [map.center.lat(),map.center.lng(),map.zoom]
    if (user_marker) {
      parts.push(user_marker.position.lat());
      parts.push(user_marker.position.lng());
    }
    return parts.join(",");
}

// --- end geocoding stuff ---

$(document).ready(function() {

    census_demo_options = {
        getTileUrl: fetch_tile,
        tileSize: new google.maps.Size(256, 256),
        isPng: true
    }
    census_demo = new google.maps.ImageMapType(census_demo_options);
    
    map_options = {
        minZoom: 7,
        maxZoom: 10,
        zoom: 7,
        center: center,
        mapTypeControl: false,
        mapTypeId: "simple"
    };

    backdrop_styles = [
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [
                { lightness: 10 }
            ]
        },{  
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { visibility: "simplified" },
                { saturation: -100 },
                { lightness: 0 }
            ]
        },{
            featureType: "road.arterial",
            elementType: "labels",
            stylers: [
                { gamma: 10 }
            ]
        } 
    ];
    
    var initial_hash = window.location.hash;
    
    simple = new google.maps.StyledMapType(backdrop_styles, { name: "Illinois population 2010" });
    map = new google.maps.Map(document.getElementById("map_canvas"), map_options);
    map.mapTypes.set("simple", simple);
    map.overlayMapTypes.push(census_demo);

    if (initial_hash) {
      parse_hash(initial_hash);
    }

    $("#search").submit(function(){geocode($("#query").val());return false;});
    $("#show-wards").click(function(){
        if(this.checked){
            map.overlayMapTypes.push(wards);
        }
        else {
            map.overlayMapTypes.pop();
        }
    });
    
    google.maps.event.addListener(map, 'zoom_changed', function() {
        has_zoomed = true;
    });
    google.maps.event.addListener(map, 'bounds_changed', function() {
      if (has_moved) {
        window.location.hash = make_hash();
      }
      has_moved = true;
    });
});
