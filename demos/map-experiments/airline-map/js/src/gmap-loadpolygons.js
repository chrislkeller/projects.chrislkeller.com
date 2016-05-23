
/*jslint white: false, nomen: false, debug: false, devel: true, onevar: false, plusplus: false, browser: true, bitwise: false, es5: true, maxerr: 200 */
/*global jQuery: false, $: false, log: false, window: false, WSJNG: false, _: false, google: false, localStorage: false */

var gmap = gmap || {};

(function() {

    function parseKML(kmlstring) {
        var doc = $(kmlstring);
        var features = $.map(doc.find("Placemark"), function(placemark, i) {
            var obj = {};
            $placemark = $(placemark);
            obj.geometry = $placemark.find("MultiGeometry")[0];
            // If MultiGeometry is not found, attempt to find Polygons
            // to convert to MultiGeometry
            if(typeOf(obj.geometry) == "undefined") {
              var multi = $('<MultiGeometry></MultiGeometry>').appendTo($placemark);
              $placemark.find("Polygon").appendTo(multi);
              obj.geometry = multi[0];
            };
            obj.id = $placemark.find("name").text();
            obj.properties = {};
            var datapoints = $placemark.find("ExtendedData Data"), $datapoint, val;
            for (var j=0,len=datapoints.length; j<len; j++) {
                $datapoint = $(datapoints[j]),
                val = $datapoint.find("value").text();
                if (!isNaN(parseFloat(val))) { val = Number(val); }
                obj.properties[$datapoint.attr("name")] = val;
            }
            return obj;
        });
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
                geom = gmap.geom.ParseKMLMultiPolygon(data[i].geometry);
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
