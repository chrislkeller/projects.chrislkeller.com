    var jqueryNoConflict = jQuery;
    var map;

    // begin main function
    jqueryNoConflict(document).ready(function(){
        google.maps.event.addDomListener(window, 'load', createMap);
        retriveData();
    });

    // begin function
    function createMap() {

        var centerCalif = new google.maps.LatLng(34.29461534118775, -118.26919555664062);
        var accentTableId = '15uGEmPSJfMKzwU8nV0eARKgrSBAy-F3CsTiv4ic';
        var locationColumn = 'location';

        map = new google.maps.Map(document.getElementById('content-map-canvas'), {
            center: centerCalif,
            zoom: 8,
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
                position: google.maps.ControlPosition.RIGHT_TOP}
        });

        // Initialize ft layer
        layer = new google.maps.FusionTablesLayer({
            query: {
                select: locationColumn,
                from: accentTableId
            },
            map: map,
            suppressInfoWindows: true
        });

        google.maps.event.addDomListener(map, 'idle', function() {
          calculateCenter();
        });

        google.maps.event.addDomListener(window, 'resize', function() {
          map.setCenter(centerCalif);
        });

    };

    // function to maintain center point of map
    function calculateCenter() {
        center = map.getCenter();
    };

    // grab data
    function retriveData() {
        var dataSource = 'static-files/data/flat_data.json';
        jqueryNoConflict.getJSON(dataSource, renderDataVisualsTemplate);
    };

    // render data visuals template
    function renderDataVisualsTemplate(data){
        renderHandlebarsTemplate('static-files/templates/content-display.handlebars', '#content-display', data);
    };

    // render handlebars templates via ajax
    function getTemplateAjax(path, callback) {
        var source, template;
        jqueryNoConflict.ajax({
            url: path,
            success: function (data) {
                source = data;
                template = Handlebars.compile(source);
                if (callback) callback(template);
            }
        });
    };

    // render handlebars template function
    function renderHandlebarsTemplate(withTemplate,inElement,withData){
        getTemplateAjax(withTemplate, function(template) {
            jqueryNoConflict(inElement).html(template(withData));
        })
    };

    // add handlebars debugger
    function handlebarsDebugHelper(){
        Handlebars.registerHelper("debug", function(optionalValue) {
            console.log("Current Context");
            console.log("====================");
            console.log(this);
        });
    };