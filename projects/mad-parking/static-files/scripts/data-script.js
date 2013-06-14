// variables for testing locally
var jqueryNoConflict = jQuery;
var dataSource = 'static-files/data/parking.json';
//var dataSource = 'http://madsafety.nwsmkr.com/api/v1/parking_garage/?format=json';
var parkingIcon = new google.maps.MarkerImage('static-files/images/parking.png');
var map;
var infowindow;
var garages = [];
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var closestParkingGarage;
var geocoder = new google.maps.Geocoder();
var initialUserLat;
var initialUserLong;
var initialUserLocation;
var inputUserLat;
var inputUserLong;
var inputUserLocation;
var defaultUserLocation = new google.maps.LatLng(43.07524962054086, -89.38107490539551);

    // begin main function
    jqueryNoConflict(document).ready(function(){
        geocodeCurrentPositionAndReturn();
    });



    //begin function
    function calculateDestination(){
        console.log('Destination');
        jqueryNoConflict('#welcomeScreen').addClass("hidden");
        jqueryNoConflict('#userAddressInput').addClass("hidden");
        geocodeUserDestinationAndReturn();
        retriveData();

        setTimeout(function() {
            console.log('populate distances at 1');
            renderLocationScreen();
            populateDistances();
        }, 1000);

        setTimeout(function() {
            console.log('find closest garage and write map at 2');
            findClosestGarage();
            writeMap(initialUserLocation, 'You Are Here');
        }, 2000);

        setTimeout(function() {
            console.log('calculate route at 3');
            calculateRoute();
        }, 3000);

        setTimeout(function() {
            console.log('write ramp message at 4')
            renderNearestRampMessage();
        }, 4000);
    };
    //end function

    // determine user destination
    function geocodeUserDestinationAndReturn(){
        var destinationStreet = document.getElementById('street').value;
        var destinationCity = document.getElementById('city').value;
        var destinationState = document.getElementById('state').value;
        var inputtedAddress = destinationStreet + ', ' + destinationCity + ', ' + destinationState;
           geocoder.geocode( { 'address': inputtedAddress}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    initialUserLat = results[0].geometry.location.lat();
                    initialUserLong = results[0].geometry.location.lng();
                    initialUserLocation = new google.maps.LatLng(initialUserLat,initialUserLong);

                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
                console.log('Geocoded ' + initialUserLocation);
            });
    };

    // get user's location
    function geocodeCurrentPositionAndReturn(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition,showError);
            console.log('Geolocation is supported!');
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    };

    function showPosition(position){
        initialUserLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        initialUserLat = position.coords.latitude;
        initialUserLong = position.coords.longitude;
        console.log('Geocoded ' + initialUserLat + initialUserLong);
    };

    function showError(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                alert('You chose to deny geolocation');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                alert('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                alert('An unknown error occurred.');
            break;
        }
    };

    // function to grab data
    function retriveData() {
        jqueryNoConflict.getJSON(dataSource, createArrayFrom);
    };

    // create garages array from json data
    function createArrayFrom(data){

        // loop through data for markers
        for(var i=0; i<data.objects.length; i++){

            // create object
            var myLoopObject = {
                garageName: data.objects[i].name,
                garageLat: data.objects[i].latitude,
                garageLong: data.objects[i].longitude,
                garageDistance: -1,
                garageUpdated: takeTime(data.objects[i].time),
                garageAddress: data.objects[i].address,
                garageSpots: data.objects[i].spots
                //garageID: data.objects[i].ID
            };
            garages.push(myLoopObject);
        }

        renderDataLocationScreen();

        getTemplateAjax('static-files/templates/data-ramp-screen.handlebars', function(template) {
            handlebarsFormatDateForDisplay();
            jqueryNoConflict('#current-ramp-conditions').html(template(data));
        });

        return garages;
    };

    // function to add date and time to template
    function handlebarsFormatDateForDisplay(){
        Handlebars.registerHelper('dateFormat', function(context, block) {
            if (window.moment) {
                return takeTime(context);
            }else{
                return context;
            };
        });
    };

    // format date/time
    function takeTime(dateInput) {
        var dateFormat = 'MMM. D, h:mm a';
        var dateOutput = moment(dateInput).format(dateFormat);
        return dateOutput;
    };

    // add distances to each objects
    function populateDistances(){
        for(var i=0; i<garages.length; i++){
            garages[i].garageDistance = calculateDistanceBetween(initialUserLat, initialUserLong, garages[i].garageLat, garages[i].garageLong);
        }
    };

    // distance calculation
    function toRad(Value) {
        return Value * Math.PI / 180;
    };

    //begin function
    function calculateDistanceBetween(lat1, lon1, lat2, lon2){

        // returns in km
        //var R = 6371;

        // returns in miles
        var R = 3958.7558657440545;
        var dLat = toRad(lat2-lat1);
        var dLon = toRad(lon2-lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    };

    // find the closest garage
    function findClosestGarage(){
        var closestIndex = -1;
        var closestDistance = 1;
        for (var i = 0; i < garages.length; i++) {
            if (closestIndex == -1 || (garages[i].garageDistance < closestDistance)) {
                closestIndex = i;
                closestDistance = Math.round(garages[i].garageDistance * 100)/100;
                closestName= garages[i].garageName;
                closestSpots= garages[i].garageSpots;
                closestUpdated= garages[i].garageUpdated;
                closestParkingLat = String(garages[i].garageLat);
                closestParkingLong = String(garages[i].garageLong);
                closestParkingGarage = closestParkingLat + ', ' + closestParkingLong;
            }
        }

        var closestRamp = {
            closestRampName:  closestName,
            closestRampDistance: closestDistance,
            closestRampSpots: closestSpots,
            closestRampUpdated: closestUpdated
            }

        return closestRamp;
    };

    // calculate driving directions to the closest garage
    function calculateRoute(){

        if (infowindow) {
            infowindow.close();
        }

        var start = initialUserLocation;
        var end = closestParkingGarage;
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    };

    //begin function
    function writeMap(initialUserLocation, initialContentMessage){
        console.log('Write Map function is coming back as ' + initialUserLocation);

        /*
        map icons from
        Maps Icons Collection
        http://mapicons.nicolasmollet.com
        Creative Commons 3.0 BY-SA
        Author : Nicolas Mollet
        */

        var myOptions = {
            center: new google.maps.LatLng(initialUserLocation),
            zoom: 13,
            scrollwheel: false,
            draggable: true,
            mapTypeControl: false,
            navigationControl: false,
            streetViewControl: false,
            panControl: false,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_TOP}
            };
        var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

        map.setCenter(initialUserLocation);

        google.maps.event.addDomListener(window, 'resize', function() {
          map.setCenter(initialUserLocation);
        });

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('driving_directions'));
    }
    //end function

    // render handlebars templates via ajax
    function getTemplateAjax(path, callback) {
        var source;
        var template;

        jqueryNoConflict.ajax({
            url: path,
                success: function(data) {
                    source = data;
                    template = Handlebars.compile(source);
                        if (callback) callback(template);
                }
        });
    };













    //begin get current ramp conditions and render template
    function currentRampConditions(){
        retriveData();
    };
    //end function

    //begin nearestMyLocation function
    function calculateLocation(){
        retriveData();

        setTimeout(function() {
            renderDataLocationScreen();
            populateDistances();
            renderMapAndDirections();
        }, 1000);

        setTimeout(function() {
            findClosestGarage();
            writeMap(initialUserLocation, 'You Are Here');
        }, 2000);

        setTimeout(function() {
            calculateRoute();
        }, 3000);

        setTimeout(function() {
            renderNearestRampMessage();
            renderCurrentRampConditions();
        }, 3500);

    };
    //end function

    // render data location screen template
    function renderDataLocationScreen(){
        getTemplateAjax('static-files/templates/data-location-screen.handlebars', function(template) {
            jqueryNoConflict('#data-container').html(template());
        })
    };

    // render location screen template
    function renderMapAndDirections(){
        getTemplateAjax('static-files/templates/mapDirections.handlebars', function(template) {
            jqueryNoConflict('#map-and-directions').html(template());
        })
    };

    // render ramp message template
    function renderNearestRampMessage(){
        getTemplateAjax('static-files/templates/nearestRampMessage.handlebars', function(template) {
            rampMessageData = findClosestGarage();
            jqueryNoConflict('#nearest-ramp').html(template(rampMessageData));
        })
    };

    // render ramp message template
    function renderCurrentRampConditions(){
        getTemplateAjax('static-files/templates/data-ramp-screen.handlebars', function(template) {
            rampConditionsData = createArrayFrom();
            jqueryNoConflict('#current-ramp-conditions').html(template(rampConditionsData));
        })
    };




    // function to maintain center point of map
    function calculateCenter(){
        center = map.getCenter();
    };