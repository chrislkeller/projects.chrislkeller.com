
    // initialize the whole thing
	$(document).ready(function() {
		App.init();

		$('#bars').click(function() {
			App.places.reset(bars);
		});

		$('#museums').click(function() {
			App.places.reset(museums);
		});

		$('#addBtn').click(function() {
			App.places.add({
				title: 'State Capitol Building',
				lat: 44.9543075,
				lng: -93.102222
			});
		});

		$('#removeBtn').click(function() {
			App.places.remove(App.places.at(0));
		});

	});

    // my test data
    var testDataSource = [
        {status: "SD", avgdailytraffic: "16987", lanes: "2", lat: 34.1445333333333, type: "", age: "47", lng: -118.164663888889, county: "Los Angeles County", maintenanceagency: "City of Pasadena", length: "1463.25464", yearbuilt: "Colorado Blvd", location: "Arroyo Blvd & Arroyo Seco", cbhirating: "100", title: "53C0107", nbisufficiencyrating: "70.3", facilitycarried: "Colorado Blvd", avgdailytrafficyear: ""},
        {status: "SD", avgdailytraffic: "740", lanes: "2", lat: 34.1588444444444, type: "", age: "98", lng: -118.16225, county: "Los Angeles County", maintenanceagency: "City of Pasadena", length: "416.66668", yearbuilt: "Prospect Blvd", location: "Seco St", cbhirating: "99.81", title: "53C0264", nbisufficiencyrating: "90.9", facilitycarried: "Prospect Blvd", avgdailytrafficyear: ""}]

    // sample data for the app
    var museums = [{
            title: "Walker Art Center",
            message: "My Message",
            lat: 44.9796635,
            lng: -93.2748776
		}, {
            title: "Science Museum of Minnesota",
            message: "My Message",
            lat: 44.9429618,
            lng: -93.0981016
		}, {
			title: "The Museum of Russian Art",
            message: "My Message",
			lat: 44.9036337,
			lng: -93.2755413
		}];

	var bars = [{
            title: "Park Tavern",
            message: "My Message",
            lat: 44.9413272,
            lng: -93.3705791,
		}, {
            title: "Chatterbox Pub",
            message: "My Message",
            lat: 44.9393882,
            lng: -93.2391039
		}, {
            title: "Acadia Cafe",
            message: "My Message",
            lat: 44.9709853,
            lng: -93.2470717
        }];

    // create a blank
    var App = {};

    // base location model
    App.Location = Backbone.GoogleMaps.Location.extend({

        //idAttribute: 'title',
        idAttribute: 'title',

        defaults: {
            lat: 45,
            lng: -93
        }
    });

	App.LocationCollection = Backbone.GoogleMaps.LocationCollection.extend({
	   model: App.Location
	});

	App.InfoWindow = Backbone.GoogleMaps.InfoWindow.extend({
	   template: '#infoWindow-template',

		events: {
			'mouseenter h2': 'logTest',
			'mouseenter h2': 'displayData'
		},

		logTest: function() {
			console.log('test in InfoWindow');
		},

        displayData: function() {
           // writes to details div
           $('#content-detail').html('what');
        },

	});

	App.MarkerView = Backbone.GoogleMaps.MarkerView.extend({
		infoWindow: App.InfoWindow,

		// sets markers to be draggable
		overlayOptions: {
			draggable: false
		},

		initialize: function() {
			_.bindAll(this, 'handleDragEnd');
		},

		mapEvents: {
			'dragend': 'handleDragEnd'
		},

		handleDragEnd: function(e) {
			alert('Dropped at: \n Lat: ' + e.latLng.lat() + '\n lng: ' + e.latLng.lng());
		}
	});

	App.MarkerCollectionView = Backbone.GoogleMaps.MarkerCollectionView.extend({
		markerView: App.MarkerView
	});

	// function that starts everything a runnin
	App.init = function() {
		this.createMap();
		this.places = new this.LocationCollection(testDataSource);

		// render markers
		var markerCollectionView = new this.MarkerCollectionView({
			collection: this.places,
			map: this.map
		});
		markerCollectionView.render();

		// render the list view
		var listView = new App.ListView({
		  collection: this.places
		});

		listView.render();
	}

    App.createMap = function() {
        var mapOptions = {
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
        }

        // instantiate map
        this.map = new google.maps.Map($('#content-map-canvas')[0], mapOptions);

        this.map.mapTypes.set('map-style', new google.maps.StyledMapType(
            mapFunctions.styleForMaps, {
                name: 'Styled Map'
            }
        ));
        this.map.setMapTypeId('map-style');
	}

    // handlers for the list view
    App.ItemView = Backbone.View.extend({
        template: '<%=location %>',
        tagName: 'li',

        events: {
           'mouseenter': 'selectItem',
           'mouseleave': 'deselectItem'
        },

        initialize: function() {
           _.bindAll(this, 'render', 'selectItem', 'deselectItem')
           this.model.on("remove", this.close, this);
        },

        render: function() {
           var html = _.template(this.template, this.model.toJSON());
           this.$el.html(html);
           return this;
        },

        close: function() {
           this.$el.remove();
        },

        selectItem: function() {
           this.model.select();

           // writes to details div
           $('#content-detail').html('what');

        },

        deselectItem: function() {
           this.model.deselect();

           // empties detail div
           $('#content-detail').empty();

        }
    });


    App.ListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'overlay',
        id: 'listing',

        initialize: function() {
        	_.bindAll(this, "refresh", "addChild");
        	this.collection.on("reset", this.refresh, this);
        	this.collection.on("add", this.addChild, this);
        	this.$el.appendTo('body');
        },

        render: function() {
        	this.collection.each(this.addChild);
        },

        addChild: function(childModel) {
        	var childView = new App.ItemView({ model: childModel });
        	childView.render().$el.appendTo(this.$el);
        },

        refresh: function() {
        	this.$el.empty();
        	this.render();
        }
    });



    // styles and other functions for the map
    var mapFunctions = {

        styleForMaps: [{
            featureType: 'all',
            elementType: 'all',
            stylers: [{
                saturation: -99
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
    }