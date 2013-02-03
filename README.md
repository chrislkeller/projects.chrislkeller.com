# Build a flat json file for handlebars.js template

Both of the python scripts create a flat json file from a given csv file that can be used in a handlebars.js template.

I had [Andy Boyle's](https://twitter.com/andymboyle) python [script](http://www.andymboyle.com/2011/11/02/quick-csv-to-json-parser-in-python/) from a year ago that creates json from a csv. And I noticed in the comments section on Andy's post that [Christopher Groskopf's](https://twitter.com/onyxfish) [csvkit](http://csvkit.readthedocs.org/en/latest/) has a [csvjson utility](http://csvkit.readthedocs.org/en/latest/scripts/csvjson.html) that can also convert a csv to a json file.

After flirting with the idea of adding a custom argument to the csvjson utility to allow me to specify a key, I simply adjusted Andy's script to make handlebars-json.py. Meanwhile handlebars-json-csvkit.py requires [Christopher Groskopf's](https://twitter.com/onyxfish) [csvkit](http://csvkit.readthedocs.org/en/latest/) to be installed, and uses its  [csvjson utility](http://csvkit.readthedocs.org/en/latest/scripts/csvjson.html)

## Usage

Change into the directory containing this script and the csv file and run the following from the command line where working-data-file.csv is the name of your csv file.

		python handlebars-json.py working-data-file.csv

The resulting file will look like this:

		{"objects": [{"Source": "National Employment Law Project", "DataOrder": "1", "SourceLink": "http://www.nelp.org/", "Data": "12.29.2012", "Title": "The last day anyone will receive benefits from the Emergency Unemployment Compensation program unless Congress acts to renew it."}, {"Source": "Congressional Budget Office", "DataOrder": "2", "SourceLink": "", "Data": "$30,000,000,000", "Title": "Estimated cost to renew the Emergency Unemployment Compensation program through the end of 2013."}, {"Source": "National Employment Law Project", "DataOrder": "3", "SourceLink": "http://www.nelp.org/", "Data": "400,000", "Title": "Estimated number of Californians receiving benefits from the Emergency Unemployment Compensation program, which is set to expire Jan. 2."}, {"Source": "National Employment Law Project", "DataOrder": "4", "SourceLink": "http://www.nelp.org/", "Data": "2,100,000", "Title": "Estimated number of Americans receiving benefits under the Emergency Unemployment Compensation program that would lose their unemployment benefits come January if Congress doesn\u2019t act."}]

The path to this flat file can then be dropped into a [handlebars.js function](https://gist.github.com/3230081#file-data-script-js) and displayed on a [template](https://gist.github.com/3230081#file-datadetailstemplate-handlebars).

## Snags

Now, admittedly it works because most of my handlebars work thus far has used simple data structures -- largely an object that contains an array of objects -- but my workflow might fall apart quickly should I need to access multiple data streams, etc. (UPDATE: This has already happened!)

I also took the opportunity to make a version of the script that takes a file name as an argument, runs csvjson, wraps its output in an object and pipes it all to a file.

One thing I have noticed through this experiment is tabletop.js strips uppercase letters and underscores from object keys, while the csv to json version doesn't. So that's a thing as it's the difference between a handlebars.js template that uses…

	{{projecttitle}}

and

	{{Project_Title}}

Another thing I've noticed is the python script that converts the csv to json renders everything as a string, which has caused some issues when using something like highcharts, which requires is data objects to be integers.

## Links & Resources

- [Some thoughts after a couple months with tabletop and handlebars](http://www.chrislkeller.com/some-thoughts-after-a-couple-months-with-tabl)
- [Repo](https://gist.github.com/4700210)
- [Display data from a flat JSON file on a Handlebars.js template file rendered with AJAX](http://www.chrislkeller.com/display-data-from-a-flat-json-file-on-a-handl)
- [Repo](https://gist.github.com/3230081)

----

## License

[The MIT License](http://opensource.org/licenses/MIT)