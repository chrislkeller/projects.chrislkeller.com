/*

File: FaderMain.js

Abstract: Support code for Fader example widget; kept separate from Fader logic
	"flipper" uses the AppleInfoButton class from 10.4.3
	"transFader" is a TransitionFader that performs the neon sign effect

Version: 2.0

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

Copyright (C) 2005-2007 Apple Inc. All Rights Reserved.

*/

var flipper;
var transFader;

var glassButton;

if (window.widget) {
	widget.onhide = onHide;
	widget.onshow = onShow;
}

function loaded() {
	flipper = new AppleInfoButton(document.getElementById("flipper"), document.getElementById("front"), "white", "white", showBack);
	glassButton = new AppleGlassButton(document.getElementById("doneButton"), "Done", showFront);

	var fades = new Array;
	fades[0] = document.getElementById("eat");
	fades[1] = document.getElementById("at");
	fades[2] = document.getElementById("joes");
	transFader = new TransitionFader(fades, 250, 1000);
	transFader.start();
}


function onHide () {
	transFader.pause();
}

function onShow() {
	transFader.resume();
}


// Prefs let us set fade time, pause between transitions
function showBack(event) {
	if (window.widget) {
		widget.prepareForTransition("ToBack");
	}
	transFader.pause();
	document.getElementById("front").style.display = "none";
	document.getElementById("back").style.display = "block";
	document.getElementById("speedField").value = transFader.getFadeTime();
	document.getElementById("delayField").value = transFader.delay;

	
	if (window.widget) {
		setTimeout("widget.performTransition()", 0);
	}
}	

function showFront(event) {
	if (window.widget) {
		widget.prepareForTransition("ToFront");
	}

	document.getElementById("back").style.display = "none";
	transFader.setFadeTime(document.getElementById("speedField").value);
	transFader.delay = document.getElementById("delayField").value;
	document.getElementById("front").style.display = "block";
	transFader.resume();

	if (window.widget) {
		setTimeout("widget.performTransition()", 0);
	}
}