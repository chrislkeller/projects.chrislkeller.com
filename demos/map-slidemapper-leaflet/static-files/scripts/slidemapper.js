/* ==========================================================
 * slidemapper.js v0.1.1
 * A jQuery plugin to create an animated slideshow tied to a Leaflet map.
 * http://github.com/cavis/slidemapper
 * ==========================================================
 * Copyright (c) 2012 Ryan Cavis
 * Licensed under http://en.wikipedia.org/wiki/MIT_License
 * ========================================================== */


/* ==========================================================
 * SlideMapper jquery extension
 *
 * Creates a slidemapper widget with an element.
 * ========================================================== */
(function($) {

  // default configuration options
  var defaultOptions = {

    // an initial set of slides to add to the map
    // (optional... you can always add slides later)
    slides: [],

    // the type of map to use. valid options are: cloudmade / stamen-toner /
    // stamen-terrain / stamen-watercolor / mapquest / mapquest-aerial
    mapType: 'mapquest',

    // if using cloudmade tiles, provide your apikey here
    apiKey:  null,

    // the default/fallback center and zoomlevel of the map
    center: [40.423, -98.7372],
    zoom: 4,

    // minimum and maximum allowed zoom levels
    minZoom: 2,
    maxZoom: 10,

    // enable key events (left-right arrow keys)
    keyEvents: true,

    // allow popups to close on the map
    closePopupOnClick: false,

    // height/layout settings
    mapPosition: 'bottom', //top|bottom
    mapHeight: 400,
    slideHeight: 220, //if autoHeight, this serves as the min slide height
    autoHeight: false,
    leafPile: false,

    // slideshow settings
    animateSpeed: 400,
    controlType: 'sides' // sides|top
  };

  // private vars, defined at the beginning of every call, saved at the end
  var DATA;
  var $THIS;

  // private methods
  function _slideOut($el, goLeft) {
    var end = goLeft ? -($el.width()) : $el.width();
    $el.animate({'margin-left': end}, DATA.options.animateSpeed, 'swing', function() { $el.removeClass('active').removeAttr('style'); });
  }
  function _slideIn($el, goLeft) {
    var start = goLeft ? $el.width() : -($el.width());
    $el.css('margin-left', start).addClass('active');
    $el.animate({'margin-left': 0}, DATA.options.animateSpeed, 'swing', function() { $el.removeAttr('style'); });
    _autoHeight($el, true);
  }
  function _refreshControls() {
    var left = $THIS.find('.ctrl-left'),
        right = $THIS.find('.ctrl-right'),
        count = $THIS.find('.ctrl-count');
    (DATA.index > 0) ? left.addClass('active') : left.removeClass('active');
    (DATA.index < DATA.items.length-1) ? right.addClass('active') : right.removeClass('active');
    count.html((DATA.index === null ? 0 : DATA.index+1) + ' of ' + DATA.items.length);
  }
  function _autoHeight($el, animate) {
    if (DATA.options.autoHeight) {
      var $show = $THIS.find('.smapp-show');
      if (!DATA.autoHeight) DATA.autoHeight = $show.height();
      var inner = $el.find('.slide-inner').height(), outer = $show.height();
      if (inner > outer) {
        animate ? $show.animate({'height': inner}, DATA.options.animateSpeed) : $show.height(inner);
      }
      else if (inner < outer) {
        var newH = Math.max(inner, DATA.autoHeight);
        animate ? $show.animate({'height': newH}, DATA.options.animateSpeed) : $show.height(newH);
      }
    }
  }
  function _onKeyPress(e) {
    if (DATA.index !== null) {
      if (e.keyCode === 37) $THIS.slideMapper('prev');
      if (e.keyCode === 39) $THIS.slideMapper('next');
    }
  }
  function _setTiles(tileType) {
    if (DATA.tileLayer) {
      DATA.map.removeLayer(DATA.tileLayer);
      DATA.tileLayer = false;
    }

    // set the new tile layer
    if (tileType === 'cloudmade') {
      if (!DATA.options.apiKey) $.error('apiKey required for cloudmade tiles');
      var tileOpts = {attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'};
      DATA.tileLayer = new L.TileLayer('http://{s}.tile.cloudmade.com/'+DATA.options.apiKey+'/997/256/{z}/{x}/{y}.png', tileOpts);
    }
    else if (tileType === 'stamen-toner') {
      if (!L.StamenTileLayer) $.error('did you forget to include tile.stamen.js?');
      DATA.tileLayer = new L.StamenTileLayer('toner');
    }
    else if (tileType === 'stamen-terrain') {
      if (!L.StamenTileLayer) $.error('did you forget to include tile.stamen.js?');
      DATA.tileLayer = new L.StamenTileLayer('terrain');
    }
    else if (tileType === 'stamen-watercolor') {
      if (!L.StamenTileLayer) $.error('did you forget to include tile.stamen.js?');
      DATA.tileLayer = new L.StamenTileLayer('watercolor');
    }

    else if (tileType === 'google-maps') {
      DATA.tileLayer = new L.Google('ROADMAP');
    }

    else if (tileType === 'mapquest') {
      var tileOpts = {
        subdomains:  ['otile1', 'otile2', 'otile3', 'otile4'],
        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
      };
      DATA.tileLayer = new L.TileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', tileOpts);
    }
    else if (tileType == 'mapquest-aerial') {
      var tileOpts = {
        subdomains:  ['oatile1', 'oatile2', 'oatile3', 'oatile4'],
        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
      };
      DATA.tileLayer = new L.TileLayer('http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', tileOpts);
    }
    else {
      $.error('invalid tile type: '+tileType);
    }
    DATA.map.addLayer(DATA.tileLayer);
  }
  function _makeHTML(opts) {
    var map, mapStyle = 'style="height:'+opts.mapHeight+'px"';
    if (opts.mapPosition === 'top') {
      map = '<div class="smapp-map top hidden-phone" '+mapStyle+'></div>';
    }
    else if (opts.mapPosition === 'bottom') {
      map = '<div class="smapp-map bottom hidden-phone" '+mapStyle+'></div>';
    }
    else {
      $.error('Invalid mapPosition: '+opts.mapPosition);
    }

    // slideshow gets either height or min-height
    var show = opts.autoHeight
      ? '<div class="smapp-show" style="min-height:'+opts.slideHeight+'px">'
      : '<div class="smapp-show" style="height:'+opts.slideHeight+'px">';
    show += '<div class="smapp-slides-ct"></div>';

    // controls
    if (opts.controlType === 'sides') {
      show += '<span class="ctrl-left ctrl-side">&lsaquo;</span>';
      show += '<span class="ctrl-right ctrl-side">&rsaquo;</span>';
    }
    else if (opts.controlType === 'top') {
      show += '<div class="ctrl-top">';
      show += '<span class="ctrl-left">&lsaquo;</span>';
      show += '<span class="ctrl-count">0 of 0</span>';
      show += '<span class="ctrl-right">&rsaquo;</span>';
      show += '</div>';
    }
    else {
      $.error('Invalid controlType: '+opts.controlType);
    }
    show += '</div>'; //end smapp-show

    // assemble in container
    var s = '<div class="smapp">';
    s += (opts.mapPosition === 'top') ? map : '';
    s += show;
    s += (opts.mapPosition === 'bottom') ? map : '';
    return s;
  }
  function _showPopup(item, panTo) {
    DATA.map.closePopup();
    if (item.marker && item.config.popup) {
      if (item.marker._leafpile) {
        item.marker.openPopup();
      }
      else {
        var popup = item.marker._popup.setLatLng(item.marker.getLatLng());
        DATA.map.openPopup(popup);
      }
    }

    // determine the center
    DATA.map.setView(item.center, item.zoom || DATA.map.getZoom(), panTo ? false : true);
  }
  function _getMarkerLayer() {
    var markerLayer;

    // create a leafpile, or a normal layer
    if (DATA.options.leafPile) {
      if (!L.LeafpileGroup) $.error('Did you forget to include leafpile.js?');
      var opts = DATA.options.leafPile === true ? {} : DATA.options.leafPile;
      markerLayer = new L.LeafpileGroup(opts);

      // listen to zooms/redraws
      markerLayer.on('redraw', function(e) {
        if (DATA.index !== null && DATA.items[DATA.index].config.popup) {
          DATA.items[DATA.index].marker.openPopup();
        }
      });
      markerLayer.on('click', function(e) {
        // slide the first marker in
        if (e.leafpile) {
          var idx = e.markers[0].index;
          if (idx != DATA.index) {
            if (DATA.index !== null) _slideOut(DATA.items[DATA.index].$slide, (idx > DATA.index));
            _slideIn(DATA.items[idx].$slide, (idx > DATA.index));
            DATA.index = idx;
            _refreshControls();
          }
        }

        // cancel if frozen
        if (e.zooming && DATA.frozen) {
          e.cancelZoom();
        }
      });
    }
    else {
      markerLayer = new L.LayerGroup();
    }
    return markerLayer;
  }


  // public methods
  var methods = {

    // initial setup
    init: function(passedOpts) {
      if (!DATA) {
        DATA = {};
        DATA.options = $.extend({}, defaultOptions, passedOpts);
        methods.options(passedOpts || {});
      }
    },

    // get or set map options
    options: function(passedOpts) {
      if (passedOpts === undefined) {
        return DATA.options;
      }
      else {
        DATA.options = $.extend({}, DATA.options, passedOpts);
        $THIS.empty();
        $THIS.append(_makeHTML(DATA.options));
        showEl = $('.smapp-show', $THIS)[0];
        mapEl  = $('.smapp-map',  $THIS)[0];

        // left/right listeners
        $(showEl)
          .on('click', '.ctrl-left', function() {$THIS.slideMapper('prev');})
          .on('click', '.ctrl-right', function() {$THIS.slideMapper('next');});
        methods.keyEvents(DATA.options.keyEvents);

        // initialize the map
        DATA.options.center = new L.LatLng(DATA.options.center[0], DATA.options.center[1]);
        DATA.map = new L.Map(mapEl, DATA.options);
        _setTiles(DATA.options.mapType);

        // create a layer for the markers
        DATA.markergroup = _getMarkerLayer();
        DATA.map.addLayer(DATA.markergroup);

        // setup initial items
        DATA.items = [];
        DATA.index = null;
        methods.add(DATA.options.slides);
      }
    },

    // set key events on or off
    keyEvents: function(turnOn) {
      $(document).unbind('keydown', _onKeyPress);
      if (turnOn) {
        $(document).keydown(_onKeyPress);
      }
    },

    // set map events on or off
    mapEvents: function(turnOn) {
      var props = ['dragging', 'touchZoom', 'doubleClickZoom', 'scrollWheelZoom', 'boxZoom'];
      var fn = turnOn ? 'enable' : 'disable';
      for (var i=0; i<props.length; i++) {
        var p = props[i];
        if (DATA.map[p] && typeof(DATA.map[p][fn]) === 'function') {
          DATA.map[p][fn]();
        }
      }
    },

    // prevent slide from changing
    freeze: function(makeFrozen) {
      DATA.frozen = makeFrozen;
      makeFrozen ? methods.keyEvents(false) : methods.keyEvents(true);
    },

    // get the number of items in the slideshow
    count: function() {
      return DATA.items.length;
    },

    // get the slide at an index (or current index if null)
    get: function(index) {
      index = (index === undefined || index === null) ? DATA.index : index;
      return (DATA.items[index] === undefined) ? false : DATA.items[index];
    },

    // append a slide (or slides) to the end of the show
    add: function(cfg) {
      var idx = (DATA.items && DATA.items.length) ? DATA.items.length : 0;
      return methods.insert(idx, cfg);
    },

    // insert a slide (or slides) into the show
    insert: function(index, cfg) {
      if ($.isArray(cfg)) {
        var ins = [];
        $.each(cfg, function(i, c) { ins.push(methods.insert.call(this, index+i, c)); });
        return ins;
      }
      if (!$.isNumeric(index) || index < 0 || index > DATA.items.length) {
        $.error('Invalid index "'+index+'" provided to insert');
      }
      var item = {index: index, config: cfg};

      // add marker to map
      if (cfg.marker) {

        // old parameters for markers
        //var latlng = new L.LatLng(cfg.marker[0], cfg.marker[1]);
        //item.marker = new L.Marker(latlng);
        //if (cfg.popup) item.marker.bindPopup(cfg.popup);

        // begin ability to use custom marker
        var LeafIcon = L.Icon.extend({
            options: {
                //shadowUrl: '',
                iconSize:     [40, 40],
                shadowSize:   [0, 0],
                iconAnchor:   [22, 94],
                shadowAnchor: [0, 0],
                popupAnchor:  [-3, -76]
            }
        });

        var mapIcon = new LeafIcon({iconUrl: cfg.map_marker});
        var latlng = new L.LatLng(cfg.marker[0], cfg.marker[1]);
        item.marker = L.marker(latlng, {icon: mapIcon});
        if (cfg.popup) item.marker.bindPopup(cfg.popup);
        // end ability to use custom marker

        item.marker.index = index;
        item.marker.on('click', function(e) {
          var idx = e.target.index;
          if (!DATA.frozen && DATA.index != idx && $THIS.triggerHandler('move', [methods.get(idx), idx]) !== false) {
            if (DATA.index !== null) _slideOut(DATA.items[DATA.index].$slide, (idx > DATA.index));
            _slideIn(DATA.items[idx].$slide, (idx > DATA.index));
            DATA.index = idx;
            _refreshControls();
          }
        });
        DATA.markergroup.addLayer(item.marker);
      }

      // render to slide
      var html = '<div class="slide"><div class="slide-inner">'+(cfg.html || '')+'</div></div>';
      if (index == DATA.items.length) {
        item.$slide = $(html).appendTo($THIS.find('.smapp-slides-ct'));
      }
      else {
        item.$slide = $(html).insertBefore(DATA.items[index].$slide);
      }

      // figure out center and zoom (optional)
      item.zoom = item.marker ? cfg.zoom : DATA.options.zoom;
      item.center = item.marker ? item.marker.getLatLng() : DATA.options.center;
      if (cfg.center) {
        item.center = new L.LatLng(cfg.center[0], cfg.center[1]);
      }

      // splice into data items
      DATA.items.splice(index, 0, item);
      for (var i=index+1; i<DATA.items.length; i++) {
        DATA.items[i].index++;
        if (DATA.items[i].marker) DATA.items[i].marker.index++;
      }

      // show slide and refresh controls
      if (DATA.items.length == 1) {
        methods.move(0, false); //initial
      }
      else if (DATA.index === index) {
        DATA.index++; //follow the active slide
      }
      _refreshControls();
      return item;
    },

    // move a slide to a new position
    shuffle: function(index1, index2) {
      var fidx = (index2 === undefined || index2 === null) ? DATA.index : index1;
      var item = methods.get(fidx);
      if (!item) {
        $.error('Invalid from index "'+fidx+'" provided to remove');
      }

      var tidx = (index2 === undefined || index2 === null) ? index1 : index2;
      if (tidx == 'first') tidx = 0;
      if (tidx == 'last') tidx = DATA.items.length-1;
      if (!$.isNumeric(tidx) || tidx < 0 || tidx > DATA.items.length-1) {
        $.error('Invalid to index "'+tidx+'" provided to insert');
      }
      if (fidx == tidx) return; //nothing to do

      // splice out of items
      DATA.items.splice(fidx, 1);
      for (var i=fidx; i<DATA.items.length; i++) {
        DATA.items[i].index--;
        if (DATA.items[i].marker) DATA.items[i].marker.index--;
      }

      // move the slide
      if (tidx == DATA.items.length) {
        item.$slide.appendTo($THIS.find('.smapp-slides-ct'));
      }
      else {
        item.$slide.insertBefore(DATA.items[tidx].$slide);
      }

      // splice back into items and update index
      item.index = tidx;
      if (item.marker) item.marker.index = tidx;
      DATA.items.splice(tidx, 0, item);
      for (var i=tidx+1; i<DATA.items.length; i++) {
        DATA.items[i].index++;
        if (DATA.items[i].marker) DATA.items[i].marker.index++;
      }

      // follow me
      if (DATA.index == fidx) {
        DATA.index = tidx;
      }
      _refreshControls();
      return item;
    },

    // remove a single slide/marker
    remove: function(index) {
      var item = methods.get(index);
      if (!item) {
        $.error('Invalid index "'+index+'" provided to remove');
      }
      if (DATA.items.length == 1) {
        return methods.removeAll(); //just nuke it
      }

      // remove from map, slide, and items
      if (item.marker) {
        DATA.markergroup.removeLayer(item.marker);
      }
      item.$slide.remove();
      DATA.items.splice(item.index, 1);
      for (var i=item.index; i<DATA.items.length; i++) {
        DATA.items[i].index--;
        if (DATA.items[i].marker) DATA.items[i].marker.index--;
      }

      // show slide and refresh controls
      if (DATA.index === item.index) {
        var flipTo = Math.min(item.index, DATA.items.length-1);
        _slideIn(DATA.items[flipTo].$slide, (flipTo >= DATA.index));
        _showPopup(DATA.items[flipTo], true);
        DATA.index = flipTo;
      }
      _refreshControls();
    },

    // fast remove all slides/markers
    removeAll: function() {
      DATA.map.removeLayer(DATA.markergroup);
      $THIS.find('.smapp-slides-ct').empty();

      // re-init the blank map
      DATA.markergroup = _getMarkerLayer();
      DATA.map.addLayer(DATA.markergroup);
      DATA.items = [];
      DATA.index = null;
      _refreshControls();

      // re-center the blank map
      DATA.map.setView(DATA.options.center, DATA.options.zoom);
    },

    // move to a different marker
    move: function(index, animate) {
      if (DATA.frozen) return;
      if (!methods.get(index)) return;
      if ($THIS.triggerHandler('move', [methods.get(index), index]) === false) return;

      // slide out the old, in the new preview
      if (animate) {
        if (DATA.index !== null) _slideOut(DATA.items[DATA.index].$slide, (index > DATA.index));
        _slideIn(DATA.items[index].$slide, (index > DATA.index));
      }
      else {
        if (DATA.index !== null) DATA.items[DATA.index].$slide.removeClass('active');
        DATA.items[index].$slide.addClass('active');
        _autoHeight(DATA.items[0].$slide, false);
      }

      // open new popup and update stored index
      _showPopup(DATA.items[index], animate);
      DATA.index = index;
      _refreshControls();
    },

    // next!
    next: function() {
      methods.move(DATA.index === null ? 0 : DATA.index + 1, true);
    },

    // previous!
    prev: function() {
      methods.move(DATA.index === null ? 0 : DATA.index - 1, true);
    }

  };

  // attach jquery namespace
  $.fn.slideMapper = function(method) {
    if (this.length > 1) {
      $.error('SlideMapper currently only supports 1 map per page');
    }
    else if (method && typeof method !== 'object' && !methods[method]) {
      $.error('Method '+method+' does not exist on jQuery.slideMapper');
    }
    else {
      var ret = null;

      // call for each element
      for (var i=0; i<this.length; i++) {

        // setup private vars
        $THIS = $(this[i]);
        DATA  = $THIS.data('slideMapper');

        // call init if no method given
        if (methods[method]) {
          if (!DATA) $.error('Method '+method+' called on uninitialized element');
          else ret = methods[method].apply(this[i], Array.prototype.slice.call(arguments, 1));
        }
        else {
          methods.init.apply(this[i], arguments);
        }

        // save data changes
        $THIS.data('slideMapper', DATA);
      }
      return (ret === null ? this : ret);
    }
  };

}) (jQuery);
