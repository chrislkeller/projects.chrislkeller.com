/* Author: Albert Sun
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

(function() {

    // Don't want to introduce an underscore dependency just for one function, _.extend
    // https://github.com/documentcloud/underscore/
    gmap._ = window._ || (function() {
        var _ = {};
        var breaker = {};
        var slice = Array.prototype.slice,
        nativeForEach = Array.prototype.forEach;

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

        var empty_function = function() { return { }; }

        this._responsive_unselected_poly_options = params.responsive_unselected_opts == null ? empty_function : params.responsive_unselected_opts;
        this._responsive_highlighted_poly_options = params.responsive_highlighted_opts == null ? empty_function : params.responsive_highlighted_opts;
        this._responsive_selected_poly_options = params.responsive_selected_opts == null ? empty_function : params.responsive_selected_opts;


        if (params.color) {
            this.unselected_poly_options = gmap._.extend({}, this._unselected_poly_options, {"fillColor": params.color});
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
            this.polygons.push( new google.maps.Polygon(gmap._.extend({}, this.unselected_poly_options, this._responsive_unselected_poly_options(), {
                paths: params.multipolygon[i],
                map: params.map
            } )) );
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
            strokeOpacity: 0.25
        },
        _selected_poly_options: {
            strokeOpacity: 1.0,
            strokeWeight: 1.0,
            strokeColor: "#0000FF"
        },
        _highlighted_poly_options: {
            strokeOpacity: 1.0,
            strokeWeight: 1.0,
            strokeColor: "#00FF00"
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

}());