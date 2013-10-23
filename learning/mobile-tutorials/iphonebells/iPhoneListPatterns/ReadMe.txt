"iPhoneListPatterns" is a collection of samples that present various ways of displaying information on iPhone using a list-like format.
It contains the "RoundRectangle" and "EdgeToEdge" samples that respectively implement the rounded rectangle and edge to edge list patterns 
using CSS and HTML technologies.



About  "EdgeToEdge" ...
The edge to edge list model is used to display "a group" of items using CSS and HTML technologies.

The  "EdgeToEdge" sample builds a list whose width and background color are respectively 320 pixels and white. 
The list consists of one or more cells separated by thin lines. Each cell is 44 pixels high (including the line at the bottom of the cell). 
All text is 20 pixels, Helvetica, black and bold. Regular font is used for content that is less important.
Both list and items are built using modified ul and li elements. Read the "EdgeToEdge.css" file to find out how these elements were changed. 

The "EdgeToEdge"  sample also describes how to generate rounded rectangular buttons for a list. The "button" class in the  "EdgeToEdge.css" file shows all the required steps. The created button is a 29 pixels high rounded rectangle, which is vertically centered in a cell. It is positioned 10 pixels from the right edge of its parent cell and displays text in Helvetica, 17-pixels size. 
 


About  "RoundRectangle"...  
The rounded rectangle list pattern is used to present "groups" of items using CSS and HTML technologies.

The "RoundRectangle" sample demonstrates how to build rounded rectangles, and display text within a rounded rectangle and between rounded rectangles.

It creates lists that are 300 pixels wide and filled with white. Each list is contained in a rectangle with rounded corners, which is 
10 pixels from both left and right edges of the iPhone screen and 17 pixels from the top of the button bar or from the next rounded rectangle. A list contains one or more cells divided by thin lines.

 All text is 17 pixels, Helvetica, black and bold. Text is placed 10 pixels from the left edge and 14 pixels from the bottom edge of a cell within a rounded rectangle. Regular font is also used for content that is less important. 

Labels, placed between the rounded rectangles, follow the default text size and font, but are not black. Their color is R=76, G=86, B=10(#4C560A).
The background color of the area behind the list is R=197, G=204, B=211(#C5CCD3).



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