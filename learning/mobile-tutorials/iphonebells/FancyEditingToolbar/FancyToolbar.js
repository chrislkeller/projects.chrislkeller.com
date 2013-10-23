/*

File: FancyToolbar.js

Abstract: JavaScript for the FancyToolbar

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

Copyright (C) 2007 Apple Inc. All Rights Reserved.

*/

// Helper function to remove a className
Element.prototype.removeStyleClass = function(className) 
{
    if (this.hasStyleClass(className))
        this.className = this.className.replace(className, "");
}

// Helper function to add a className
Element.prototype.addStyleClass = function(className) 
{
    if (!this.hasStyleClass(className))
        this.className += (this.className.length ? " " + className : className);
}

// Helper function to test if a element has a className
Element.prototype.hasStyleClass = function(className) 
{
    return this.className.indexOf(className) !== -1;
}

// FancyToolbar: constructor function, takes an iframe
function FancyToolbar(iframe)
{
	this.setupNeeded = true;
	this.editArea = iframe;

	// add event listeners to show and hide when the iframe is focused and blurred
	var toolbar = this;
	iframe.contentDocument.defaultView.addEventListener("focus", function(event) { toolbar.show() }, false);
	iframe.contentDocument.defaultView.addEventListener("blur", function(event) { toolbar.hide() }, false);
}

// FancyToolbar: mouse down event handler
FancyToolbar.prototype.toolbarMouseDown = function(event)
{
	this.clickingToolbar = true;
}

// FancyToolbar: mouse up event handler
FancyToolbar.prototype.toolbarMouseUp = function(event)
{
	// refocus the editing area
	this.editArea.contentDocument.defaultView.focus();
	this.clickingToolbar = false;
}

// FancyToolbar: setup and create the DOM elements for the toolbar
FancyToolbar.prototype.setupIfNeeded = function()
{
	if (!this.setupNeeded)
		return;

	delete this.setupNeeded;

	this.toolbarElement = document.createElement("div");

	var toolbar = this;
	this.toolbarElement.addEventListener("mousedown", function(event) { toolbar.toolbarMouseDown(event); }, false);
	this.toolbarElement.addEventListener("mouseup", function(event) { toolbar.toolbarMouseUp(event); }, false);

	var toolbarArea = document.createElement("div");
	toolbarArea.className = "fancy-toolbar-area";

	this.boldButton = document.createElement("button");
	this.boldButton.className = "fancy-toolbar-button fancy-toolbar-button-bold";
	this.boldButton.addEventListener("click", function(event) { toolbar.boldSelection(event); }, false);
	toolbarArea.appendChild(this.boldButton);

	this.underlineButton = document.createElement("button");
	this.underlineButton.className = "fancy-toolbar-button fancy-toolbar-button-underline";
	this.underlineButton.addEventListener("click", function(event) { toolbar.underlineSelection(event); }, false);
	toolbarArea.appendChild(this.underlineButton);

	this.italicButton = document.createElement("button");
	this.italicButton.className = "fancy-toolbar-button fancy-toolbar-button-italic";
	this.italicButton.addEventListener("click", function(event) { toolbar.italicSelection(event); }, false);
	toolbarArea.appendChild(this.italicButton);

	this.textAlignLeftButton = document.createElement("button");
	this.textAlignLeftButton.className = "fancy-toolbar-button-segment fancy-toolbar-button-segment-start fancy-toolbar-button-selected";
	this.textAlignLeftButton.addEventListener("click", function(event) { toolbar.textAlignLeft(event); }, false);
	toolbarArea.appendChild(this.textAlignLeftButton);

	var cap = document.createElement("div");
	cap.className = "fancy-toolbar-button-segment-cap";
	this.textAlignLeftButton.appendChild(cap);

	var middle = document.createElement("div");
	middle.className = "fancy-toolbar-button-segment-middle";
	this.textAlignLeftButton.appendChild(middle);

	var align = document.createElement("div");
	align.className = "fancy-toolbar-button-text-align fancy-toolbar-button-text-align-left";
	middle.appendChild(align);

	var divider = document.createElement("div");
	divider.className = "fancy-toolbar-button-segment-divider";
	this.textAlignLeftButton.appendChild(divider);

	this.textAlignCenterButton = document.createElement("button");
	this.textAlignCenterButton.className = "fancy-toolbar-button-segment";
	this.textAlignCenterButton.addEventListener("click", function(event) { toolbar.textAlignCenter(event); }, false);
	toolbarArea.appendChild(this.textAlignCenterButton);

	middle = document.createElement("div");
	middle.className = "fancy-toolbar-button-segment-middle";
	this.textAlignCenterButton.appendChild(middle);

	align = document.createElement("div");
	align.className = "fancy-toolbar-button-text-align fancy-toolbar-button-text-align-center";
	middle.appendChild(align);

	divider = document.createElement("div");
	divider.className = "fancy-toolbar-button-segment-divider";
	this.textAlignCenterButton.appendChild(divider);

	this.textAlignJustifyButton = document.createElement("button");
	this.textAlignJustifyButton.className = "fancy-toolbar-button-segment";
	this.textAlignJustifyButton.addEventListener("click", function(event) { toolbar.textAlignJustify(event); }, false);
	toolbarArea.appendChild(this.textAlignJustifyButton);

	middle = document.createElement("div");
	middle.className = "fancy-toolbar-button-segment-middle";
	this.textAlignJustifyButton.appendChild(middle);

	align = document.createElement("div");
	align.className = "fancy-toolbar-button-text-align fancy-toolbar-button-text-align-justify";
	middle.appendChild(align);

	divider = document.createElement("div");
	divider.className = "fancy-toolbar-button-segment-divider";
	this.textAlignJustifyButton.appendChild(divider);

	this.textAlignRightButton = document.createElement("button");
	this.textAlignRightButton.className = "fancy-toolbar-button-segment fancy-toolbar-button-segment-end";
	this.textAlignRightButton.addEventListener("click", function(event) { toolbar.textAlignRight(event); }, false);
	toolbarArea.appendChild(this.textAlignRightButton);

	middle = document.createElement("div");
	middle.className = "fancy-toolbar-button-segment-middle";
	this.textAlignRightButton.appendChild(middle);

	align = document.createElement("div");
	align.className = "fancy-toolbar-button-text-align fancy-toolbar-button-text-align-right";
	middle.appendChild(align);

	cap = document.createElement("div");
	cap.className = "fancy-toolbar-button-segment-cap";
	this.textAlignRightButton.appendChild(cap);

	this.linkButton = document.createElement("button");
	this.linkButton.className = "fancy-toolbar-button fancy-toolbar-button-link";
	this.linkButton.addEventListener("click", function(event) { toolbar.linkSelection(event); }, false);
	toolbarArea.appendChild(this.linkButton);

	var img = document.createElement("img");
	this.linkButton.appendChild(img);

	this.imageButton = document.createElement("button");
	this.imageButton.className = "fancy-toolbar-button fancy-toolbar-button-image";
	this.imageButton.addEventListener("click", function(event) { toolbar.insertImage(event); }, false);
	toolbarArea.appendChild(this.imageButton);

	img = document.createElement("img");
	toolbar.imageButton.appendChild(img);

	this.toolbarElement.appendChild(toolbarArea);

	this.toolbarElement.className = "fancy-toolbar-bezel";

	// set the opacity to 0 to start with
	this.toolbarElement.style.opacity = "0";
}

// FancyToolbar: show the toolbar
FancyToolbar.prototype.show = function()
{
	if (this.showing)
		return;

	this.showing = true;

	this.setupIfNeeded();

	// add the toolbar element to the body
	document.body.appendChild(this.toolbarElement);

	// resize the toolbar element to match the iframe
	this.adjustSize();

	// make the zindex 100 to pop the iframe out
	this.editArea.style.zIndex = "100";

	// add the event listeners we need
	this.updateToolbarListener = function(event) { toolbar.updateToolbarButtonStates(toolbar) };
	this.windowResizeListener = function(event) { toolbar.windowResize(event) };
	this.editArea.contentDocument.addEventListener("mouseup", this.updateToolbarListener, false);
	this.editArea.contentDocument.addEventListener("mousemove", this.updateToolbarListener, false);
	this.editArea.contentDocument.addEventListener("keypress", this.updateToolbarListener, false);

	window.addEventListener("resize", this.windowResizeListener, false);

	// start the toolbar fading in
	var toolbar = this;
	setTimeout(function() { toolbar.animateToolbar(1.0) }, 30);
}

// FancyToolbar: hide the toolbar
FancyToolbar.prototype.hide = function()
{
	if (this.clickingToolbar)
		return;

	this.showing = false;

	// start the toolbar fading out
	var toolbar = this;
	setTimeout(function() { toolbar.animateToolbar(0.0) }, 30);
}

// FancyToolbar: hidden function called when the toolbar fade ends
FancyToolbar.prototype.hidden = function()
{
	// remove the event listeners we don't need anymore
	this.editArea.contentDocument.removeEventListener("mouseup", this.updateToolbarListener, false);
	this.editArea.contentDocument.removeEventListener("mousemove", this.updateToolbarListener, false);
	this.editArea.contentDocument.removeEventListener("keypress", this.updateToolbarListener, false);
	window.removeEventListener("resize", this.windowResizeListener, false);

	// remove the toolbar element
	this.toolbarElement.parentNode.removeChild(this.toolbarElement);

	// remove the zindex we added
	this.editArea.style.zIndex = null;
}

// FancyToolbar: update the toolbar button states
FancyToolbar.prototype.updateToolbarButtonStates = function()
{
	var doc = this.editArea.contentDocument;

	// check the Bold state
	if (doc.queryCommandState("Bold"))
		this.boldButton.addStyleClass("fancy-toolbar-button-selected");
	else
		this.boldButton.removeStyleClass("fancy-toolbar-button-selected");

	// check the Underline state
	if (doc.queryCommandState("Underline"))
		this.underlineButton.addStyleClass("fancy-toolbar-button-selected");
	else
		this.underlineButton.removeStyleClass("fancy-toolbar-button-selected");

	// check the Italic state
	if (doc.queryCommandState("Italic"))
		this.italicButton.addStyleClass("fancy-toolbar-button-selected");
	else
		this.italicButton.removeStyleClass("fancy-toolbar-button-selected");
}

// FancyToolbar: link button event handler
FancyToolbar.prototype.linkSelection = function(event)
{
	// prompt the user for a URL
	var value = prompt("Enter link URL:", "");
	this.editArea.contentDocument.execCommand("CreateLink", false, value);
}

// FancyToolbar: image button event handler
FancyToolbar.prototype.insertImage = function(event)
{
	// prompt the user for a URL
	var value = prompt("Enter image URL:", "");
	this.editArea.contentDocument.execCommand("InsertImage", false, value);
}

// FancyToolbar: bold button event handler
FancyToolbar.prototype.boldSelection = function(event)
{
	this.editArea.contentDocument.execCommand("Bold");
	this.updateToolbarButtonStates();
}

// FancyToolbar: underline button event handler
FancyToolbar.prototype.underlineSelection = function(event)
{
	this.editArea.contentDocument.execCommand("Underline");
	this.updateToolbarButtonStates();
}

// FancyToolbar: italic button event handler
FancyToolbar.prototype.italicSelection = function(event)
{
	this.editArea.contentDocument.execCommand("Italic");
	this.updateToolbarButtonStates();
}

// FancyToolbar: text align left button event handler
FancyToolbar.prototype.textAlignLeft = function(event)
{
	this.editArea.contentDocument.execCommand("JustifyLeft");

	// enable the left text align button, disable all other toolbar text align buttons
	this.textAlignLeftButton.addStyleClass("fancy-toolbar-button-selected");
	this.textAlignCenterButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignJustifyButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignRightButton.removeStyleClass("fancy-toolbar-button-selected");
}

// FancyToolbar: text align center button event handler
FancyToolbar.prototype.textAlignCenter = function(event)
{
	this.editArea.contentDocument.execCommand("JustifyCenter");

	// enable the center text align button, disable all other toolbar text align buttons
	this.textAlignLeftButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignCenterButton.addStyleClass("fancy-toolbar-button-selected");
	this.textAlignJustifyButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignRightButton.removeStyleClass("fancy-toolbar-button-selected");
}

// FancyToolbar: text align justify button event handler
FancyToolbar.prototype.textAlignJustify = function(event)
{
	this.editArea.contentDocument.execCommand("JustifyFull");

	// enable the justify text align button, disable all other toolbar text align buttons
	this.textAlignLeftButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignCenterButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignJustifyButton.addStyleClass("fancy-toolbar-button-selected");
	this.textAlignRightButton.removeStyleClass("fancy-toolbar-button-selected");
}

// FancyToolbar: text align right button event handler
FancyToolbar.prototype.textAlignRight = function(event)
{
	this.editArea.contentDocument.execCommand("JustifyRight");

	// enable the right text align button, disable all other toolbar text align buttons
	this.textAlignLeftButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignCenterButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignJustifyButton.removeStyleClass("fancy-toolbar-button-selected");
	this.textAlignRightButton.addStyleClass("fancy-toolbar-button-selected");
}

// FancyToolbar: adjust the size of the toolbar bezel to match the iframe
FancyToolbar.prototype.adjustSize = function()
{
	this.toolbarElement.style.top = (this.editArea.offsetTop - 55) + "px";
	this.toolbarElement.style.left = (this.editArea.offsetLeft - 26) + "px";
	this.toolbarElement.style.width = this.editArea.offsetWidth + "px";
	this.toolbarElement.style.height = this.editArea.offsetHeight + "px";
}

// FancyToolbar: window resize event handler
FancyToolbar.prototype.windowResize = function(event)
{
	// call the adjustSize function after a delay to make sure the iframe has fully resized
	var toolbar = this;
	setTimeout(function() { toolbar.adjustSize() }, 0);
}

// FancyToolbar: fade animation function
FancyToolbar.prototype.animateToolbar = function(targetOpacity) {
	// increment or decrement the opacity depending on the target opacity
	if (this.toolbarElement.style.opacity < targetOpacity)
		this.toolbarElement.style.opacity = parseFloat(this.toolbarElement.style.opacity) + 0.1;
	else if (this.toolbarElement.style.opacity > targetOpacity)
		this.toolbarElement.style.opacity = parseFloat(this.toolbarElement.style.opacity) - 0.1;

	if (this.toolbarElement.style.opacity != targetOpacity) {
		// the opacity not yet the target opacity, keep animating
		var toolbar = this;
		setTimeout(function() { toolbar.animateToolbar(targetOpacity) }, 10);
		return;
	}

	// the opacity is now 0, so call the hidden function
	if (targetOpacity === 0.0)
		this.hidden();
}

window.addEventListener("load", function() {
	// find all the iframes
	var iframes = document.getElementsByTagName("iframe");
	for (var i = 0; i < iframes.length; ++i) {
		var iframe = iframes[i];
		if (!iframe.hasStyleClass("editable"))
			continue;
		// enable editing and make a new FancyToolbar
		iframe.contentDocument.designMode = "on";
		iframe.fancyToolbar = new FancyToolbar(iframe);
	}
}, false);
