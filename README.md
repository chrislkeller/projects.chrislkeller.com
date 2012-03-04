[Nearly three weeks ago I talked about](http://www.chrislkeller.com/how-a-beginner-used-python-to-interact-with-t) feeding data from Sunlight's Open States API to [Google's Fusion Tables](http://www.google.com/fusiontables/) to make a legi mashup map if only because it's possible.

I'm happy to say not only is it possible, but it came together rather quickly, especially [thanks to a previous walkthrough](http://johnkeefe.net/making-ap-election-data-easy-with-fusion-tabl) from [John Keefe](http://twitter.com/jkeefe).

Now, no doubt are there are more efficient ways to make this map happen, and even avoid Python all together. But at this stage of my abilities -- pretty solid on basic Google Maps and Fusion Tables javascript API, and beginner Python -- I'm a bit of a "I wonder if I can pull this off guy," and I think this works well. It can definately be within the wheelhouse of "intermediate to advanced beginners" and help you level up.

###What We'll Do

We will query Sunlight Labs Open States API for Wisconsin State Senator information using a Python Library and write it to a csv.

We will then upload & sync the csv to Fusion Tables using a Python script. We will merge that Fusion Table with Wisconsin State Senate district shapes and create a map that allows a user to enter their address and find their state senator.

You can see the end result [here](http://www.projects.chrislkeller.com/wis-senate-lookup).
The GitHub repo is [here](https://github.com/chrislkeller/sunlight-ft-map).

###Starting out

To start, we'll need a couple things…

- A [Sunlight Labs API key](http://services.sunlightlabs.com/accounts/register/), which you can get via email in about 10 minutes.
- A [Google Docs account](https://docs.google.com/#home).
- The [sunlight Python library](https://github.com/sunlightlabs/python-sunlight) and the ability to run Python scripts, which should be easy for non-Windows users. For Windows users, [here are some notes](http://www.chrislkeller.com/fresh-from-nicar12-here-are-curated-notes-to) I made from a couple of walkthroughs that got me up and running on a machine.
- Shapefiles for your state senate districts, which can be found from [TigerLine under the option for Upper Chamber](http://www.census.gov/cgi-bin/geo/shapefiles2011/layers.cgi). Once you download the zip file, you can upload it to Fusion Tables [using Shape to Fusion, aka shapescape](http://www.shpescape.com/)

###Step 1

Let's start with the setting the API key and installing the sunlight Python library.

Fire up your terminal and enter the following:

	echo "YOUR API KEY BETWEEN THE QUOTES" > ~/.sunlight.key
	
Then using the python package installer pip -- which you can install with easy_install if you don't have it -- to bring the sunlight Python library to your system.

	easy_install pip
	pip install sunlight

###Step 2 (Create a Fusion Table)

Now we're going to want to create our Fusion Table, because we'll need to know the column headings and we'll need the table ID. 

I've found the easiest way to do this is to create a Google Spreadsheet and then import that to Fusion Tables. As for the column headings, I grabbed a [list of the available Open States data](http://openstates.org/api/legislators/#legislator-search) to use the basis, though I ran into some issues with some of the fields that I'll explain later on. I also added a GEOID column which I will use as the key column when it comes time to merge this with the shapefile. You can see my Fusion Table [here](https://www.google.com/fusiontables/DataSource?snapid=S4192646LFQ).

Once you have your Fusion Table, you will be able to find the table id by going to File --> About in the Fusion Tables interface.

###Step 3 (Python)

If you grabbed the GitHub repo I created, you'll find that the sunlight-ft-python directory contains several Python scripts. We're concerned right now with:

- **data_search.py:** This searches Sunlight's Open States api and write the data to legi.csv
- **data_import.py:** This uses authentication to sync the data in legi.csv file to the Fusion Table you created.

In the first part of data_search.py, we're importing the sunlight library and Python's csv writer. We're then setting our search varibles -- wisconsin and upper chamber in this case -- but we could have easily just adding them in the next section. I pulled them out just to make them more obvious. 

	#import libraries
	import sunlight
	import csv

	#variables for the search
	state_name = "wi"
	chamber_name = "upper"

	#pull API data
	legis =  sunlight.openstates.legislators(
    	state=state_name,
    	chamber=chamber_name,
    )

In the second part of data_search.py, we're opening an csv file to write to and then looping through the data that is being returned from the API.

I'm checking to see if the district number being returned is a single-digit district or a double-digit district. If it's single I'm adding an extra zero to the GEOID designator. If it's double, it only gets one zero. This is the column I will be using to merge my Fusion Table with the shapefile. There are many ways to pull this off, and you may have a better solution.

The information contained within writer.writerows match column headers of my Fusion Table.  And after each step of the loop, I'm writing the information to the csv and closing the file.

	#open csv writer
	writer = csv.writer(open('legi.csv', 'wb', buffering=0), delimiter=';', quoting=csv.QUOTE_ALL)

	#open loop
	for legi in legis:

	    geo_pre = legi['district']
    
	    if len(geo_pre) == 1:
    	    item = "5500"
        
        	#write csv rows
	        writer.writerows([
    	        (item + legi['district'],
        	    legi['full_name'],
        		legi['last_name'],
        		legi['first_name'],
        		legi['middle_name'],
            	legi['photo_url'],
        		legi['state'],
            	legi['chamber'],
        		legi['party'],
            	legi['district'])
        	])
    
	    elif len(geo_pre) == 2:
    	    item = "550"

	        #write csv rows
    	    writer.writerows([
        	    (item + legi['district'],
	            legi['full_name'],
    	    	legi['last_name'],
        		legi['first_name'],
	        	legi['middle_name'],
    	        legi['photo_url'],
        		legi['state'],
            	legi['chamber'],
        		legi['party'],
            	legi['district'])
        	])

To run this, fire up your terminal, cd into your directory and run 

	python data_search.py

You should see a file titled legi.csv in the directory and hopefully is has data in it? If so, we're now ready to work with data_import.py.

There is really only one thing we need to do here, and that is adjust the column headers. Towards the bottom -- line 37 or so -- you'll find the following:

    cols = ["GEOID",
      "full_name",
      "last_name",
      "first_name",
      "middle_name",
      "photo_url",
      "state",
      "chamber",
      "party",
      "district"]

Here is where we define the columns we want to push to Fusion Tables and sync.

Once that's adjusted, head back to the command line and you will use the following, adding in your Google docs account, the name of the csv file -- legi.csv -- and the ID of your Fusion Table.

	python data_import.py [google account username] [csv file] [fusion table id]

If all goes well, you will be asked for your Google account password and you will see each column being written. The script is set to update the table every two minutes, and since we don't really need that, you can press CTL + C is everthing is successful. You'll know because your Fusion Table will be populated with brand new data.

###Step 4 (Merging with your shapefile and making your map)

I won't spend too much time here on this step because there are several walkthroughs available; I have a list of [some here](http://www.chrislkeller.com/mapping-data-wisconsin-state-senate-recall-ma). 
Anyway, from here we'll just [merge our two Fusion Tables together](http://support.google.com/fusiontables/bin/answer.py?hl=en&answer=171254) -- the table with the data and the table that contains the shapefile you uploaded.

Save the resulting map, and use either the iframe embed method or [Fusion Tables Layer Builder](http://gmaps-samples.googlecode.com/svn/trunk/fusiontables/fusiontableslayer_builder.html) to add your map to a HTML page.

###Additional Resources

[Google's Fusion Tables](http://www.google.com/fusiontables/)

[Google's Fusion Tables Presentation](http://kh-samples.googlecode.com/svn/trunk/talks/svcc_code/2011/intro.html#1)

[Fusion Tables Help](http://www.google.com/support/fusiontables/bin/answer.py?answer=184641)

[Google's Fusion Tables Group](https://groups.google.com/forum/#!forum/fusion-tables-users-group)

[Google Maps API](http://code.google.com/apis/maps/documentation/javascript/tutorial.html)

[Google's Maps API Group](https://groups.google.com/forum/#!forum/google-maps-js-api-v3)

[TIGER/Line Shapefiles](http://www.census.gov/geo/www/tiger/tgrshp2010/tgrshp2010.html)

[Shape to Fusion, aka shapescape](http://www.shpescape.com/)