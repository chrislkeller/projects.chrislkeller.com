/*
    javascript ruler for google maps V3 by Giulio Pons
    http://www.barattalo.it/2009/12/19/ruler-for-google-maps-v3-to-measure-distance-on-map/
*/


function addruler(lat1, lon1, lat2, lon2) {

/*
var teePosition = new google.maps.LatLng(43.034942,-89.502696);
var midPosition = new google.maps.LatLng(43.035002,-89.50228);
var holePosition = new google.maps.LatLng(43.035034,-89.501778);

*/
    var position1 = new google.maps.LatLng(lat1 ,lon1);
    var position2 = new google.maps.LatLng(lat2, lon2);

	var ruler1 = new google.maps.Marker({
		position: position1,
		map: map,
		draggable: true
	});

	var ruler2 = new google.maps.Marker({
		position: position2,
		map: map,
		draggable: true
	});

    var ruler1label = new Label({ map: map });
    var ruler2label = new Label({ map: map });
    ruler1label.bindTo('position', ruler1, 'position');
    ruler2label.bindTo('position', ruler2, 'position');

	var rulerpoly = new google.maps.Polyline({
		path: [ruler1.position, ruler2.position] ,
		strokeColor: "#ff5100",
		strokeOpacity: .7,
		strokeWeight: 6
	});
	rulerpoly.setMap(map);

	/*
    centerLat = (position1.lat() + position2.lat()) / 2;
	centerLng = (position1.lng() + position2.lng()) / 2;
	var latlng = new google.maps.LatLng(centerLat,centerLng);

    map.setCenter(latlng);
	*/


	ruler1label.set('text', 'me');
    //distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
	ruler2label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));


	
	google.maps.event.addListener(ruler1, 'drag', function() {
		rulerpoly.setPath([ruler1.getPosition(), ruler2.getPosition()]);
		//ruler1label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
		ruler2label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
	});
    

	google.maps.event.addListener(ruler2, 'drag', function() {
		rulerpoly.setPath([ruler1.getPosition(), ruler2.getPosition()]);
		//ruler1label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
		ruler2label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
	});

}


function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180; 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	if (d>1) return Math.round(d)+"km";
	else if (d<=1) return Math.round(d*1000/1.1)+"yds";
	return d;
}
