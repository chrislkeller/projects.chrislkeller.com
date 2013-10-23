// General settings
var noOfLhsBoxes = 6;
var currentTab = 0;
var currentNavItem = '';

// Set cookie
function setCookie(name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    document.cookie = curCookie;
    }

// Get cookie
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
            } else
            begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1)
            end = dc.length;
    return unescape(dc.substring(begin + prefix.length, end));
    }

// Delete cookie
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    }
// Animate the div
function lhsAnimate(id,height) {
	var attributes = {   
		height: { to: height } 
		};   
	var anim = new YAHOO.util.Anim(id, attributes, 0.2); 
	anim.animate();  
	}
	
function lhsAction(id,animate,page) {
    //alert('id='+id+' animate='+animate);
    // get the height of the DIV & remove px from height
    id = parseInt(id);
	idHeight = document.getElementById('lhsExpander'+id).style.height;
	idHeight = idHeight.replace(/px/,"");
	if (idHeight > 1) {
		// Change header and footer image
		document.getElementById('lhsHeader'+id).className = 'leftBoxHeading_Off';
		document.getElementById('lhsFooter'+id).className = 'leftBoxFooter_Off';
		// Set cookie value
		setCookie("lhsBox"+id, 'false');
		// Resize
		if (animate == true) {
		    lhsAnimate('lhsExpander'+id,0);
		    } else {
		    document.getElementById('lhsExpander'+id).style.height = '0px';
		    }
		} else {
		// Change header and footer image
		document.getElementById('lhsHeader'+id).className = 'leftBoxHeading_On';
		document.getElementById('lhsFooter'+id).className = 'leftBoxFooter_On';
		// Set cookie value
		setCookie("lhsBox"+id, 'true');		
		// Get the height of the inner DIV
		innerDivHeight = document.getElementById('lhsInner'+id).offsetHeight;
		// Resize - -1 corrects issue with Safari(mac)
		if (animate == true) {
		    lhsAnimate('lhsExpander'+id,innerDivHeight-1);
		    } else {
		    document.getElementById('lhsExpander'+id).style.height = innerDivHeight-1+'px';
		    }		    
		// Show first tab in content area if the tab selected isn't already open
		if (id != currentTab && page != 'false') {
		    // Open tab
		    rhsContent(page);
		    // Set the current tab to the ID of the menu item clicked
		    currentTab = id;
	    }
	}
}
	
	
// Check the status of left buttons onload.
function onLoadBoxStatus() {
    boxCount = 1;
    while (boxCount <= noOfLhsBoxes) {
        // If the box is meant to be open, then close it
        if (getCookie('lhsBox'+boxCount) == 'true') {
            // alert("open = lhsBox"+boxCount);
            // Open box without animation
            lhsAction(boxCount,false,'false');
            }
        boxCount++;
        }
    }
    
