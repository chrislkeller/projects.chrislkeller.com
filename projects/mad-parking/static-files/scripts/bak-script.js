// variables for testing locally
var jqueryNoConflict = jQuery;
var dataSource = 'static/data/parking.json';
var parkingIcon = new google.maps.MarkerImage('static/images/parking.png');

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
        renderWelcomeScreen();
    });

    //begin function
    function calculateLocation(){
        console.log('Location');
        jqueryNoConflict('#welcomeScreen').hide();
        retriveData();

        setTimeout(function() {
            console.log('populate distances at 1 seconds');
            populateDistances();
        }, 1000);

        setTimeout(function() {
            console.log('find closest garage at 2 seconds');
            findClosestGarage();
            writeMap(initialUserLocation, 'You Are Here');
        }, 1500);

        setTimeout(function() {
            console.log('calculate route at 2 seconds');
            calculateRoute();
            renderNearestRampMessage();
        }, 2000);
    };
    //end function

    //begin function
    function calculateDestination(){
        console.log('Destination');
        jqueryNoConflict('#welcomeScreen').hide();

        geocodeUserDestinationAndReturn();
        
        setTimeout(function() {
            populateDestinationDistances();
        }, 2000);


        //findClosestGarage();
        //calculateRoute();
        //writeMap();

        renderDestinationScreen();
        
    };
    //end function










    

    /* DETERMINE CURRENT POSITION */
    // determine user destination
    function geocodeUserDestinationAndReturn(){
        var destinationStreet = document.getElementById('street').value;
        var destinationCity = document.getElementById('city').value;
        var destinationState = document.getElementById('state').value;
        var inputtedAddress = destinationStreet + ', ' + destinationCity + ', ' + destinationState;

        
           geocoder.geocode( { 'address': inputtedAddress}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    inputUserLat = results[0].geometry.location.lat();
                    inputUserLong = results[0].geometry.location.lng();
                    
                    console.log('Geocoded' + inputUserLat + inputUserLong);

                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
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

        console.log('Geocoded' + initialUserLat + initialUserLong);
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





    /* DETERMINE DISTANCES*/
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

    // add distances to each objects
    function populateDestinationDistances(){

        for(var i=0; i<garages.length; i++){
            garages[i].garageDistance = calculateDistanceBetween(inputUserLat, inputUserLong, garages[i].garageLat, garages[i].garageLong);
        }
        console.log(garages);
    };

    
    
    
    
    
    
    // add distances to each objects
    function populateDistances(){

        for(var i=0; i<garages.length; i++){
            garages[i].garageDistance = calculateDistanceBetween(initialUserLat, initialUserLong, garages[i].garageLat, garages[i].garageLong);
        }
        console.log(garages);
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
            navigationControl: true,
            streetViewControl: false,
            panControl: false,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_TOP}
            };
        var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

/*
        infowindow = new google.maps.InfoWindow({
            map: map,
            position: initialUserLocation,
            content: initialContentMessage
        });
*/

        map.setCenter(initialUserLocation);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('driving_directions'));
    }
    //end function

    /* TIME AND DATE FUNCTIONS */

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



    


    /* HANDLEBARS TEMPLATES */
    // function to render handlebars templates via ajax
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

    // function to grab data
    function retriveData() {
        jqueryNoConflict.getJSON(dataSource, renderLocationScreen);
    };

    // render welcome screen template
    function renderWelcomeScreen(){
        getTemplateAjax('./templates/welcome.handlebars', function(template) {
            welcomeData =
                {welcomeTitle: "Hey. Where do you want to park?", welcomeMessage: "Single-origin coffee portland squid tofu 3 wolf moon fixie thundercats single-origin coffee tofu jean shorts."}
            $('#welcomeScreen').html(template(welcomeData));
        })
    };


    // render location screen template
    function renderLocationScreen(data){

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

        getTemplateAjax('./templates/location.handlebars', function(template) {
            handlebarsFormatDateForDisplay();
            jqueryNoConflict('#rampContent').html(template(data));
        });
        return garages;
    };

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // render destination screen template
    function renderDestinationScreen(){
        getTemplateAjax('./templates/destination.handlebars', function(template) {
            destinationData =
                {destinationTitle: "Destination Screen Worked", destinationMessage: "Now get to work."}
            jqueryNoConflict('#destinationScreen').html(template(destinationData));
        })
    };

    // render destination screen template
    function renderNearestRampMessage(){
        getTemplateAjax('./templates/nearestRamp.handlebars', function(template) {
            rampMessageData = findClosestGarage();
                
            jqueryNoConflict('#rampMessage').html(template(rampMessageData));
        })
    };

    // render current ramp conditions
    function renderCurrentRampConditions(){
        getTemplateAjax('./templates/currentRampConditions.handlebars', function(template) {
            rampMessageData = findClosestGarage()
            jqueryNoConflict('#rampMessage').html(template(rampMessageData));
        })
    };