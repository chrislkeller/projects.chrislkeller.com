"RoundRectangle" is a webpage that implements the iPhone rounded rectangle list design using HTML and CSS technologies. 
The webpage uses rounded rectangles to display groups of list items. This sample illustrates how to display text within a rounded rectangle and between rounded rectangles. It  creates lists that are 300 pixels wide and filled with white. Each list is contained in a rectangle with rounded corners, which is 10 pixels from both left and right edges of the iPhone screen and 17 pixels from the top of the button bar or from the next rounded rectangle. 
A list contains one or more cells divided by thin lines.

 All text is 17 pixels, Helvetica, black and bold. Text is placed 10 pixels from the left edge and 14 pixels from the bottom edge of a cell within a rounded rectangle. Regular font is also used for secondary text (content that is less important). 

Labels, placed between the rounded rectangles, follow the default text size and font, but are not black. Their color is R=76, G=86, B=10 (#4C560A).
The background color of the area behind the list is R=197, G=204, B=211 (#C5CCD3).

The RoundRectangle.css files contains all required information to build both lists and items.
The ul style declaration, in the RoundRectangle.css file, uses the border-width, border-style and border-color properties to draw a rectangle around itself. The -webkit-border-radius property is then used to round each corner of the generated rectangle. 


About the -webkit-border-radius...
The -webkit-border-radius is a WebKit  extension that creates elements with rounded corners in Safari 3. It is based on the proposed W3C CSS3 border-radius property. The complete syntax for this stylesheet attribute is:
               -webkit-border-radius: vr [hr] 
Where vr and hr specify the vertical radius and the horizontal radius of the ellipsis used to create the corners. If hr is omitted, then vr is used for both dimensions. If either vr or hr is zero, then the corner is drawn square.  Both hr and vr should be specified in pixels.
Further documentation about the CSS3 border-radius can be found at: http://www.w3.org/TR/css3-background/#the-border-radius



Using the Sample
Open index.html in Safari 3 on either Mac or PC. If you have your own webserver (eg. Mac OS X Personal Web Server) and an iPhone or iPod touch, you can also place these files on your server and browse them using your iPhone or iPod touch.


Changes from Previous Versions
Updated the viewport meta in the "index.html" file, set its width to the device-width constant. Using the device-width constant prevents the viewport from resizing when users switch their iPhone or iPod touch between portrait and landscape orientations. Furthermore, it removes the "viewport width or height set to physical device width" warning message on iPhone or iPod touch. 

For more information about viewport configuration, see the Viewport Settings for iPhone Web Application section of the Safari Web Content Guide for iPhone <<http://developer.apple.com/documentation/AppleApplications/Reference/SafariWebContent/index.html>.



Feedback and Bug Reports
Please send all feedback about this sample by connecting to the Contact ADC <http://developer.apple.com/contact/feedback.html> page.
Please submit any bug reports about this sample to the Bug Reporting <http://developer.apple.com/bugreporter> page.


Developer Technical Support
The Apple Developer Connection Developer Technical Support (DTS) team is made up of highly qualified engineers with development expertise in key Apple technologies. Whether you need direct one-on-one support troubleshooting issues, hands-on assistance to accelerate a project, or helpful guidance to the right documentation and sample code, Apple engineers are ready to help you.  Refer to the Apple Developer Technical Support <http://developer.apple.com/technicalsupport/> page.
Copyright © 2007 Apple Inc. All rights reserved.