/*

File: Fader.js

Abstract: JavaScript logic for one-off and transitional fades of DOM elements 
	Retasked to use the AppleAnimator class; simpler codebase

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


/*
 *************************************************
 * Fader object fades a single element in or out *
 *************************************************
 */
 
/*
 * Fader constructor.  Parameters:
 * - element: The element to fade in or out
 * - callback: A function that will be called when a fade is complete
 * - fadeTime: How long (in ms) the fade should take (see setFadeTime())
 */
function Fader (element, callback, fadeTime, minOpacity, maxOpacity) {
	this.element = element;
	
	this.onFinished = callback;
	
	// Initialize for a fade-in; these values will be reset by the fadeIn/fadeOut functions
	this.fadingIn;
	this.now = 0.0;
	this.from = 0.0;
	this.to = 1.0;
		
	this.minOpacity = minOpacity ? minOpacity : 0;
	this.maxOpacity = maxOpacity ? maxOpacity : 1;
	
	this.setFadeTime(fadeTime);
	
	var self = this;
	
	this.nextFrame = function (animation, now, first, done) {
		self.element.style.opacity = now;
	}
}

/* 
 * Prototype method declarations; call these methods as 
 * nameOfFaderInstance.methodName();
 */
Fader.prototype.fadeOut = function () {
	if (this.fadingIn == false) {
		return;
	}
	var from = this.maxOpacity;
	if (this.element.style.opacity) {
		from = parseInt(this.element.style.opacity);
	}
	this.fadeTo(from, this.minOpacity);
	this.fadingIn = false;
}

Fader.prototype.fadeIn = function () {
	if (this.fadingIn == true) {
		return;
	}
	var from = this.minOpacity;
	if (this.element.style.opacity) {
		from = parseInt(this.element.style.opacity);
	}
	this.fadeTo(from, this.maxOpacity);
	this.fadingIn = true;
}

Fader.prototype.fadeTo = function (newFrom, newTo) {
	if (this.fadeAnimator) {
		this.fadeAnimator.stop();
		delete this.fadeAnimator;
	}
	
	this.fadeAnimator = new AppleAnimator(this.fadeTime, 13, newFrom, newTo, this.nextFrame);
	this.fadeAnimator.oncomplete = this.onFinished;
	this.fadeAnimator.start();
}

/*
 * Setter function for fade duration (floored at 250ms)
 */
Fader.prototype.setFadeTime  = function (fadeTime) {
	this.fadeTime = fadeTime > 250 ? fadeTime : 250;
}

// End Fader object definition



/*
 **********************************************************************
 * TransitionFader object fades between 2 of x number of DOM elements *
 **********************************************************************
 */
 
/*
 * TransitionFader constructor.  Parameters:
 * - elements: Should be an array; use Fader object to fade a single element in/out
 * - fadeTime: How long (in ms) the fades should take
 * - inDelay: Pause (in ms) between transition fades (see setFadeDelay())
 *
 * As with Fader, all the methods should be called through an instance variable
 */
function TransitionFader (elements, fadeTime, inDelay) {
	// Create two fader objects: incoming and outgoing
	// Set prepNextFade as a callback for one of the faders, so we can cycle
	// through the elements array as a fade completes
	
	var self = this;

	// Manages which two elements to transition between
	this.prepNextFade = function() {
		if (self.outFader.element) {
			self.outFader.element.style.opacity = 0;
		}
			
		// Select a new element to be faded in.
		self.currentIndex = (self.currentIndex + 1) % self.elements.length;
		self.outFader = new Fader(self.inFader.element, null, self.inFader.fadeTime);
		self.inFader = new Fader(self.elements[self.currentIndex], self.prepNextFade, self.inFader.fadeTime);
		// Queue up the next transition using the delay property
		window.setTimeout(function() { self.fade(); }, self.delay);
	}	
	
	this.inFader = new Fader(elements[0], this.prepNextFade, fadeTime);
	this.outFader = new Fader(null, null, fadeTime);
	
	// All the elements we wish to transition between
	// We do two at a time (one in / one out), but we can move through 
	// an array of any size (see prepNextFade()).
	this.elements = elements;
	this.currentIndex = 0;
	this.setFadeDelay(inDelay);
}

TransitionFader.prototype.start = function () {
	this.inFader.fadeIn();
}

/*
 * Do the fades
 *
 * We check the paused flag in case the delayed call from prepNextFade was
 * already in place before paused was set to true: if so, we postpone the fade
 * and set the interrupted flag (see resume())
 */
TransitionFader.prototype.fade = function () {
	if (this.paused) {
		this.interrupted = true;
		return;
	}
	this.inFader.fadeIn();
	this.outFader.fadeOut();
}

TransitionFader.prototype.getFadeTime = function () {
	return this.inFader.fadeTime;
}

TransitionFader.prototype.setFadeTime = function (newFadeTime) {
	this.inFader.setFadeTime(newFadeTime);
	this.outFader.setFadeTime(newFadeTime);
}

/*
 * Setter for the delay between fades (floored at 500ms)
 */
TransitionFader.prototype.setFadeDelay = function (inDelay) {
	this.delay = inDelay > 500 ? inDelay : 500;
}

/*
 *	Set the paused flag, so the transition timer stops the next time it is hit
 */
TransitionFader.prototype.pause = function () {
	this.paused = true;
}

/*
 * If we are in the middle of a fade, setting paused to false will allow
 * the timers to continue as usual; iff a fade was postponed, we need to 
 * explicitly kick things off again
 */
TransitionFader.prototype.resume = function () {
	this.paused = false;
	if (this.interrupted) {
		this.interrupted = false;
		this.fade();
	}
}