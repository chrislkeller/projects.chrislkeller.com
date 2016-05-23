/////////
// Things you need in place to use this:
//  - have loaded jquery
//  - have   <div id="address_module"></div>   where you want your address box
//  - call   addressBoxSetup();   in your $(document).ready(function(){...});
//
/////////


// Inserts the required form and go button onto the page in a self-contained table.
// Place it on the page using:  <div id='address_module'></div>
function insertAddressBox() { 

	$('#address_module').html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td id=\"zoombox\">Zoom to <input class=\"input\" id=\"address\" type=\"textbox\" style=\"width:100px;\" value=\"City or zip\" onkeydown=\"if (event.keyCode == 13) document.getElementById('geoButton').click()\"/></td><td><input class=\"button\" type=\"button\" id=\"geoButton\" value=\"GO\" onclick=\"codeAddress()\"> </td></tr> </table>");
	
	}

// This function keeps an eye on the geocode address box,
// removing the helpertext if it's being used;
// replacing it when it's not.

function addressBoxHelptext() {
	
	// Watch the input box and clear it when highlighted
	$('#address').focus(function(){
	 if(this.value==='City or zip')
	 {
	 this.value='';
	 }
	});

	// if input box unhighlighted and empty, put back helper text
	$('#address').blur(function(){
	 if(this.value==='')
	 {
	 this.value='City or zip';
	 }
	});
	
}

// This function takes address found in the "address" form box and
// geocodes it. Then recenters & zooms the map and drops a marker 
// onto the geocoded location
// No value expected, though assumes form has id='address'.
function codeAddress() {
  var address = document.getElementById("address").value;
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
			map.setZoom(8);
			marker = new google.maps.Marker({
        map:map,
        draggable:false,
        animation: google.maps.Animation.DROP,
        position: results[0].geometry.location
      });
    } else {
      alert("Couldn't relocate for the following reason: " + status);
    }
  });
}

// This function gets called by $(document).ready(function(){ ... });
// to set up the box
function addressBoxSetup() {
	
	// first put the addressbox on the page
	insertAddressBox();
	
	// then set up the helpertext in it
	addressBoxHelptext();

}