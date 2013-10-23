 /*
 
 File: ProgressBar.js
 
 Abstract: Defines JavaScript functionality for the ProgressBar sample.
		   Sequentially loads a set of images. Uses the HTML canvas element
           to draw and update a progress bar while the images are loading.

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


/* progress bar's horizontal and vertical positions */
var x = 50;
var y = 90;

/* Images'format */
var imageFormat = ".png";

/* The progress bar is 190 pixels long, 20 pixels high, and has a corner radius of 12 pixels */
var width = 190; 
var height = 20;
var radius = 12;

/* Reference to the images div and canvas's rendering context */
var imagesDiv, context;

/* imageLoaded indicates how many images were loaded, imageIndex is an image's index,
   and timeout holds the id returned by a previous call to the setTimeout function. */
var imageLoaded =imageIndex =timeout =0;

/* Contains all the images to be loaded */
var images = new Array("ipodshuffle", "ipodnano", "ipodtouch", "macbookair", "macmini", "imac");


/*
	Draws a progress bar with rounded corners. 
*/
function drawProgressBar()
{
	context.strokeStyle = 'white';
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
	context.stroke();
	
	/* Adds five pixels of white */
	addBars();
}

/*
	Generates all images on the index.html page. All images are created
    and added one at the time . It organizes all six images into
    two rows of three images. 
*/
function loadAllImages()
{
	/* Creates an image object */
    var newImage = document.createElement("img");
    /* Calls the complete function once this image is done loading */
	newImage.onload = complete;

    /* Sets this picture's URL. All pictures are in the images directory. */
	newImage.setAttribute("src", "images/"+images[imageIndex]+imageFormat);
	
    newImage.name = images[imageIndex];

	/* Attach a link to each image using its name */
 	newImage.addEventListener("click", function() { window.open("http://www.apple.com/"+this.name); }, false);
	
    /* Adds the picture to the page */
	imagesDiv.appendChild(newImage);
	
	/* This sample displays six images organized into two rows of three images. 
	    Uses the <br> tag to insert an empty line after adding the third image on the page. */
	if(imageIndex==2)
	{
		imagesDiv.appendChild(document.createElement("br"));
	}
}

/*
	Adds bars to the progress bar. Calls the percentage function to update the percentage number
	on the progress bar. Calls the hideProgressBar function to remove the progress bar when all
	images are successfully loaded. 
*/
function addBars()
{
	/* The progress bar is made of six equal parts that are progressively added. Each part's width
       is equal to the progress bar's width divided by the total number of images. */
    var bar = Math.round(width/images.length);

    /* Fills the progress bar with five pixels of white  if no images have been loaded yet.  
       Fills the progress bar with  5 + (bar*imageLoaded) pixels of white if a certain number of images
       have been loaded, imageLoaded represents that number. */
	var segmentWidth = (imageLoaded==0)?5: 5+(bar*imageLoaded);

	/* Progress bar's fill color */
	context.fillStyle = 'white';

    /* Fill the progress bar */
	context.fillRect(x, y, segmentWidth, height);

    /* Updates the percentage number */
    percentage();
    /* Removes the progress bar, all images were successfully added */
	if (imageLoaded == images.length)
	{
		/* Gracefully hides or removes the progress bar */
		setTimeout('hideProgressBar();',500);
	}
}

 /* 
    Indicates how many images were added to the page. Divides the number of loaded images
    by the total number of images, multiply the result by 100, and rounds it. 
 */
function percentage()
{
	document.getElementById("percentage").innerHTML = Math.round((imageLoaded *100)/images.length) +" %";
}

/*
	This method is called when an image is done loading. It updates the number of loaded images, 
    increments imageIndex, and calls the addBars and loadAllImages to respectively update the progress
	bar and continue loading images.
*/
function complete()
{
	/* Increments imageLoaded, an image was successfully downloaded */
    imageLoaded++;

	/* Adds a bar to the progress bar */
	addBars();

    /*
      Increments imageIndex so the next image can be loaded. Continue loading images
      if imageIndex is less than the number of pictures. */
	if (++imageIndex < images.length)
	{
		loadAllImages();
	}
}

/*
	This method is called when the index.html page is loaded. It calls the drawProgressBar
    and loadAllImages functions to respectively show a progress bar and display some images.
*/
function load()
{
	/* The index.html is done loading, so we can get references to the images div and 
       canvas's rendering context. You will get undefined values if you attempt to access
       the images div and canvas's context before the page is done loading. */
    imagesDiv = document.getElementById("images");
    context = document.getElementById("canvas").getContext("2d");

    /* Shows a progress bar */
	drawProgressBar();
	/* Attempts to sequentially display all pictures */
	loadAllImages();
}

/*
	Removes the progress bar and shows a descriptive message
*/
function hideProgressBar()
{
	document.getElementById("canvasBackground").style.display = "none";
	document.getElementById("message").innerHTML = "Click on any product to go to its page. ";
}