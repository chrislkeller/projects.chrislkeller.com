/*
    File: photos.js
    
    Abstract: JavaScript file for the CSS_Transforms_Transitions_and_Web_Fonts sample.
    
    Version: 1.0
    
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

function stackPhotos() {
  /* set up our photo array and the initial rotation */
  var myPhotos = new Array("IMG_0028.jpg", "IMG_0072.jpg", "IMG_0449.jpg", "IMG_0085.jpg", "IMG_0106.jpg",
                           "IMG_0167.jpg", "IMG_0288.jpg", "IMG_0298.jpg", "IMG_0262.jpg", "IMG_0306.jpg",
                           "IMG_0314.jpg", "IMG_0316.jpg", "IMG_0322.jpg", "IMG_0402.jpg", "IMG_0284.jpg",
                           "IMG_0403.jpg", "IMG_0434_2.jpg", "IMG_0438.jpg");
  var size = myPhotos.length;
  var rotation = -30;

  /* add our photos to the document dynamically, incrementing the rotation on the -webkit-transform property as we go */
  body = document.getElementById("main");
  for (i=0; i < size; i++) {
    photo = document.createElement("img");
    var transform = "-webkit-transform:rotate(" + rotation + "deg) scale(1.4)"
    photo.setAttribute("style", transform);
    photo.setAttribute("src", "images/" + myPhotos[i]);
    photo.setAttribute("onclick", "twirlAway(this)");
    
    body.appendChild(photo);
    
    /* reset the rotation once we get to 30 degrees, so that none of our photos are upside-down */
    if (rotation <= 30) {
      rotation += 5;
    }
    else {
      rotation = -30;
    }
  }
}

/* Change the value of CSS properties -webkit-transform, top, and right to animate/transform the photo to the
   upper right corner. Setting these 3 properties as the value of the -webkit-transform-property property (see
   main.css) takes care of the animation/transition between the initial CSS value and the final CSS value. */
function twirlAway(photo) {
  photo.style.webkitTransform = 'rotate(360deg) scale(0.8)';
  photo.style.top = 5;
  photo.style.right = 5;
}