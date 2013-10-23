/*
    label class from Marc Ridley Blog
    http://blog.mridey.com/2009/09/label-overlay-example-for-google-maps.html
*/


// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options) {

    // Initialization
    this.setValues(opt_options);

    // Label specific
    var span = this.span_ = document.createElement('span');
    span.style.cssText = 'position: relative; left: 0%; top: -50px; ' +
        'white-space: nowrap; border: 0px; font-family:arial; font-weight:bold;' +
        'padding: 25 px; color: #ffffff; background-color: #000000; '+
        'font-weight: bold; opacity: .75; '+
        'filter: alpha(opacity=75); '+
        '-ms-filter: "alpha(opacity=75)"; '+
        '-khtml-opacity: .75; '+
        '-moz-opacity: .75;';

	var div = this.div_ = document.createElement('div');
        div.appendChild(span);
        div.style.cssText = 'position: absolute; display: none';
};

Label.prototype = new google.maps.OverlayView;

// Implement onAdd
Label.prototype.onAdd = function() {
    var pane = this.getPanes().overlayLayer;
    pane.appendChild(this.div_);

	
    // Ensures the label is redrawn if the text or position is changed.
    var me = this;
    this.listeners_ = [
        google.maps.event.addListener(this, 'position_changed',
            function() { me.draw(); }),
        google.maps.event.addListener(this, 'text_changed',
            function() { me.draw(); })
	];	
};

// Implement onRemove
Label.prototype.onRemove = function() { this.div_.parentNode.removeChild(this.div_ );
	// Label is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners_.length; i < I; ++i) {
		google.maps.event.removeListener(this.listeners_[i]);
	}
};

// Implement draw
Label.prototype.draw = function() {
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));

	var div = this.div_;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	div.style.display = 'block';

	this.span_.innerHTML = this.get('text').toString();
};