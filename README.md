# Build a flat json file for [handlebars.js](http://handlebarsjs.com/) template or [jquery-vertical-timelines](https://github.com/MinnPost/jquery-vertical-timeline)

**UPDATED** I've made some updates to the handlebars-json.py script.

- Script now accepts a "usage" argument for "handlebars or timeline"
- Script assumes a header row and strips underscores and spaces and converts header fields to lowercase when creating keys.
- Because the resulting JSON file can also be used to power Vertical Timelines, I've re-named the script to csv-to-json.py.
- The handlebars-json-csvkit.py script remains unchanged. I will attempt to re-work it to create handlebars or timeline JSON in the coming weeks.

See more in the [Usage section](https://gist.github.com/chrislkeller/4700210#usage) below.

----

The csv-to-json.py script creates a flat json file from a given csv file that can be used in either a handlebars.js template or a [vertical timeline](https://github.com/MinnPost/jquery-vertical-timeline).

The handlebars-json-csvkit.py script creates a flat json file from a given csv file that can be used in a handlebars.js template and assumes the use of [Christopher Groskopf's](https://twitter.com/onyxfish) [csvkit](http://csvkit.readthedocs.org/en/latest/).

I had [Andy Boyle's](https://twitter.com/andymboyle) python [script](http://www.andymboyle.com/2011/11/02/quick-csv-to-json-parser-in-python/) from a year ago that creates json from a csv. And I noticed in the comments section on Andy's post that [Christopher Groskopf's](https://twitter.com/onyxfish) [csvkit](http://csvkit.readthedocs.org/en/latest/) has a [csvjson utility](http://csvkit.readthedocs.org/en/latest/scripts/csvjson.html) that can also convert a csv to a json file.

After flirting with the idea of adding a custom argument to the csvjson utility to allow me to specify a key, I simply adjusted Andy's script to make <del>handlebars-json.py</del> csv-to-json.py. Meanwhile handlebars-json-csvkit.py requires [Christopher Groskopf's](https://twitter.com/onyxfish) [csvkit](http://csvkit.readthedocs.org/en/latest/) to be installed, and uses its  [csvjson utility](http://csvkit.readthedocs.org/en/latest/scripts/csvjson.html)

## Usage

- The csv-to-json.py script accepts two command line arguments -- the name of the csv file and the usage. Right now the usage is either handlebars or timeline.

- The csv-to-json.py script assumes the csv file has a header row to use when creating json keys.

- The script also strips out underscores and spaces, and converts header fields to lowercase when creating keys.

### Handlebars

To generate a flat json file to use with Handlebars.js, change into the directory containing this script and the target csv file and run the following from the command line where working-handlebars.csv is the name of your csv file.

		python csv-to-json.py working-handlebars.csv handlebars

The resulting json file -- **working-data-file-handlebars.json** -- looks like this:

		{"objects": [{"sourcelink": "http://www.nelp.org/", "dataorder": "1", "data": "12.29.2012", "source": "National Employment Law Project", "title": "The last day anyone will receive benefits from the Emergency Unemployment Compensation program unless Congress acts to renew it."}, {"sourcelink": "", "dataorder": "2", "data": "$30,000,000,000", "source": "Congressional Budget Office", "title": "Estimated cost to renew the Emergency Unemployment Compensation program through the end of 2013."}, {"sourcelink": "http://www.nelp.org/", "dataorder": "3", "data": "400,000", "source": "National Employment Law Project", "title": "Estimated number of Californians receiving benefits from the Emergency Unemployment Compensation program, which is set to expire Jan. 2."}, {"sourcelink": "http://www.nelp.org/", "dataorder": "4", "data": "2,100,000", "source": "National Employment Law Project", "title": "Estimated number of Americans receiving benefits under the Emergency Unemployment Compensation program that would lose their unemployment benefits come January if Congress doesn\u2019t act."}]}

The path to **working-data-file-handlebars.json** can then be dropped into a [handlebars.js function](https://gist.github.com/3230081#file-data-script-js) and displayed on a [template](https://gist.github.com/3230081#file-datadetailstemplate-handlebars).

### Timeline

The option to create JSON to power a vertical timeline assumes a couple things.

- That you are using the vertical timeline [spreadsheet template](https://docs.google.com/spreadsheet/ccc?key=0AsmHVq28GtVJdG1fX3dsQlZrY18zTVA2ZG8wTXdtNHc#gid=0) to store your data.

- That you're using the [jQuery vertical timeline plugin](https://github.com/MinnPost/jquery-vertical-timeline) created by [MinnPost](https://github.com/MinnPost) and [Alan Palazzolo](https://github.com/zzolo) that allows for a javascript array of objects to substitued for getting data from a Google Spreadsheet.

To generate a flat json file to use with the jQuery vertical timeline plugin, change into the directory containing this script and the target csv file and run the following from the command line where working-timeline.csv is the name of the csv file you downloaded from the vertical timeline spreadsheet template.

		python csv-to-json.py working-timeline.csv timeline

The resulting json file -- **working-data-file-timeline.json** -- looks like this:

        [{"body": " Dorner born in New York", "photourl": "", "readmoreurl": "", "title": "Dorner born", "caption": "", "displaydate": "June 4", "date": "June 4, 1979"}, {"body": "Christopher Dorner graduates from Southern Utah University in Cedar City, Utah and earns a Bachelor of Science in Political Science. (Facebook Photos)", "photourl": "http://a.scpr.org/i/f04b9fcd282822a9b38aa371f1a37c66/54656-wide.jpg", "readmoreurl": "", "title": "Graduation day from Southern Utah", "caption": "Photo: Facebook", "displaydate": "May 5", "date": "May 5, 2001"}, {"body": "Dorner achieves the rank of Ensign in the Navy. (Facebook Photos)", "photourl": "", "readmoreurl": "", "title": "Dorner receives Naval promotion", "caption": "", "displaydate": "Juy 3", "date": "July 3, 2002"}]

The path to **working-data-file-timeline.json** can then be dropped into the [vertical timeline configuration function](https://github.com/MinnPost/jquery-vertical-timeline/blob/master/example.html#L38).

        <script type="text/javascript">
            $(document).ready(function() {
                $.getJSON('PATH-TO/working-data-file-timeline.json', function(data) {
                    $('#timeline-display').verticalTimeline({
                        data: data,
                        width: '75%'
                    });
                });
            });
        </script>

For more on the [jQuery vertical timeline plugin](https://github.com/MinnPost/jquery-vertical-timeline) created by [MinnPost](https://github.com/MinnPost) and [Alan Palazzolo](https://github.com/zzolo) read the docs [here](https://github.com/MinnPost/jquery-vertical-timeline/blob/master/README.md).

## Snags

Now, admittedly csv-to-json.py works because most of my handlebars work thus far has used simple data structures -- largely an object that contains an array of objects -- but my workflow might fall apart quickly should I need to access tiered data. (UPDATE: This has already happened!):

        {"objects": [{
            award_agency: "New York Film Critics",
                source_link: "http://www.nyfcc.com/awards/",
                awards: [
                    {award: "Best Actor", winner: "Daniel Day-Lewis", movie: "(Lincoln)"},
                    {award: "Best Actress", winner: "Rachel Weisz", movie: "(Deep Blue Sea)"},
                    {award: "Best Director", winner: "Kathryn Bigelow", movie: "(Zero Dark Thirty)"},
                    {award: "Best Film", winner: "Kathryn Bigelow", movie: "(Zero Dark Thirty)"}
                ]
            }]
        }

<del>One thing I have noticed through this experiment is tabletop.js strips uppercase letters and underscores from object keys, while the csv to json version doesn't. So that's a thing as it's the difference between a handlebars.js template that uses…</del>

<del>{{projecttitle}}</del>

<del>and</del>

<del>{{Project_Title}}</del>

I also took the step of normalizing the JSON output in that spaces, underscores and uppercase letters are removed from the header row. This is something that I've encountered in creating tabletop.js-driven presentations with handlebars.js -- and happens when timeline presentations -- so I felt the want to standardize things.

FInally, I've noticed csv-to-json.py renders everything as a string, which has caused some issues when using something like highcharts, which requires is data objects to be integers. This needs a fix and I'll see that I can do.

## Links & Resources

- [Some thoughts after a couple months with tabletop and handlebars](http://blog.chrislkeller.com/some-thoughts-after-a-couple-months-with-tabl/)
- [Repo](https://gist.github.com/4700210)
- [Display data from a flat JSON file on a Handlebars.js template file rendered with AJAX](http://blog.chrislkeller.com/display-data-from-a-flat-json-file-on-a-handl)
- [Repo](https://gist.github.com/3230081)

----

## License

[The MIT License](http://opensource.org/licenses/MIT)