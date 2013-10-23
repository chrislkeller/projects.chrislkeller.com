"EdgeToEdge" is a webpage that implements the iPhone edge to edge list pattern using HTML and CSS technologies. 

This sample builds a list of items that fill the iPhone screen in equally sized rows. The list, whose width must be  320 pixels, contains one or more items that are separated by thin lines. Each item or cell is 44 pixels high (including the line at the bottom of the cell). All text is 20 pixels, Helvetica, black and bold. Regular font can be used for content that is less important. Text is placed 10 pixels from the left edge and 14 pixels from the line at the bottom edge of the cell.

Both the list itself  and items are built using ul and li elements. Read the "EdgeToEdge.css" file to find out how these elements were changed. 

This sample also describes how to generate rounded rectangular buttons for a list. The "button" class in the  "EdgeToEdge.css" file shows all the required steps. The created button is a 29 pixels high rounded rectangle, which is vertically centered in a cell. It is positioned 10 pixels from the right edge of its parent cell and displays text in Helvetica, 17-pixels size. 


Using the Sample
Open index.html in Safari 3 on either Mac or PC. If you have your own webserver (eg. Mac OS X Personal Web Server) and an iPhone or iPod touch, you can also place these files on your server and browse them using your iPhone or iPod touch.


Changes from Previous Versions
Updated the viewport meta in the "index.html" file, set its width to the device-width constant. Using the device-width constant prevents the viewport from resizing when users switch their iPhone or iPod touch between portrait and landscape orientations. Furthermore, it removes the "viewport width or height set to physical device width" warning message on iPhone or iPod touch. 

For more information about viewport configuration, see the Viewport Settings for iPhone Web Application section of the Safari Web Content Guide for iPhone <http://developer.apple.com/documentation/AppleApplications/Reference/SafariWebContent/index.html>.


Feedback and Bug Reports
Please send all feedback about this sample by connecting to the Contact ADC <http://developer.apple.com/contact/feedback.html> page.
Please submit any bug reports about this sample to the Bug Reporting <http://developer.apple.com/bugreporter> page.


Developer Technical Support
The Apple Developer Connection Developer Technical Support (DTS) team is made up of highly qualified engineers with development expertise in key Apple technologies. Whether you need direct one-on-one support troubleshooting issues, hands-on assistance to accelerate a project, or helpful guidance to the right documentation and sample code, Apple engineers are ready to help you.  Refer to the Apple Developer Technical Support <http://developer.apple.com/technicalsupport/> page.
Copyright © 2007 Apple Inc. All rights reserved.