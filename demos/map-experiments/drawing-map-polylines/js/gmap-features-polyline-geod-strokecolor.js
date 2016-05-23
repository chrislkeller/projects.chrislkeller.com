/* Author: Albert Sun
   WSJ.com News Graphics
*/

// Note: This version has been adapted for POLYLINES only, not Polygons.
// In addition, at line 163 I've made those lines "geodesic" to follow
// the Great Circle contours of the Earth, not a straight line on the screen.
// - John Keefe, WNYC - 4/15/2012 - johnkeefe.net

/*jslint white: false, nomen: false, debug: false, devel: true, onevar: false, plusplus: false, browser: true, bitwise: false, es5: true, maxerr: 200 */
/*global jQuery: false, $: false, log: false, window: false, WSJNG: false, _: false, google: false, localStorage: false */

// Necessary functions
if (!window.typeOf) {
    window.typeOf = function(b){var a=typeof b;if(a==="object")if(b){if(b instanceof Array)a="array";}else a="null";return a;};
}

// ***************************************
// Just in case there's a console.log hanging around....
// ***************************************
if (!window.console) { window.console = { "log": function() {} }; }

// ***************************************
// Set up a Global Namespace
// ***************************************
var gmap = gmap || {};

(function() {

    // Don't want to introduce an underscore dependency just for one function, _.extend
    // https://github.com/documentcloud/underscore/
    gmap._ = window._ || (function() {
        var _ = {};
        var breaker = {};
        var slice = Array.prototype.slice;
        var nativeForEach = Array.prototype.forEach;

        // The cornerstone, an `each` implementation, aka `forEach`.
        // Handles objects with the built-in `forEach`, arrays, and raw objects.
        // Delegates to **ECMAScript 5**'s native `forEach` if available.

        var each = _.each = _.forEach = function(obj, iterator, context) {
            if (obj == null) return;
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
                }
            } else {
                for (var key in obj) {
                    if (hasOwnProperty.call(obj, key)) {
                        if (iterator.call(context, obj[key], key, obj) === breaker) return;
                    }
                }
            }
        };
        // Extend a given object with all the properties in passed-in object(s).
        _.extend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (source[prop] !== void 0) obj[prop] = source[prop];
                }
            });
            return obj;
        };
        return _;
    }());

    // extend the Google Maps LatLng object for convenience
    google.maps.LatLng.prototype.toGeoJSON = function() { return [this.lng(), this.lat()]; };
    google.maps.MVCArray.prototype.toGeoJSON = function() {
        var thisarray = this.getArray();
        var newarray = [];
        for (var i=0,len=thisarray.length; i<len; i++) {
            newarray.push(thisarray[i].toGeoJSON());
        }
        return newarray;
    };



    /**
     * A geometric feature that goes on the map.
     * Constructor takes one object params object as an argument.
     * Expects there to be the following fields.
     * @param {Object} params
     * @param {String} params.id The unique identifier of the feature
     * @param {Array} params.multipolygon A GeoJSON multipolygon like array with LatLng objects. [ [ [ {google.maps.LatLng}, ], ], ]
     * @param {Object} params.fields An object with keys and values of data to store with the feature.
     * @param {google.maps.Map} params.map A google maps object onto which to render the polygons of the feature.
     * @param {Object} params.controller A controller object to control its selected or not state
     */
    gmap.Feature = function(params) {
        var self = this;
        this.id = params.id;
        this.polygons = [];
        if (params.fields) {
            this.fields = params.fields;
            // this.humanized_fields = {};
            // for (var prop in params.fields) {
            //     if (params.fields.hasOwnProperty(prop)) {
            //         this.humanized_fields[prop] = gmap.util.humanize.addCommas(params.fields[prop]);
            //     }
            // }
        }

        this.controller = params.controller;
        this._selected = false;
        this._highlighted = false;

        this.highlightCallback = params.highlightCallback;
        this.selectCallback = params.selectCallback;

        var empty_function = function() { return { }; };

        this._responsive_unselected_poly_options = params.responsive_unselected_opts == null ? empty_function : params.responsive_unselected_opts;
        this._responsive_highlighted_poly_options = params.responsive_highlighted_opts == null ? empty_function : params.responsive_highlighted_opts;
        this._responsive_selected_poly_options = params.responsive_selected_opts == null ? empty_function : params.responsive_selected_opts;

		// note: Hijacked getColor to change stroke Weight instead
        if (params.color) {
            this.unselected_poly_options = gmap._.extend({}, this._unselected_poly_options, {"strokeColor": params.color});
            //this._highlighted_poly_options = gmap._.extend({}, this._highlighted_poly_options, {"strokeColor": params.color});
            //this._selected_poly_options = gmap._.extend({}, this._selected_poly_options, {"strokeColor": params.color});
        } else {
            this.unselected_poly_options = gmap._.extend({}, this._unselected_poly_options);
        }

        function mouseoverHandler(e) {
            self.setHighlighted(true);
        }
        function mouseoutHandler(e) {
            self.setHighlighted(false);
        }
        function clickHandler(e) {
            if (self.getSelected()) {
                self.setSelected(false);
            } else {
                self.setSelected(true);
            }
        }


        for (var i=0,len=params.multipolygon.length; i<len; i++) {
            var options = gmap._.extend({}, this.unselected_poly_options, this._responsive_unselected_poly_options(), {
              path: params.multipolygon[i][0],
              map: map
            } );

            var line = new google.maps.Polyline(options);

            this.polygons.push( line );

            google.maps.event.addListener(this.polygons[i], "mousemove", mouseoverHandler);
            google.maps.event.addListener(this.polygons[i], "mouseout", mouseoutHandler);
            google.maps.event.addListener(this.polygons[i], "click", clickHandler);
        }
    };
    gmap.Feature.prototype = {
        _unselected_poly_options: {
            clickable: true,
            fillColor: "#AAAAAA",
            strokeColor: "#000000",
            strokeWeight: 1.0,
            strokeOpacity: 0.25,

            // switch to true for geodesic
			geodesic: false
        },
        _selected_poly_options: {
            strokeOpacity: 1.0,
            strokeWeight: 1.0,
            //strokeColor: "#0000FF"
        },
        _highlighted_poly_options: {
            strokeOpacity: 1.0,
            strokeWeight: 1.0,
            //strokeColor: "#00FF00"
        },
        remove: function(e) {
            for (var i=0,len=this.polygons.length; i<len; i++) {
                google.maps.event.clearListeners(this.polygons[i], "mousemove");
                google.maps.event.clearListeners(this.polygons[i], "mouseout");
                this.polygons[i].setMap(null);
            }
            this.controller = null;
            this.polygons = null;
        },
        toGeoJSON: function() {
            var multipoly = [];
            for (var i=0,len=this.polygons.length; i<len; i++) {
                multipoly.push(this.polygons[i].getPaths().toGeoJSON());
            }
            return multipoly;
        },

        // Redraw the polygons associated with the feature
        // Highlighted and selected states inherit from unselected state
        // NOTE: Remember to set your z-index for your highlights/selects above
        //      your unselected polygons!
        redraw: function() {
            var opts = gmap._.extend({}, this.unselected_poly_options, this._responsive_unselected_poly_options());

            if(this._highlighted) {
                opts = gmap._.extend(opts, this._highlighted_poly_options, this._responsive_highlighted_poly_options());
            }

            if(this._selected) {
                opts = gmap._.extend(opts, this._selected_poly_options, this._responsive_selected_poly_options());
            }

            for (i=0,len=this.polygons.length; i<len; i++) {
                this.polygons[i].setOptions(opts);
            }
        },
        getSelected: function() {
            return this._selected;
        },
        setSelected: function(value) {
            var i, len;
            if (value === true) {
                if (this.controller.selected !== null) {
                    this.controller.selected.setSelected(false);
                }
                this._selected = true;
                this.controller.selected = this;
                this.redraw();
                if (this.selectCallback) {
                    this.selectCallback();
                }
            } else if (value === false) {
                this._selected = false;
                this.redraw();
            }
        },
        getHighlighted: function() {
            return this._highlighted;
        },
        setHighlighted: function(value) {
            var i,len;
            if ((value === true) && (this._highlighted === false)) {
                this._highlighted = true;
                this.redraw();
                if (this.highlightCallback) {
                    this.highlightCallback();
                }
            } else if ((value === false) && (this._highlighted === true)) {
                this._highlighted = false;
                this.redraw();
            }
        }
    };

}());/* Author: Albert Sun
   WSJ.com News Graphics
*/

/*jslint white: false, nomen: false, debug: false, devel: true, onevar: false, plusplus: false, browser: true, bitwise: false, es5: true, maxerr: 200 */
/*global jQuery: false, $: false, log: false, window: false, WSJNG: false, _: false, google: false, localStorage: false */

// Necessary functions
if (!window.typeOf) {
    window.typeOf = function(b){var a=typeof b;if(a==="object")if(b){if(b instanceof Array)a="array";}else a="null";return a;};
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

gmap.geom.ParseKMLPolygon = function(poly) {
  var linearrings = $.map($(poly).find("coordinates"), function(line, i) {
      var $line = $(line);
      var arr = $line.text().split(/\s+/);
      var path = $.map(arr, function(el, i) {
      if (el !== "") {
        var latlng = new google.maps.LatLng(parseFloat($.trim(el).split(',')[1]), parseFloat($.trim(el).split(',')[0]));
        return latlng;
      }
    });
    return [path];
  });
  return [linearrings];
};

gmap.geom.ParseKMLMultiPolygon = function(data) {
    var polys = $.map($(data).find('Polygon'), function(poly, j) {
      return gmap.geom.ParseKMLPolygon(poly);
    });
    return polys;
};
/*jslint white: false, nomen: false, debug: false, devel: true, onevar: false, plusplus: false, browser: true, bitwise: false, es5: true, maxerr: 200 */
/*global jQuery: false, $: false, log: false, window: false, WSJNG: false, _: false, google: false, localStorage: false */

var gmap = gmap || {};

(function() {

  function parseKML(kmlstring) {
      var doc;
      try {
        // For some reason IE needs this to work with Polygons in some instances
        doc = $( $.parseXML(kmlstring) );
      } catch(e) {
        // It'll fall through to here in at least FF, though, on malformed XML
        doc = $( kmlstring );
      }
      var features = $.map(doc.find("Placemark"), function(placemark, i) {
          var obj = {};
          $placemark = $(placemark);
          obj.geometry = $placemark.find("MultiGeometry")[0];
          // If MultiGeometry is not found, attempt to find a Polygon
          // to use instead
          if(typeOf(obj.geometry) == "undefined") {
            obj.geometry = $placemark.find("Polygon")[0];
          }
          if(typeOf(obj.geometry) == "undefined") {
            obj.geometry = $placemark.find("LineString")[0];
          }
          obj.id = $placemark.find("name").text();
          obj.properties = {};
          var datapoints = $placemark.find("ExtendedData Data"), $datapoint, val;
          for (var j=0,len=datapoints.length; j<len; j++) {
              $datapoint = $(datapoints[j]);
              val = $datapoint.find("value").text();
              if (!isNaN(parseFloat(val))) { val = Number(val); }
              obj.properties[$datapoint.attr("name")] = val;
          }
          return obj;
      });
      window.kml = kmlstring;
      return features;
  }

    gmap.load_polygons = function(params) {
        var self = {},
        data = params.data,
        controller = {"selected": null};

        if (params.data_type == "kml") {
            data = parseKML(data);
            //console.log(data);
        } else {
            data = data.features;
        }
        if (params.unselected_opts) {
            gmap._.extend(gmap.Feature.prototype._unselected_poly_options, params.unselected_opts);
        }
        if (params.highlighted_opts) {
            gmap._.extend(gmap.Feature.prototype._highlighted_poly_options, params.highlighted_opts);
        }
        if (params.selected_opts) {
            gmap._.extend(gmap.Feature.prototype._selected_poly_options, params.selected_opts);
        }

        var geom, opts;
        for (var i=0,len=data.length; i<len; i++) {
            if (typeOf(data[i].geometry.coordinates) !== "array") {
                // data is a KML node
                if (data[i].geometry.tagName == "LineString") {
                  geom = gmap.geom.ParseKMLPolygon(data[i].geometry);
                } else if (data[i].geometry.tagName == "Polygon") {
                  geom = gmap.geom.ParseKMLPolygon(data[i].geometry);
                } else {
                  geom = gmap.geom.ParseKMLMultiPolygon(data[i].geometry);
                }
            } else {
                // data is a geom object
                if (data[i].geometry.type == "Polygon") {
                    geom = [ gmap.geom.ParseGeoJSONPolygon(data[i].geometry.coordinates) ];
                } else {
                    geom = gmap.geom.ParseGeoJSONMultiPolygon(data[i].geometry.coordinates);
                }
            }

            opts = {
                "id": data[i].id,
                "multipolygon": geom,
                "fields": data[i].properties,
                "controller": controller,
                "map": params.map
            };
            if (params.getColor) {
                opts.color = params.getColor(data[i].properties);
            }

            // Responsive polygon options
            opts.responsive_unselected_opts = params.responsive_unselected_opts;
            opts.responsive_highlighted_opts = params.responsive_highlighted_opts;
            opts.responsive_selected_opts = params.responsive_selected_opts;
            // Callbacks
            opts.highlightCallback = params.highlightCallback;
            opts.selectCallback = params.selectCallback;

            self[data[i].id] = new gmap.Feature(opts);
        }

        return self;
    };

    /**
     * Pass this the a dictionary as returned by load_polygons and it'll remove them from the map.
     */
    gmap.remove_polygons = function(features) {
	for (var prop in features) {
	    if (features.hasOwnProperty(prop)) {
		features[prop].remove();
		delete features[prop];
	    }
	}
	return features;
    };
}());
