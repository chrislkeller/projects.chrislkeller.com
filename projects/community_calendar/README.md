community_calendar
==================

A spreadsheet-driven solution for creating a community calendar.

####Background

At the Hack for LA event as part of National Day of Civic hacking I had a chance to speak with some staff from the Boyle Heights Beat, a newspaper and website based in the Boyle Heights community of Los Angeles.

I asked them if they could use any tools or features for their work and their website, and they mentioned maybe having a way for their audience to submit events going on around town. So I made a little something.

This application uses a Google Form to accept event submissions. Those submissions are added to a Google Spreadsheet. I use [tabletop.js](https://github.com/jsoma/tabletop) and [handlebars.js](http://handlebarsjs.com/) to pull data from the spreadsheet and display it on the page, which is optimized for display on phones and computers.

When a submission is entered, a script automatically combines the venue, address and city, and then geocodes it for a latitude and longitude, meaning staff doesn't have to track down locations -- only spot check to make sure they are correct.

By using simple tools like Google Forms and Spreadsheets, the overhead to implementation and use is low, as opposed to a database stack that needs a server.

There are plenty of features I didn't have time to implement that could make this more powerful:

* Geolocation of a user to show them the events around them.
* Ability to filter events based on category or date.
* Text message notifications for new events posted.
* Share events on social networks and comment on them.
