/* ==========================================================
* leafpile.js v0.1.2
* A marker clustering layer for Leaflet maps
* http://github.com/cavis/leafpile
* ==========================================================
* Copyright (c) 2012 Ryan Cavis
* Licensed under http://en.wikipedia.org/wiki/MIT_License
* ========================================================== */
(function (window, undefined) {

/* ==========================================================
 * L.LeafpileGroup
 *
 * A layer used to cluster markers together into geographical
 * groups based on screen spacing, updating with every zoom level.
 * ========================================================== */
L.LeafpileGroup = L.LayerGroup.extend({

    includes: L.Mixin.Events,

    /* ========================================
     * Configuration Options
     * ======================================== */

    options: {

        // grouping options
        radius:        10,
        maxZoomChange: 2,
        maxZoomLevel:  14,
        singlePiles:   false,

        // style definition
        inlineStyles: true,
        styleSizes: [1, 10, 25, 50],
        styleDefs: [{
            image: 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADNQTFRFAAAA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA/5kA8jf0CQAAABB0Uk5TABAgMEBQYHCAj5+vv8/f7yMagooAAACJSURBVHjapZFJDsMgDEVraKAeCr7/aUsIyMJJNulfWIgnT9+vfxQyYxTO4P6BtCnvgRYWq+6SHmt0wGQIBjA0C6J60UhpT580ct7iAELogLSsoMxyLuOY/zHhC8KdpAuS7vZRuPMAp29tgWHd8ShgXn9tjM9yhhCqubnF5aZ46mEssYhQai2e6wcf9hSNzav/NAAAAABJRU5ErkJggg==',
            size:   new L.Point(25, 25),
            anchor: new L.Point(12, 12),
            popup:  new L.Point(0, -8)
        }, {
            image: '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',
            size:   new L.Point(55, 55),
            anchor: new L.Point(27, 27),
            popup:  new L.Point(0, -14)
        }, {
            image: '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',
            size:   new L.Point(65, 65),
            anchor: new L.Point(32, 32),
            popup:  new L.Point(0, -18)
        }, {
            image: 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAMAAAAPkIrYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUdQTFRFAAAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA/wAA9rW33gAAAGx0Uk5TAAIDBQcICgsMDQ8QEhQVFxgaICEkKC4wMjc4PD0+QERIS0xNUFFSVFdYXl9gY2RmaGprbHByc3d4fX5/gIGCg4SGjI+SlZiZm56ipqeoqqytr7Gztbe5u72/wcPFx8nLz9PX29/j5+vv8/f7jFAe3AAABRJJREFUeNq9mO1fGkcQxw/lIScgh5frlaQKSZDESmOCsRh6QBBLE6OxBNAcT5qqSRT+/9e9h5l9uCcg6ae/Nwl7u19nZ2d2Z1cI0nIsnkwn4Uc4nU7GY8vC9ygST6Utwe+o/SsVjywIWhINEAhMWSENKXFpAVI8zQjsSLJt8TlpIYtEJdrNEt8aD82BijkGpRO2rWmHpNhMo8hUqHtgGV1KBpsWdholZzbz1hcln1VdpoWD5sf3Xf+1XNc0bc38tKVptTelRwrfw3+enNPV7UpVs/TA/PbK/n9tLytzSzAHKlOqaaic+VEjqhRkFjYLpewYJKKi8XFNY/RHloUFox6/1ljtG18fcC3VXSUIFqVLt1PVeBm9c46myi8UFnVuCdTne/woeyGLzrZagcKW+RBNEVSFG3Jw9LE3fi4Iw9Gn7ocWN89tGs1c0Ca8UUf6UDdUFyTdVH/YOfCEJdi9yhN1aoAsvRUe6qDh+aEXjNnTcIYy46vWoK+jhKJONGo3iM+yNGdRIjbtUFR7qFOpdZ3RgJhWJykqouMljCsSDI1PfXZ07ljnYEck9GRM8xBvlvKaoCwSFU6ReI3Atohh/O6344e6vLwcOWGOWaYiOMkVK51JDnaZUZ+/3E0tfbtieX30WckiRR2nRQlRJ9Ssq8mU0ReGNmjAWmbSkhhy7KgKmnUwwP4Xt1OHrimsDd2fUxLV2gv74xn2/oczCmZK/tDQzqi8z26ovrJiFFFTL90S2Lm5jITk1sY+cfzF1FtficdaxbXgKmJjBD3vpj66AtbxT66jZzUpxsLMkS6VrZ7XUz9NBhYpx4ZBOCYmkrg1K3vF3MaaZNOahlms392L2SnCeikbueITCH0sOTKYYH+Wiw9VtXk19dekU7yvPi3Wmyf2mJfIgvzZxJ0GnHE7DdBn6NSzx7xBFvz7DFjvwfPTIN1giEFOyjzrJeYPZHMg6xtuizAo483qQh4Gsu7IphjI6ukQEYHCcG39b6yPi8xxeODJKv2A76sOVv5HYgLjK+WI1f4CsXoGseqTQ9p4tsMm6PoPjhxagRO7Dqyz2ZO8xvMDlvEZsEjdVaYOm7nn8O7S1pG17EjIxnjevVBv8+mYJneTdTz/O/Pu0SOIrj0sA2jpVcEjbTTn2dGBAVlShBGHbZEKh5xpgagBmFWRadkawsqkjh6jp7PLZzcdUgScQndS0IWY+nKbVHFQepWP9esJlzsXeglhAyxOFLbOjDgN006t4H+asyb6FXC3N6a9zfvHtuMbTrMiXIVZ0FBdA5YTmrhgl4ZIiXjvrRlah5rDWyn+miDvM7CcoOpeagoGjKCqj/kLAzUsQ29BG4JtlluqcO8vUrDukuLXdX8pYMCqgvCz7q2m4eEXeMmS3feYJF9I7ytG2+7ZwJM1kgiMltFJj9uQ/LuJkuxLXuvcResPTxt5AWC1rOeNSKQwCwWXqcN2n8WNu0fWtc2E5VmUKLBaJbDfLFQcvXv4/u9erz/u9bon7yCm7Mt8gaJWHU8lEma7bW5eC1Ccv7xKS87XBFjbZbufH4YaRmFh74vtakgAswIVARiGgxtGUUvZSgCptoshEEeUG2agsI9cqFR9SCXjdoAdRYpyi3kHypZqblBlS+GCYObb1QruQlnzEcaW9QSzqdIr3nwKSdzj0Hre1KOM6n7ImS0xPVup+c2areh8sGgqCELvnv8NLRVd6HU14U9KUJvmXc1owsNxUiLqGw7/Ar6ZyaPXxFloAAAAAElFTkSuQmCC',
            size:   new L.Point(75, 75),
            anchor: new L.Point(37, 37),
            popup:  new L.Point(0, -22)
        }]

    },

    /* ========================================
     * Public Methods
     * ======================================== */

    // constructor
    initialize: function (options, layers) {
        L.Util.setOptions(this, options);
        this._layers = {};
        this._loneMarkers = {};
        this._leafPiles = {};
        if (layers) {
            for (var i = 0; i < layers.length; i++) {
                this.addLayer(layers[i]);
            }
        }
    },

    // only really adds marker layers
    addLayer: function (layer) {
        var id = L.Util.stamp(layer);
        this._layers[id] = layer;

        if (this._map) {
            if (layer instanceof L.Marker) {
                this._addMarkerSomewhere(layer);
                layer.on('click', this._onMarkerClick, this);

                // hijack openpopup method
                layer.openPopup = function () {
                    if (this._popup && this._leafpile) {
                        var options = L.Util.extend({}, this._popup.options),
                            content = this._popup._content;
                        delete options.offset; //let leafpile decide
                        this._leafpile.bindPopup(content, options);
                        this._leafpile.openPopup();
                    }
                    else {
                        L.Marker.prototype.openPopup.call(this);
                    }

                    return this;
                };
            }
            else {
                this._map.addLayer(layer);
            }
        }

        return this;
    },

    // remove from group or lonely
    removeLayer: function (layer) {
        var id = L.Util.stamp(layer);
        delete this._layers[id];

        if (this._map) {
            this._map.removeLayer(layer);
            if (layer instanceof L.Marker) {
                layer.off('click', this._onMarkerClick, this);
            }

            if (this._loneMarkers[id]) {
                delete this._loneMarkers[id];
            }
            else {
                for (var pid in this._leafPiles) {
                    if (this._leafPiles.hasOwnProperty(pid)) {
                        this._removeFromLeafpile(layer, this._leafPiles[pid]);
                    }
                }
            }
        }

        return this;
    },

    // remove everything from the map
    clearLayers: function (keep) {
        if (this._map) {
            for (var lid in this._layers) {
                if (this._layers.hasOwnProperty(lid)) {
                    this._map.removeLayer(this._layers[lid]);
                }
            }
            for (var pid in this._leafPiles) {
                if (this._leafPiles.hasOwnProperty(pid)) {
                    this._map.removeLayer(this._leafPiles[pid]);
                }
            }
        }

        this._loneMarkers = {};
        this._leafPiles = {};
        if (keep !== true) {
            this._layers = {};
            for (var rmv in this._layers) {
                if (this._layers.hasOwnProperty(rmv) && this._layers[rmv] instanceof L.Marker) {
                    this._layers[rmv].off('click', this._onMarkerClick, this);
                }
            }
        }

        return this;
    },

    // change the grouping radius on-the-fly
    setRadius: function (radius) {
        this.options.radius = radius;
        this._redraw();
    },

    // call back from being added to a map
    onAdd: function (map) {
        this._map = map;
        for (var lid in this._layers) {
            if (this._layers.hasOwnProperty(lid)) {
                this.addLayer(this._layers[lid]);
            }
        }

        // listeners
        this._map.on('zoomstart', this._onZoomStart, this);
        this._map.on('zoomend', this._onZoomEnd, this);
    },

    // clear all on removed from map
    onRemove: function (map) {
        this.clearLayers();

        // listeners
        this._map.off('zoomstart', this._onZoomStart, this);
        this._map.off('zoomend', this._onZoomEnd, this);
        this._map = null;
    },

    /* ========================================
     * Private Methods
     * ======================================== */

    // add marker to a leafpile, or the map
    _addMarkerSomewhere: function (mark) {
        for (var pid in this._leafPiles) {
            if (this._shouldGroup(mark, this._leafPiles[pid])) {
                this._leafPiles[pid].addMarker(mark);
                return;
            }
        }

        // check lone markers
        for (var mid in this._loneMarkers) {
            if (this._shouldGroup(mark, this._loneMarkers[mid])) {
                this._createLeafpile([mark, this._loneMarkers[mid]]);
                return;
            }
        }

        // add as single pile
        if (this.options.singlePiles) {
            this._createLeafpile([mark]);
            return;
        }

        // add as lone marker
        var id = L.Util.stamp(mark);
        this._loneMarkers[id] = mark;
        this._map.addLayer(mark);
    },

    // check if markers are < radius apart
    _shouldGroup: function (mark1, mark2) {
        if (this._map.getZoom() >= this.options.maxZoomLevel) {
            return false;
        }
        var pt1 = this._markerToPoint(mark1),
            pt2 = this._markerToPoint(mark2);
        if (pt1.distanceTo(pt2) < this.options.radius) {
            return true;
        }
        return false;
    },

    // cache marker layer-point
    _markerToPoint: function (mark) {
        var z = this._map.getZoom();
        if (!mark._cacheLayerPt) {
            mark._cacheLayerPt = this._map.latLngToLayerPoint(mark.getLatLng());
        }
        return mark._cacheLayerPt;
    },

    // create a new leafpile
    _createLeafpile: function (marks) {
        var pile = new L.Leafpile(marks, this),
            pid = L.Util.stamp(pile);
        this._leafPiles[pid] = pile;
        this._map.addLayer(pile);
        pile.on('click', this._onMarkerClick, this);

        // remove any single markers from map
        for (var i = 0; i < marks.length; i++) {
            var id = L.Util.stamp(marks[i]);
            if (this._loneMarkers[id]) {
                this._map.removeLayer(marks[i]);
                delete this._loneMarkers[id];
            }
        }

        // check for other leafpiles within range
        var strpid = '' + pid;
        for (pid in this._leafPiles) {
            if (this._leafPiles.hasOwnProperty(pid) && pid !== strpid) {
                if (this._shouldGroup(pile, this._leafPiles[pid])) {
                    var pmarks = this._leafPiles[pid].getMarkers();
                    pile.addMarker(pmarks);
                    this._leafPiles[pid].off('click', this._onMarkerClick, this);
                    this._map.removeLayer(this._leafPiles[pid]);
                    delete this._leafPiles[pid];
                }
            }
        }

        // check for other lone markers within range
        for (var mid in this._loneMarkers) {
            if (this._shouldGroup(pile, this._loneMarkers[mid])) {
                pile.addMarker(this._loneMarkers[mid]);
                this._map.removeLayer(this._loneMarkers[mid]);
                delete this._loneMarkers[mid];
            }
        }
    },

    // remove a layer from a leafpile
    _removeFromLeafpile: function (layer, pile) {
        pile.removeMarker(layer);

        // nuke pile if it's too small
        if (pile.getCount() < 1) {
            pile.off('click', this._onMarkerClick, this);
            this._map.removeLayer(pile);
            delete this._leafPiles[L.Util.stamp(pile)];
        }
        else if (pile.getCount() === 1 && !this.options.singlePiles) {
            var single = pile.getMarkers()[0],
                sid = L.Util.stamp(single);
            pile.off('click', this._onMarkerClick, this);
            this._map.removeLayer(pile);
            delete this._leafPiles[L.Util.stamp(pile)];
            this._map.addLayer(single);
            this._loneMarkers[sid] = single;
        }
    },

    // redraw the map/groupings
    _redraw: function () {
        this.clearLayers(true);
        for (var lid in this._layers) {
            if (this._layers.hasOwnProperty(lid)) {
                if (this._layers[lid] instanceof L.Marker) {
                    this._addMarkerSomewhere(this._layers[lid]);
                }
                else {
                    this._map.addLayer(this._layers[lid]);
                }
            }
        }
        this.fire('redraw');
    },

    // clear cached point
    _onZoomStart: function () {
        for (var lid in this._layers) {
            if (this._layers.hasOwnProperty(lid)) {
                delete this._layers[lid]._cacheLayerPt;
            }
        }
        this._map.closePopup();
    },

    // reset groupings on zoom end
    _onZoomEnd: function () {
        this._redraw();
    },

    // marker (single or leafpile) is clicked
    _onMarkerClick: function (e) {
        var isLeafpile = e.target instanceof L.Leafpile,
            marks = isLeafpile ? e.target.getMarkers() : [e.target],
            latlngs = [];

        // fire event from group
        this.fire('click', {
            group:      this,
            leafpile:   isLeafpile ? e.target : false,
            markers:    marks,
            zooming:    (marks.length > 1),
            cancelZoom: function () { e.cancel = true; }
        });

        // zoom in when multiple are clicked
        if (marks.length > 1 && e.cancel !== true) {
            for (var i = 0; i < marks.length; i++) {
                latlngs.push(marks[i].getLatLng());
            }
            var bnds = new L.LatLngBounds(latlngs);
            var zoom = Math.min(this._map.getBoundsZoom(bnds),
                this._map.getZoom() + this.options.maxZoomChange);
            this._map.setView(bnds.getCenter(), zoom);
        }
    }

});


/* ==========================================================
 * L.LeafpileIcon
 *
 * Icon for use with a Leafpile
 * ========================================================== */
L.LeafpileIcon = L.DivIcon.extend({

    // special constructor to include group count, index (in
    // the sizes array), and size def object
    initialize: function (count, index, def) {
        this.lpCount = count;
        this.lpIndex = index;
        this.lpDef = def;

        L.Util.setOptions(this, {
            className:   'leafpile-icon leafpile-size-' + index,
            html:        '<b>' + count + '</b>',
            iconSize:    def.size,
            iconAnchor:  def.anchor,
            popupAnchor: def.popup
        });
    },

    // set special inline styles
    _setIconStyles: function (div, name) {
        L.Icon.prototype._setIconStyles.call(this, div, 'icon');
        div.style.cursor = 'pointer';
        div.style.background = 'url(data:image/png;base64,' + this.lpDef.image + ') no-repeat 0 0';
        div.style.textAlign = 'center';
        div.style.fontSize = '13px';
        div.style.color = '#fff';
        div.style.lineHeight = this.options.iconSize.y + 'px';
    }

});

L.leafpileIcon = function (options) {
    return new L.LeafpileIcon();
};


/* ==========================================================
 * L.Leafpile
 *
 * A marker representing a grouping of other markers
 * ========================================================== */
L.Leafpile = L.Marker.extend({

    /* ========================================
     * Configuration Options
     * ======================================== */

    options: {
        clickable: true,
        icon: new L.Icon.Default() // will change right away
    },

    /* ========================================
     * Public Methods
     * ======================================== */

    // constructor
    initialize: function (markers, group, options) {
        L.Util.setOptions(this, options);
        this._group = group;
        this._markers = {};
        this._cacheLayerPt = new L.Point(0, 0);
        this.addMarker(markers);
    },

    // get the number of grouped markers
    getCount: function () {
        var size = 0;
        for (var i in this._markers) {
            if (this._markers.hasOwnProperty(i)) {
                size++;
            }
        }
        return size;
    },

    // add a marker to the pile
    addMarker: function (markers) {
        if (!(markers instanceof Array)) {
            return this.addMarker([markers]);
        }

        var c = this.getCount(),
            x = this._cacheLayerPt.x * c,
            y = this._cacheLayerPt.y * c;

        // add weighted
        for (var i = 0; i < markers.length; i++) {
            var id = L.Util.stamp(markers[i]);
            if (!this._markers[id]) {
                this._markers[id] = markers[i];
                this._markers[id]._leafpile = this;
                var pt = this._group._markerToPoint(markers[i]);
                x += pt.x;
                y += pt.y;
            }
        }

        // average point location
        c = this.getCount();
        this._cacheLayerPt = new L.Point(x / c, y / c);
        this._latlng = this._group._map.layerPointToLatLng(this._cacheLayerPt);
        this._updateLeafpileIcon();

        return this;
    },

    // remove a marker
    removeMarker: function (marker) {
        var id = L.Util.stamp(marker);
        if (this._markers[id]) {
            var pt = this._group._markerToPoint(this._markers[id]),
                c = this.getCount(),
                x = this._cacheLayerPt.x * c - pt.x,
                y = this._cacheLayerPt.y * c - pt.y;
            delete this._markers[id]._leafpile;
            delete this._markers[id];

            // update position
            c = this.getCount();
            this._cacheLayerPt = new L.Point(x / c, y / c);
            this._latlng = this._group._map.layerPointToLatLng(this._cacheLayerPt);
            this._updateLeafpileIcon();
        }

        return this;
    },

    // return an array of all markers in this group
    getMarkers: function () {
        var all = [];
        for (var i in this._markers) {
            if (this._markers.hasOwnProperty(i)) {
                all.push(this._markers[i]);
            }
        }
        return all;
    },

    // remove references to self
    onRemove: function (map) {
        for (var i in this._markers) {
            if (this._markers.hasOwnProperty(i)) {
                delete this._markers[i]._leafpile;
            }
        }
        L.Marker.prototype.onRemove.call(this, map);
    },

    /* ========================================
     * Private Methods
     * ======================================== */

    // pull correct icon style from group
    _updateLeafpileIcon: function () {
        var sizes = this._group.options.styleSizes,
            defs  = this._group.options.styleDefs,
            count = this.getCount(),
            idx   = 0;

        // pick the biggest icon possible
        for (idx; idx < sizes.length; ++idx) {
            if (count <= sizes[idx]) {
                break; // used this index
            }
        }
        if (idx > sizes.length - 1) {
            idx = sizes.length - 1;
        }
        this.setIcon(new L.LeafpileIcon(count, idx, defs[idx]));
    }

});




}(this));