/* Author: Albert Sun
   WSJ.com News Graphics
*/

/*jslint white: false, nomen: false, debug: false, devel: true, onevar: false, plusplus: false, browser: true, bitwise: false, es5: true, maxerr: 200 */
/*global jQuery: false, $: false, log: false, window: false, WSJNG: false, _: false, google: false, localStorage: false */

// Necessary functions
if (!window.typeOf) {
    window.typeOf = function(b){var a=typeof b;if(a==="object")if(b){if(b instanceof Array)a="array"}else a="null";return a};
}

// ***************************************
// Just in case there's a console.log hanging around....
// ***************************************
if (!window.console) { window.console = { "log": function() {} }; }


// ***************************************
// Set up a Global Namespace
// ***************************************
var gmap = gmap || {};
gmap.geom = gmap.geom || {}; // namespace for utility functions that handle geometry


gmap.geom.ParseGeoJSONMultiPolygon = function(coordinates) {
    var i,len1,j,len2,k,len3;
    var multipoly = [],poly,linestring;
    for (i=0,len1=coordinates.length; i<len1; i++) { //loop through polygons
        poly = [];
        for (j=0,len2=coordinates[i].length; j<len2; j++) { //loop through linestrings
            linestring = [];
            for (k=0,len3=coordinates[i][j].length; k<len3; k++) { //loop through points
                linestring.push(new google.maps.LatLng(coordinates[i][j][k][1],coordinates[i][j][k][0]));
            }
            poly.push(linestring);
        }
        multipoly.push(poly);
    }
    return multipoly;
};
gmap.geom.ParseGeoJSONPolygon = function(coordinates) {
    var j,len2,k,len3;
    var poly=[],linestring;
    for (j=0,len2=coordinates.length; j<len2; j++) { //loop through linestrings
        linestring = [];
        for (k=0,len3=coordinates[j].length; k<len3; k++) { //loop through points
            linestring.push(new google.maps.LatLng(coordinates[j][k][1],coordinates[j][k][0]));
        }
        poly.push(linestring);
    }
    return poly;
};

gmap.geom.ParseKMLMultiPolygon = function(data) {
    var polys = $.map($(data).find('Polygon'), function(poly, j) {
        var linearrings = $.map($(poly).find("coordinates"), function(line, i) {
            var $line = $(line);
            var arr = $line.text().split(/\s+/);
            var path = $.map(arr, function(el, i) {
	        if (el !== "") {
		    var latlng = new google.maps.LatLng(parseFloat($.trim(el).split(',')[1]), parseFloat($.trim(el).split(',')[0]));
                    //bounds.extend(latlng);
                    return latlng;
	        }
            });
            return [path];
        });
        //console.log(lines.length);
        return [linearrings];
    });
    return polys;
};