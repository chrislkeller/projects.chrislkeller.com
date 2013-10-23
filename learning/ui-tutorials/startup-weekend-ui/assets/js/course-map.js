    //global variables
    var tableid = 3509203;
    var tipsid = 3510141;
    var layer;
    var zoom = 20;
    var latlng = new google.maps.LatLng(43.034979,-89.502284);
	var image = 'images/location.png';
	var geocoder = new google.maps.Geocoder();
	var map;
	var marker;
	var infowindow;
	var infoWindowContent = '';

    //begin map function
    function initialize() {

    var myOptions = {
        zoom: 20,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        scrollwheel: false,
        draggable: true,
        mapTypeControl: false,
        navigationControl: true,
        streetViewControl: false,
        panControl: false,
        scaleControl: true,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_TOP
        }
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	}
	//end map function