/*

File: SlideMe.js

Abstract: Builds a slider bar and calls the JavaScript "Slider" object to 
          allow the application to animate a knob along the bar once the
          "Slide the Knob" page is done loading. Implements the magnifyText, changeImage,
          and fillSliderBar functions that are respectively used to increase or
          decrease the font size of the "iPhone" string, change the color of 
          the knob, and fill the bar with a black color.
          
          
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

/* Horizontal and vertical positions of the slider bar */
var x = 21;
var y = 10;

/* The bar is 200 pixels long, 10 pixels high, and has a corner radius of 4 pixels */
var width = 200; 
var height = 10;
var radius = 4;

/* Keep track of the value that was just used to fill the bar */
var previousValue = 0;


/*
    Builds a linear bar.  
*/
function drawSliderBar()
{
    /* Reference to the canvas's rendering context */
    var context = document.getElementById("canvas").getContext("2d");
    context.beginPath();
    context.moveTo(x, y + radius);

    /* Draws left lower arc */
    context.lineTo(x, y + height - radius);
    context.quadraticCurveTo(x, y + height, x + radius, y + height);
    
    /* Draws right lower arc */
    context.lineTo(x + width - radius, y + height);
    context.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    
    /* Draws right upper arc */
    context.lineTo(x + width, y + radius);
    context.quadraticCurveTo(x + width, y, x + width - radius, y);
    
    /* Draws left upper arc */
    context.lineTo(x + radius, y);
    context.quadraticCurveTo(x, y, x, y + radius);
        
    context.save();
    /* Clip to the rounded rect path */
    context.clip();
    /* Fill the bar with a dark red color */
    context.fillStyle = "darkred";
    context.stroke();
    context.fillRect(x, y, width, height);
}


/*
    Receives a value and fills the bar with black according to this value.
    The received value indicates by how much space the slider's knob has moved to the left or right.
*/
function fillSliderBar(value)
{
    var context = document.getElementById("canvas").getContext("2d");
    /* This allows us to correctly fill the bar when users move the knob to the left */
    context.fillStyle = "darkred";
    context.fillRect(x, y, previousValue, height);
    
    /* Fill the bar with black */
    context.fillStyle = "black";
    context.fillRect(x, y, value, height);
    
    /* Store this value */
    previousValue = value;  
}


/*
    Set the font size of the "iPhone" string according to a received value. The default font size is 10 pixels.
    This method divides the received value by two and adds it to the default size to find the new font size. 
    The font size increases when the knob moves to the right and decreases when the knob moves to the left.
*/
function magnifyText(value)
{
    /* Convert value from string to integer */
    var convert = parseInt(value);
    /* Compute the new font size */
    var size = 10 + (convert/2);
    document.getElementById("text").style.fontSize = size + "px";
}


/*
    Changes the color of the knob according to a received string, which is either "start," "move," or
    "end." Turns the knob green if this string is set to "start," yellow if it is equal to "move," and red
    if it is set to "end." This string indicates whether a touchstart, touchevent, or touchend event has occured. 
*/
function changeImage(value)
{
    if (value == "start" )
    {
       document.getElementById("knob").style.backgroundImage = "url(Images/ballStarted.png)";
    }
    else if(value == "end")
    {
        document.getElementById("knob").style.backgroundImage = "url(Images/ballEnded.png)";
    } 
    else if (value == "move")
    {
        document.getElementById("knob").style.backgroundImage = "url(Images/ballMoved.png)";
    }
}


/*
    Called when "Slide the Knob" is done loading. Respectively calls the drawSliderBar and Slider functions to create 
    a slider and animate it. 
*/
function load()
{
    /* Build the slider bar */
    drawSliderBar();
    /* Create an Slider object, which will allow the knob to move along the slider bar (horizontally) */
    var sliderObj = new Slider(document.getElementById("knob"), "0,0", "184,0");
}


window.addEventListener("load", load, true);