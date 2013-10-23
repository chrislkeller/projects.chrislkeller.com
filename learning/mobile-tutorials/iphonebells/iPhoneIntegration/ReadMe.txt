 "iPhoneIntegration" demonstrates an implementation of iPhone application links using HTML. These links allow users to dial phone numbers, send mail, view Google™ maps, watch YouTube™ videos, and connect to the iTunes Music Store from your webpages.

This sample contains the "index.html" and "iPhoneIntegration.css" files. The "index.html" file contains all required declarations to implement the iPhone application links; the "iPhoneIntegration.css", which is not necessary for the functionality of this sample, illustrates how to lay out content on the "iPhone Integration Links" page.  



Phone Links...
Phone links allow web developers to support iPhone dialing from their webpages. When a user taps a phone link, a dialog appears asking whether the user wishes to dial that phone number.

The phone link syntax is as follows:
         <a href= "tel:<phone number>"><text></a>
where <phone number> is the phone number you wish to dial; it is required in the tel:link expression.The <text> between the <a> tag is arbitrary.

Usage Example
 - Dial the 1-408-555-5550 number
	<a href= "tel:1-408-555-5550">1-408-555-5550</a>
	

IMPORTANT
Telephone number detection is on by default. Safari on iPhone automatically converts any number that takes the form of a phone number to a phone link. To control this behavior, see the "Using iPhone Application Links" section of the "Safari Web Content Guide for iPhone" document in the ADC Reference Library <http://developer.apple.com/documentation/AppleApplications/Reference/SafariWebContent/index.html>.



Mail Links...  
Mail links allow users to access the iPhone Mail application from your webpage. A built-in mail compose sheet, which may have filled-in or blank fields, is launched when a user taps a mail link. In this sample, the first mail link opens a built-in compose sheet with the address filled in. The second link loads a built-in compose sheet with the To and CC recipients, the subject field and the message filled in. Both mail links were built using the standard mailto URL. For more information about the mailto URL format, read RFC 2368 <http://www.ietf.org/rfc/rfc2368.txt>.

Usage Examples
 -Open an email message with the address filled in
	<a href="mailto:frank@wwdcdemo.example.com">John Frank</a>
	
 -Open an email message with multiple recipients
	<a href="mailto:frank@wwdc.com?cc=tom@wwdc.com,lisa@wwdc.com">Frank, Tom, Lisa</a>



Maps Links...
When a user taps a maps link, the link loads iPhone's built-in Google client, which shows one or several points on a map. Maps links redirect users to the Google Maps website on iPod touch. 

Links follow the Google Map parameters standard. The first and second maps links, which respectively query for Apple stores in the San Francisco area, and a location in Cupertino, were built using the q (Query) parameter.

The third link uses the saddr (Source address) and daddr (Destination address) parameters to find driving directions between Santa Cruz and a specific location in Cupertino. 

More information about the Google Map parameters can be found at http://mapki.com/wiki/Google_Map_Parameters.

Usage Example
 -Show all Apple stores near New York on a Google map 
   <a href="http://maps.google.com/maps?q=apple+store+New+York">Apple Stores, New York</a>


YouTube Links...
YouTube links allow users  to open YouTube videos from your webpage. Safari on iPhone supports two YouTube link formats:

    1. http://www.youtube.com/watch?v=<video identifier>	
    2. http://www.youtube.com/v/<video identifier>
    
where the <video identifier> represents a YouTube movie identifier.  

Both YouTube links in this sample play Apple Mac ads hosted on YouTube. The "Mac Stuffed Ad" and "Mac Flashback Ad"  links follow the first and second YouTube link formats, respectively.

Usage Example
 -Play the Surgery Mac ad 
	<a href="http://youtube.com/watch?v=ci2D1ig4df4">Surgery</a>


iTunes Links...
iTunes links allow users to connect to the iTunes Music Store from your webpages. You can copy these links from the iTunes Music Store and paste them within a <a> tag in your code. Open iTunes, right-click on any album or song, select "Copy iTunes Store URL", and paste the copied URL as described above. You can also use the iTunes Link Maker to create links to any album available on the iTunes Music Store, then copy and paste the generated links as mentioned above. More information about the iTunes Link Maker can be found at <http://www.apple.com/itunes/linkmaker/faq/>. 

The syntax of iTunes links is as follows:
    <a href="http://<link>"><text></a>
   where <link> is a link to an album on the iTunes Music store. The <text> between the <a> tag is arbitrary.

Both iTunes links in this sample take users to the iTunes Music Store. The first link opens to the iTunes Music Store; the second link points to an artist's album on the iTunes Music Store.

Usage Example
-Open to Aretha Franklin's The Best of Aretha Franklin Album on the iTunes Music Store
     <a href="itms://phobos.apple.com/WebObjects/MZStore.woa/wa/viewAlbum?playlistId=15032686&s=143441&i=15032688">The Best of Aretha Franklin</a>


Using the Sample
Open index.html in Safari 3 on either Mac or PC. If you have your own webserver (e.g. Mac OS X Personal Web Server) and an iPhone or iPod touch, you can also place these files on your server and browse them using your iPhone.

IMPORTANT
Only new or upgraded iPod touch products will include the Mail and Maps features. 


Changes from Previous Versions
Updated the "index.html" file with iTunes links that support Safari on iPhone integration with the iTunes Music Store. 
Added a "iTunes Links" section to the ReadMe file. 


Feedback and Bug Reports
Please send all feedback about this sample by using the Feedback form on the bottom of the sample's webpage.
Please submit any bug reports about this sample to the Bug Reporting <http://developer.apple.com/bugreporter> page.
Copyright (C) 2008 Apple Inc. All Rights Reserved.