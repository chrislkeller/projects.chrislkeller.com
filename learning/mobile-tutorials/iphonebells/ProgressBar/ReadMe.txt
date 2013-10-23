File: ReadMe.txt

Abstract: ReadMe file for the ProgressBar sample.    
 
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


"ProgressBar" demonstrates how to build a progress bar using the HTML canvas. It displays a progress bar and percentage number while some images are loading. 
This sample contains the "index.html," "ProgressBar.js," and "ProgressBar.css" files. The "index.html" file defines the webpage appearance and content; the "ProgressBar.js" file sequentially loads six images and builds and updates a progress bar and percentage number; the "ProgressBar.css" file styles the webpage and illustrates how to overlay the progress bar and percentage number on top of the images. 

The "index.html" file builds four div elements: "canvasBackground," "percentage," "images," and "message." The "canvasBackground" div is a placeholder for a canvas and "percentage" div. The canvas is used to draw and update a progress bar; the "percentage" div contains a percentage number. The "images" div is a placeholder for the six images. The "message" div shows a descriptive message once all images are displayed on the webpage.


Building The Progress Bar
The "drawProgressBar" function in "ProgressBar.js" was used to draw a progress bar. It accesses the canvas's rendering context, then uses the context's beginPath, lineTo, quadraticCurve, and stroke functions to draw an empty rounded rectangle. We set the color of the progress bar by setting its context's strokeStyle method to white.


Updating The Progress Bar 
The "addBars" function in "ProgressBar.js" shows how to refresh the progress bar and percentage number. The progress bar is 190 pixels wide; we fill it with five pixels of white when the page initially loads. The remaining 185 pixels are equally divided into six(number of images being retrieved) segments that are progressively added to the progress bar using the context's fillRect function.


Updating The Percentage Number
Use the "percentage" function in "ProgressBar.js" to update a percentage number. The percentage number specifies the percent of images that were successfully loaded. Divides the number of loaded images by the total number of images, multiply the result by 100, rounds it, and appends it to the "percentage" div.


Overlaying HTML Elements
Use the z-index property to overlay the progress bar and percentage number on top of the images. Elements with higher z-index are stacked in front of the ones with lower z-index. The "ProgressBar.css" file sets the z-index of "images" to one. The "canvasBackground" div gets a z-index of two, thus placing it in front of "images". We place the percentage number on top of the progress bar by setting the z-index of "percentage" to three. 


Using the Sample
Open index.html in Safari 3 on either Mac or PC. If you have your own webserver (e.g. Mac OS X Personal Web Server) and an iPhone or iPod touch, you can also place these files on your server and browse them using your iPhone.


Feedback and Bug Reports
Please send all feedback about this sample by using the Feedback form on the bottom of the sample's webpage.
Please submit any bug reports about this sample to the Bug Reporting <http://developer.apple.com/bugreporter> page.
 