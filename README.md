#### Some thoughts after a couple months with tabletop and handlebars

**tl;dr** - Seeing how I can use tabletop.js & handlebars.js together has opened up some really cool custom mini-CMS possibilities and ways to manage data projects. But as I have learned thanks to the [experiments of others](https://twitter.com/brianboyer/status/233201509842710528), flat json files can be much better in production, and especially for small one-off projects. In lieu of learning how to take the tabletop object and write it to a flat file, I made some adjustments to some python code so I can take a csv, create a flat json file from it and drop that file into a [handlebars function](https://gist.github.com/3230081). While it works for me, I'd like to know if it works for others…

- [Demo Page](http://projects.chrislkeller.com/snippets/ajax-handlebars/)
- [Blog Post](http://www.chrislkeller.com/display-data-from-a-flat-json-file-on-a-handl)
- [Repo](https://gist.github.com/3230081)

----

I'm happy to say that I still have access to some gray days since moving to Southern California, and on a recent one I set about streamlining some project structures, code snippets & templates for two code libraries that I've been using more and more since coming to [Southern California Public Radio](http://www.scpr.org/): [tabletop.js](https://github.com/jsoma/tabletop) and [handlebars.js](http://handlebarsjs.com/).

I'm only now getting back to the write up and posting code.

### Overview

tabletop.js allows you to use a Google spreadsheet as a data backend. By simply publishing the spreadsheet and adding its key to a tabletop javascript function you can retrieve an an array of objects to be used on a webpage or in a web application. The library was released back in February -- right around the time of NICAR -- thanks to work by [WNYC](http://datanews.tumblr.com/) and [Balance Media](http://www.builtbybalance.com/).

handlebars.js is a templating library -- much like mustache.js -- that "provides the power necessary to let you build semantic templates" based on data that is formatted as -- get this -- javascript objects. Using an example from the handlebar.js website, the library allows you to do things like this...

	<div class="entry">
		<h1>{{title}}</h1>
		<div class="body">
			{{body}}
		</div>
	</div>

… where {{title}} and {{body}} represents information stored in an object like this:

	var context = {title: "My New Post", body: "This is my first post!"}

### Walkthrough

Learning how these libraries can work with each other has been a lot of fun, especially in the context of a newly-created position at a new-to-me news organization where I have had a role to play in building a foundation for the presentation of data projects.

For instance, using handlebars.js ability to load precompiled handlebars templates from file we've been able to construct a basic project wrapper that can live outside CMS, minimizes the amount of code that needs to be changed at any given time and allows us to manage a single header and one footer file. DRY FTW.

I've also been able to use the combination of these libraries to come to having a custom mini-CMS that can run some of these projects, which can then be updated by anyone that can use a spreadsheet.

For instance, one of my first collaborations was with our business and economy reporter [Matt DeBord](http://www.scpr.org/about/people/staff/matthew-debord) on this project for [Explaining the Monthly Jobs Report](http://www.scpr.org/blogs/economy/2012/12/07/11444/november-job-report/).

This project combines tabletop.js with handlebars.js -- and some [highcharts.js](http://www.highcharts.com/) for good measure -- to show the differences between "Initial," "Revised," and Final monthly jobs numbers released by the U.S. Bureau of Labor Statistics.

For my money, the magic is in the fact that Matt can update this presentation for our audience by opening a Google spreadsheet and adding the new numbers. Lightweight, custom mini-CMS!

[Tasneem Raja](https://twitter.com/tasneemraja), the Interactive Editor at Mother Jones, has written a [solid explainer](http://www.ire.org/blog/on-the-road/2012/09/21/behind-story-mother-jones-and-47-percent/) on how the magazine has leveraged tabletop.js and a [Google spreadhseet](https://docs.google.com/spreadsheet/ccc?key=0AiK02J6OppqxdFVxTEJBLXpqcWZKNVJsRFFZdkNESGc#gid=0) for collaborative projects such as their [You Might Be the 47 Percent If…](http://www.motherjones.com/politics/2012/09/charts-47-percent-romney-tax-data) scoop.

Some of the projects I've worked on over the past couple months that use tabletop.js and handlebars.js include a presentation on the purchasing of [Capital Appreciation Bonds](http://projects.scpr.org/static/interactives/capital-appreciation-bonds/) by local school districts, a "By The Numbers" look at the impact of the so-called [fiscal cliff on Emergency Unemployment Compensation benefits](http://projects.scpr.org/static/interactives/unemployment-compensation/) and a comparison of [California and federal gun laws](http://projects.scpr.org/static/charts/gun-laws/)

But a [post on NewsBeast Labs](http://newsbeastlabs.tumblr.com/post/37641296435/google-docs-miso-powered-apps-a-note-on) I found while writing this pointing to a post from Jeremy Singer-Vine  -- appropriately titled ["Why I love Tabletop.js but don't use it in production"](https://gist.github.com/3295633) -- and some words from [Mark Boas](https://twitter.com/maboa) on an [Open News](http://www.mozillaopennews.org/) call a couple weeks ago reminded me of potential obstacles and issues with relying too much on tabletop.js for projects.

And a [tweet this week](https://twitter.com/aboutaaron/status/289469005008338945) from [Aaron Williams](https://twitter.com/aboutaaron) reminded me I have to finish this post you are reading.

All of the issues that Jeremy listed are real, and Aaron's experience is real. Thinking about the projects I listed above, none of them really require the kind of dynamic data display that tabletop.js can pull off. It's a nice feature to have available on the monthly jobs report, but it isn't crucial, and certainly isn't required on the others.

A flat file [very much](https://docs.google.com/presentation/embed?id=1IybYcc0eVL-Rchm7lEQNwrM-AHRfr_M8ewfGYYNjeu8&start=false&loop=false&delayms=3000#slide=id.p) would work just fine.

And so I went about finding a way to create a flat json file from a Google spreadsheet that I could use in a handlebars.js template.

### My Workaround

I already had [Andy Boyle's](https://twitter.com/andymboyle) python [script](http://www.andymboyle.com/2011/11/02/quick-csv-to-json-parser-in-python/) from a year ago that creates json from a csv. And I noticed in the comments section on Andy's post that [Christopher Groskopf's](https://twitter.com/onyxfish) [csvkit](http://csvkit.readthedocs.org/en/latest/) has a [csvjson utility](http://csvkit.readthedocs.org/en/latest/scripts/csvjson.html) that can also convert a csv to a json file.

After flirting with the idea of adding a custom argument to the csvjson utility to allow me to specify a key, I simply adjusted Andy's script to create a file that looks like this…

	{"objects": [{"Source": "National Employment Law Project", "DataOrder": "1", "SourceLink": "http://www.nelp.org/", "Data": "12.29.2012", "Title": "The last day anyone will receive benefits from the Emergency Unemployment Compensation program unless Congress acts to renew it."}, {"Source": "Congressional Budget Office", "DataOrder": "2", "SourceLink": "", "Data": "$30,000,000,000", "Title": "Estimated cost to renew the Emergency Unemployment Compensation program through the end of 2013."}, {"Source": "National Employment Law Project", "DataOrder": "3", "SourceLink": "http://www.nelp.org/", "Data": "400,000", "Title": "Estimated number of Californians receiving benefits from the Emergency Unemployment Compensation program, which is set to expire Jan. 2."}, {"Source": "National Employment Law Project", "DataOrder": "4", "SourceLink": "http://www.nelp.org/", "Data": "2,100,000", "Title": "Estimated number of Americans receiving benefits under the Emergency Unemployment Compensation program that would lose their unemployment benefits come January if Congress doesn\u2019t act."}]

… which is something that allows me to plug my new file name into a variable in [this script](https://gist.github.com/raw/3230081/31abdbfb3f4746f8fb761d196dcfa81cdd38184d/data-script.js) and fly.

### Potential Snags

Now, admittedly it works because most of my handlebars work thus far has used simple data structures -- largely an object that contains an array of objects -- but my workflow might fall apart quickly should I need to access multiple data streams, etc. (UPDATE: This has already happened!)

I also took the opportunity to make a version of the script that takes a file name as an argument, runs csvjson, wraps its output in an object and pipes it all to a file.

One thing I have noticed through this experiment is tabletop.js strips uppercase letters and underscores from object keys, while the csv to json version doesn't. So that's a thing as it's the difference between a handlebars.js template that uses…

	{{projecttitle}}

and

	{{Project_Title}}

Another thing I've noticed is the python script that converts the csv to json renders everything as a string, which has caused some issues when using something like highcharts, which requires is data objects to be integers.