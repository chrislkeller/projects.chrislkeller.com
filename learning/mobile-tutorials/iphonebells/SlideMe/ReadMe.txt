Overview
"Slider" demonstrates how to use iPhone multi-touch events and CSS transform properties to animate a knob along a slider bar. This sample displays a red knob, horizontal bar slider, and "iPhone" string. The knob turns green when you press it, yellow when you move it along the bar, and red when you lift your finger from it. The knob controls the appearance of both the bar and string. Part of the bar turns to black when you slide the knob. The font size of "iPhone" increases when you drag the knob to the right and decreases when you drag it to the left.

This sample contains the "index.html," "Slider.css," "Slider.js," and "SlideMe.js" files. The "index.html" file defines the appearance and content of the "Slide the Knob" page, it builds the knob, string, and a placeholder for a canvas that is used to draw the bar. The "Slider.css" file styles "Slide the Knob." The "Slider.js" file defines "Slider," a custom JavaScript object, which allows an object to move within a given range. The "SlideMe.js" file provides functionalities for drawing the bar and adjusting its color, magnifying "iPhone," and changing the color of the knob. "SlideMe.js" uses the "Slider" object to make the knob move along the bar.

Note: This ReadMe file will mainly discusses "Slider.js," since it shows how to use iPhone multi-touch events and CSS transform properties.



About "Slider.js"
"Slider.js" creates a custom JavaScript object "Slider" to animate the knob within a range. This object takes three parameters, which are element, lowPosition, and highPosition; element is the object to be moved (knob in this sample); lowPosition and highPosition are the lowest and highest values of the range. Users might move the knob along the bar, beyond the bar, above or below it. So, using a range allows us to restrict the movement of the knob along the bar. 

"Slider" defines the positionOnXAxis, positionOnYAxis, touchStartPositionOnXAxis, and touchStartPositionOnYAxis variables.  positionOnXAxis and positionOnYAxis keep track of the current location of the knob along the x and y axis, respectively. touchStartPositionOnXAxis and touchStartPositionOnYAxis keep track of the position of the previous touch event along the x and y axis, respectively.

"SlideMe.js" declares the "changeImage," "magnifyAndFill," and "fillSliderBar" functions to respectively to change the color of the knob, adjust the font size of "iPhone," and fill the bar. "Slider" defines the "changeImageCall" and  "magnifyAndFill" callback functions. The "changeImageCall" function calls the "changeImage" function whereas "magnifyAndFill" calls the "changeImage" and  "magnifyAndFill" functions. Note that "changeImage," "magnifyAndFill," and "fillSliderBar" are not required to animate the knob. 

"SlideMe.js" uses the following lines to create an instance of "Slider," which allows the knob to move horizontally along the bar: 
var sliderObj = new Slider(document.getElementById("knob"), "0,0", "184,0");




Animating the Knob 
"Slider" animates the knob by registering and implementing handlers for touchstart, touchmove, and touchend events and using the "positionToTouch" and "moveTo" functions to respectively compute its new position and move it to this position. In this sample, a touchstart event will be sent when your finger touches the knob, touchmove when your finger displaces it, and touchend when your finger is lifted from the knob. 



Registering for handlers 
The onTouchStart, onTouchMove, and onTouchEnd handlers are respectively used to respond to touchstart, touchmove, and touchend events. 
"Slider" uses the DOM handleEvent method to register itself as an event handler. This method calls these handlers appropriately. For instance, handleEvent calls onTouchEnd when the "Slider" object receives a touchend event. 
"Slider" defines the "registerTouches" and "unregisterTouches" functions, which respectively adds and removes onTouchMove and onTouchEnd. 



About the Handlers
In this sample, onTouchStart and onTouchMove use the JavaScript preventDefault function to disable scrolling on the knob. All three handlers check the length of the targetTouches array to ensure that this sample only handles touch events. targetTouches is an array of touch objects, which contain several objects if a gesture event is sent and only one object if a touch event is sent. onTouchStart and onTouchMove stop responding to multi-touch events and return a false statement when targetTouches contains more than one object.
onTouchEnd calls the "resetToTouch" function to reset the values of touchStartPositionOnXAxis and touchStartPositionOnYAxis and update the position of the knob when targetTouches is not empty. 



Handling touchstart events
onTouchStart is called when your finger taps the knob. It uses the clientX and clientY properties to fetch the coordinates of touchstart and then update  touchStartPositionOnXAxis and touchStartPositionOnYAxis with these coordinates. onTouchStart calls the "registerTouches" function if onTouchMove and onTouchEnd are not already registered on the knob. It calls "changeImageCall" to turn the color of the knob to green. 



Handling touchmove events
onTouchMove is called when your finger drags the knob. It calls "positionToTouch" and "changeImageCall" to respectively drag the knob to the location given by this touch and change the color of the knob to yellow.



Handling touchend events
onTouchEnd is called when you lifted your finger from the knob. It calls "unregisterTouches" and "changeImageCall" to stop listening for touch events on the knob and turn it to red, respectively. 


Computing a New Position for the Knob
"positionToTouch" defines the xPositionOffset and yPositionOffset variables, which respectively determine for how long the knob should be moved from its current position along the x and y axis. It also declares the newPositionOnXAxis and newPositionOnYAxis variables that compute the new x and y coordinates of the knob. 

"positionToTouch" updates xPositionOffset and yPositionOffset after receiving a given touch event. It uses ClientX, ClientY, touchStartPositionOnXAxis, and touchStartPositionOnYAxis to find the displacement between this touch and the previous touch along the x and y axis, then provides xPositionOffset and yPositionOffset with the result. "positionToTouch" fetches the current x and y coordinates of the knob, then respectively adds them to xPositionOffset and yPositionOffset, and finally updates newPositionOnXAxis and newPositionOnYAxis with the result. See below for code that shows how to perform these operations:

// Determine displacement between this touch and the previous touch 
xPositionOffset = aTouch.clientX - this.touchStartPositionOnXAxis;

yPositionOffset = aTouch.clientY - this.touchStartPositionOnYAxis;


// Compute new x and y coordinates of the knob
newPositionOnXAxis = this.positionOnXAxis + xPositionOffset;

newPositionOnYAxis = this.positionOnYAxis + yPositionOffset;


"positionToTouch" calls moveTo to set the knob to these new coordinates, then set touchStartPositionOnXAxis, and touchStartPositionOnYAxis to the x and y positions of the received touch event. This allows us to keep track of the location of the previous touch event. 


Changing the Position of the Knob
"moveTo" calls the "getComponent" function upon receiving new x and y coordinates for the knob. This function checks whether the received coordinates are within the range specified by lowPosition and highPosition.
"moveTo" sets positionOnXAxis and positionOnYAxis to these values if they are within the range and. It changes the position of the knob by using the CSS -webkit-transform translate property to drag the knob to the x and y coordinates given by positionOnXAxis and positionOnYAxis.

"moveTo" calls "magnifyAndFill" to adjust the font size of "iPhone" and appearance of the slider's bar, respectively. 


Using the Sample
Drag index.html into iPhone Simulator with iPhone OS 2.0 (/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications).
If you have your own webserver (eg. Mac OS X Personal Web Server), you can place this sample's files on it, then open index.html in an iPhone or iPod touch running OS 2.0. 
Tap the red knob to turn it green, move it to turn it yellow and magnify the "iPhone" string, and lift your finger to turn it back to red.


Feedback and Bug Reports
Please send all feedback about this sample by using the Feedback form on the bottom of the sample's webpage. Please submit any bug reports about this sample to the Bug Reporting page. 
Copyright (C) 2008 Apple Inc. All Rights Reserved.