Overview
"CardFlip" demonstrates how to render and animate an element in 3D space using transform and transition extensions to CSS. This sample displays a card that is flipped, when tapped. It creates the card by stacking two div elements back to back and animates it by switching between both elements when users tap on the card. Animating the card consists of applying 3D transform and transition effects to it and triggering a transition between both of its two sides.

This sample contains the "index.html," "CardFlip.css," and "CardFlip.js" files. The "index.html" file builds the card and its content. The "CardFlip.css" file contains all required information to style the card; it also implements all the card 3D transform and transition effects. The "CardFlip.js" file triggers transition between both sides of the card.


Building the Card
"index.html" builds the "front" and "back" div elements that respectively represent the front and back sides of the card. It places both div elements at the exact same location. We then set the -webkit-backface-visibility property to hidden in the "face" class. Setting this property to hidden ensures that the "back" div or "back side" of the card is not visible when the card is rotated 180 degrees along the y-axis. 

"CardFlip.css" uses the -webkit-perspective property to give some depth to the card. The -webkit-tap-highlight-color property is used to disable highlighting when users tap on the card. The "container" id selector defines both of these properties.

"index.html" uses ascii characters to create suit characters for the card. Use the following characters:
              &spades; - to display a Spade card suit
              &clubs; - to display a Clubs card suit
              &diams; - to display a Diamonds card suit
              &hearts; -to display a Hearts card suit


Styling the Card
The "face," " front," and "back" classes in "CardFlip.css" are used to style the card. The "face" class creates a round layout for the card using the -webkit-border-radius property. It applies a shadow around the card using the -webkit-box-shadow property. The "front" and "back" classes are respectively used to style the front and back of the card. They both use the color property to manipulate the color of the suit characters.  

Creating 3D Transform and Transition Effects of the Card
The "card" class shows how to create 3D transform and transition effects for the card. It creates a 3D transform effect by setting the -webkit-transform-style to perspective. This ensures that both sides of the card will be rendered in 3D space. It uses both -webkit-transition-property and -webkit-transition-duration properties to allow the card to smoothly switch from one side to another. The "card" class sets -webkit-transition-duration to 1.5 seconds. Increase that number to make the flip animation go slower or decrease it to make it go faster. The "card flipped" class applies a 180 degrees rotation to the card using the -webkit-transform property. 


Animating the Card
"CardFlip" defines two states for the card: regular and flipped. A card is in a regular state when there is an empty transform applied to it, and otherwise in a flipped state, where there is a rotational transformation applied. The "card" and "card flipped" classes respectively implement the regular and flipped states of the card.

The "flip" function, in "CardFlip.js," uses the CSS classname attribute of the "card" div to toggle between the regular and flipped states of the card. The classname attribute, which represents the name of the class applied to the "card" div, takes two values: "card flipped" and "card." This attribute is set to "card flipped" when the card is in a flipped state and "card" when it is in a regular state. 

"flip" manipulates the classname attribute of  the "card" div when users tap on the card. This function checks the classname attribute of the "card" div, changes this attribute to "card flipped" if it is currently set to "card" and "card," otherwise. 


Further Reading
Read the following references to learn about all the CSS properties used in this sample:
CSS Transforms Proposal
Safari CSS Reference
Safari CSS Transform Guide for iPhone OS
Note: You must log into the Web Apps Dev Center to access these references.


Using the Sample
Place this sample’s files on your own webserver (eg. Mac OS X Personal Web Server). Open index.html in an iPhone or iPod touch running OS 2.0 or iPhone Simulator with iPhone OS 2.0 (/Developer/Platforms/AspenSimulator.platform/Developer/Applications).  Tap anywhere on the card to see it flipped. 


Change from Previous Versions
The "perspective" value for the -webkit-transform-style property was changed to "preserve-3d" in Beta 3. We replaced occurrence of this value with preserve-3d in CardFlip.css.


Feedback and Bug Reports
Please send all feedback about this sample by using the Feedback form on the bottom of the sample's webpage. Please submit any bug reports about this sample to the Bug Reporting page. 
Copyright (C) 2008 Apple Inc. All Rights Reserved.

