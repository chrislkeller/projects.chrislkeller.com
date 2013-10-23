/*

File: Slider.js

Abstract: Provides the "slide" functionality to the SlideMe application.
          Moves an object within a given range. Implements handlers that 
          allows the application to respond to touch events. Calls the 
          magnifyText, changeImage, and fillSliderBar functions, implemented
          in the SlideMe.js file, to respectively increase or decrease the font size of the
          "iPhone" string, change the color of the knob, and fill the slider's bar
          with a color.
          
          
Version: <1.0>


Disclaimer: IMPORTANT:  This Apple software is supplied to you by 
Apple Inc. ("Apple") in consideration of your agreement to the
following terms, and your use, installation, modification or
redistribution of this Apple software constitutes acceptance of these
terms.  If you do not agree with these terms, please do not use,
install, modify or redistribute this Apple software.

In consideration of your agreement to abide by the following terms, and
subject to these terms, Apple grants you a personal, non-exclusive
license, under Apple's copyrights in this original Apple software (the
"Apple Software"), to use, reproduce, modify and redistribute the Apple
Software, with or without modifications, in source and/or binary forms;
provided that if you redistribute the Apple Software in its entirety and
without modifications, you must retain this notice and the following
text and disclaimers in all such redistributions of the Apple Software. 
Neither the name, trademarks, service marks or logos of Apple Inc. 
may be used to endorse or promote products derived from the Apple
Software without specific prior written permission from Apple.  Except
as expressly stated in this notice, no other rights or licenses, express
or implied, are granted by Apple herein, including but not limited to
any patent rights that may be infringed by your derivative works or by
other works in which the Apple Software may be incorporated.

The Apple Software is provided by Apple on an "AS IS" basis.  APPLE
MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS
FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND
OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS.

IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL
OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION,
MODIFICATION AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED
AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE),
STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

Copyright (C) 2008 Apple Inc. All Rights Reserved.

*/

/* Keep track of multi-touch sequences */
var trackedObjectCount = 0;

/*
    Moves an object within a range. Takes the knob, lowPosition, and highPosition parameters that
    are respectively the object to be moved,the lowest value of the range, and the highest value 
    of the range. Both lowPosition, and highPosition follow the "x, y" format where x and y are the 
    values along the x and y axis, respectively. 
    The object will uniquely slide in the horizontal direction if the y coordinate of both 
    lowPosition, and highPosition is set to 0, in the vertical direction if the x coordinate of 
    both lowPosition and highPosition is set to 0, and in both directions, otherwise.
*/
function Slider(knob, lowPosition, highPosition)
{
    this.knob = knob;
    
    /* Split the lowest position into its x and y components  */
    var components = lowPosition.split(",");
    this.lowPositionOnXAxis = components[0];
    this.lowPositionOnYAxis = components[1];
    
    /* Split the highest position into its x and y components  */
    components = highPosition.split(",");
    this.highPositionOnXAxis = components[0];
    this.highPositionOnYAxis = components[1];
    
    /* Both of these values represent the position of the knob along the x and y axis. Set them to 0, initially. */
    this.positionOnXAxis = 0;
    this.positionOnYAxis = 0;
    
    /* Register for the touchstart event */
    this.knob.addEventListener("touchstart", this, false);
    
    /* These two callback functions are not required for sliding the knob along the bar */
    /* Callback for changing the font size of "iPhone" and filling the slider bar */
    this.magnifyAndFill = function (value) {
         magnifyText(value);
         fillSliderBar(value);
    };
    
    /* Callback for changing the color of the knob */
    this.changeImageCall = function(value){ 
         changeImage(value);
    };
}


/*
   Allows us to register this Slider object as an event handler for 
   the touchstart, touchmove, and touchend events. Calls onTouchStart
   if touchstart is received, onTouchMove if touchmove is received, and
   onTouchEnd if touchend is received. 
*/
Slider.prototype.handleEvent = function (event)
{
    switch(event.type)
    {
        case "touchstart" :
          this.onTouchStart(event);
          break;
        case "touchmove" :
          this.onTouchMove(event);
          break;
        case "touchend" :
          this.onTouchEnd(event);
          break;
    }
}


/*
     Updates the current position of the knob. Use the translate function to move the knob 
     to a new position. Calls magnifyAndFill to increase or decrease the font size of "iPhone" 
     and fill the slider's bar.
*/
Slider.prototype.moveTo = function(newPositionOnXAxis, newPositionOnYAxis)
{
    /* Update the values of the knob along the x and y axis, call the getComponent function to make
       sure that these values are within the given lowest and highest positions */
    this.positionOnXAxis = getComponent(this.lowPositionOnXAxis, this.highPositionOnXAxis, parseInt(newPositionOnXAxis));
    this.positionOnYAxis = getComponent(this.lowPositionOnYAxis, this.highPositionOnYAxis, parseInt(newPositionOnYAxis));
    
    /* Use the translate function to move the knob */
   this.knob.style.webkitTransform = "translate(" + this.positionOnXAxis + "px, " + this.positionOnYAxis + "px)";
    
   this.magnifyAndFill(this.positionOnXAxis);
}


/* 
    Computes the new position(its x and y coordinates) of the knob. Calls moveTo to update its position.
*/
Slider.prototype.positionToTouch = function(aTouch)
{
    /*
        clientX and clientY provide the x and y coordinates of aTouch. They are relative to the 
        window's viewport. touchStartPositionOnXAxis and touchStartPositionOnYAxis represent the x 
        and y coordinates of the last touch. xPositionOffset and yPositionOffset compute the 
        difference between the above values to determine for how long the knob should be moved.
    */
    var xPositionOffset = aTouch.clientX - this.touchStartPositionOnXAxis;
    var yPositionOffset = aTouch.clientY - this.touchStartPositionOnYAxis;
    
    /* Compute the new x and y coordinates */
    var newPositionOnXAxis = this.positionOnXAxis + xPositionOffset;
    var newPositionOnYAxis = this.positionOnYAxis + yPositionOffset;
    
    /* Call moveTo to set the knob to these coordinates */
    this.moveTo(newPositionOnXAxis, newPositionOnYAxis);
    /* Provide references for the next touch event, initial position if knob is 
       moved to the right and final position if knob is moved to the left */
    this.touchStartPositionOnXAxis = aTouch.clientX;
    this.touchStartPositionOnYAxis = aTouch.clientY;
}


/*
    Receives a touch event, updates touchStartPositionOnXAxis and touchStartPositionOnYAxis
    with the coordinates of this event, and calls positionToTouch to update the position of
    the knob. 
*/
Slider.prototype.resetToTouch = function(aTouch)
{
    this.touchStartPositionOnXAxis = aTouch.clientX;
    this.touchStartPositionOnYAxis = aTouch.clientY;
    this.positionToTouch(aTouch);
}


/* Stop listening for touchmove and touchend events */
Slider.prototype.unregisterTouches = function()
{       
   window.removeEventListener("touchmove", this.touchMoveHandler, false);
   window.removeEventListener("touchend", this.touchEndHandler, false);
   trackedObjectCount--;
}


/* Listen for touchmove and touchend events */
Slider.prototype.registerTouches = function()
{           
    window.addEventListener("touchmove", this, false);
    window.addEventListener("touchend", this, false);    
}


/*
    Handles touchstart events. Fetches the initial position of the knob. Declares handlers that
    listens for touchmove and touchend events. Calls changeImageCall to change the color
    of the knob to green.
*/
Slider.prototype.onTouchStart = function(e)
{
    /* Prevent the browser from scrolling */
    e.preventDefault();
    /* Start tracking when the first finger comes down from the knob.
       If targetTouches contains two or more touches and the value of trackedObjectCount
       is greater than 0, then a gesture event has occurred. Stop tracking and return from 
       this handler.
       
       If targetTouches contains a single touch and trackedObjectCount is set to 0, then a 
       touchstart has occurred. Keep on tracking it.
    */
    
    if (e.targetTouches.length != 1 && trackedObjectCount > 0)
    {
        return false;
    }
    
    /* Let's get the x and y coordinates of the related touch  */
    this.touchStartPositionOnXAxis = e.targetTouches[0].clientX; 
    this.touchStartPositionOnYAxis = e.targetTouches[0].clientY;
  
    
    /* Let's register for touchmove and touchend events on the knob */
    this.registerTouches();
    trackedObjectCount++;
    /* Proceed to change the color of the knob to green. This line is not required for moving the knob. */
    this.changeImageCall("start");   
    return false;
}


/*
    Handles touchmove events. Calls changeImageCall and positionToTouch to respectively change the color
    of the knob to yellow and move the knob to its new location.
*/
Slider.prototype.onTouchMove = function(e)
{
    e.preventDefault();
    /* Stop tracking if targetTouches contains multiple touches (this means that a gesture event has occurred)*/
    if (e.targetTouches.length != 1)
    {
        return false;
    }
    /* Move the knob to its new location */
    this.positionToTouch(e.targetTouches[0]);
    /* Proceed to change the color of the knob to yellow. This line is not required for moving the knob. */
    this.changeImageCall("move");
    return false;
}


/*
    Handles touchend events. Calls unregisterTouches to stop listening for touchmove and touchend events on the knob.
    Calls changeImageCall to change the color of the knob to red.
*/
Slider.prototype.onTouchEnd = function(e)
{
    e.preventDefault();
    /* targetTouches should not contain any touches since the user lifted his/her finger from the 
       knob. If it does, move the knob to the location associated with that touch.
    */
    if (e.targetTouches.length > 0)
    {
        this.resetToTouch(e.targetTouches[0]);
        return false;
    }
    
    /* The user lifted his/her finger from the knob, so stop listening for these touch events */
    this.unregisterTouches();
   
   /* Proceed to change the color of the knob to red. This line is not required for moving the knob. */
   this.changeImageCall("end");   
   
    return false;
}


/*
    Ensures that the knob moves within a specified range. Receives low, high, and target parameters. 
    The low and high parameters are the minimum and maximum values of a range, target is a value 
    that must be within the mentioned range. getComponent returns low if the value of target is 
    lower than low, high if its value is greater than high, and target otherwise.
*/
function getComponent(low, high, target)
{
    /* Compare target to low and high */
    if (low > target)
    {
        return low;
    }
    else if ((low <= target) && (target <= high))
    {
        return target;
    }
    else if (target > high)
    {
        return high;
    }
    return 0;
}