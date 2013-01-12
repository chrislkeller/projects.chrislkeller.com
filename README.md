## Display data from a flat JSON file on a Handlebars.js template file rendered with AJAX

**tl;dr**: The README on the repo below gives a bit of a walkthrough and demonstration of the script I've been using to display a flat data file on Handlebars templates rendered with AJAX, which has allowed me to learn to deploy interactive data projects fairly fast.

- [Demo Page](http://projects.chrislkeller.com/snippets/ajax-handlebars/)
- [Repo](https://gist.github.com/3230081)

----

### Overview

[Handlebars.js](http://handlebarsjs.com/) is a templating library -- much like mustache.js -- that "provides the power necessary to let you build semantic templates" based on data that is formatted as -- get this -- javascript objects. Using an example from the handlebar.js website, the library allows you to do things like this...

	<div class="entry">
		<h1>{{title}}</h1>
		<div class="body">
			{{body}}
		</div>
	</div>

… where {{title}} and {{body}} represents information stored in an object like this:

	var context = {title: "My New Post", body: "This is my first post!"}

There are some really good resources out there for those who want to start using the Handlebars JavaScript template library. Here are some links:

- [Handlebars site](http://handlebarsjs.com/)
- [Handlebars GitHubRepo](https://github.com/wycats/handlebars.js/)
- [NetTuts Handlebars Walkthrough](http://net.tutsplus.com/tutorials/javascript-ajax/introduction-to-handlebars/)
- Three-part series on using Handlebars: [Part one](http://blog.teamtreehouse.com/getting-started-with-handlebars-js); [Part two](http://blog.teamtreehouse.com/code/handlebars-js-part-2-partials-and-helpers/); [Part three](http://blog.teamtreehouse.com/handlebars-js-part-3-tips-and-tricks)

I'd like to demonstrate a bit of the script I've been using to display a flat data file on Handlebars templates render with AJAX, and give a couple practical applications for using Handlebars in a newsroom environment in order to deploy interactive projects fairly fast.

>[Demo Page](http://projects.chrislkeller.com/snippets/ajax-handlebars/)
>
>[Repo](https://gist.github.com/3230081)

### Walkthrough

Coming across Handlebars.js after learning the basics of django templating, I really wanted a way to mimic some of that functionality and store Handlebars templates in [reusable, decoupled files that could be shared across projects](https://github.com/wycats/handlebars.js/issues/82).

Thankfully this function based on [code from here](http://berzniz.com/post/24743062344/handling-handlebars-js-like-a-pro) helps me to do exactly that.

	// render handlebars templates via ajax
	function getTemplateAjax(path, callback) {
	    var source, template;
	    jqueryNoConflict.ajax({
	        url: path,
	        success: function (data) {
	            source = data;
	            template = Handlebars.compile(source);
	            if (callback) callback(template);
	        }
	    });
	}

I can then call it like this, where dataDetailsTemplate.handlebars is the name of my template, and #data-details is the css selector I am targeting.

		// create projects content template
		function renderDataVisualsTemplate(data){
		    getTemplateAjax('dataDetailsTemplate.handlebars', function(template) {

		        // adds debugging information to console
		        jqueryNoConflict('#data-details').html(template(data));
		    })
		};

Let's go through the full [data-script.js file](https://gist.github.com/raw/3230081/31abdbfb3f4746f8fb761d196dcfa81cdd38184d/data-script.js), because there's a lot in there that I've kind of picked up over the last several months.

I don't really have an idea if it is "correct" to programmers out there, but I know that it works and doesn't throw me errors.

In learning to use jQuery in the context of my previous CMS -- which used several jQuery libraries -- I found it just made sense to use a no conflict variable and it's something I've just stuck with:

		var jqueryNoConflict = jQuery;

When the DOM is ready I call the *retriveData()* function which kind of starts the whole ball rolling:

		//begin main function
		jqueryNoConflict(document).ready(function(){
		    retriveData();
		});
		//end main function

*retriveData()* looks for my flat JSON file, which set to a variable. It then uses jQuery's getJSON method to pull the data and run it through a function called *renderDataVisualsTemplate()*. This is the function that will render my Handlebars template to the page with data in it.

		// grab data
		function retriveData() {
		    var dataSource = 'working-data-file.json';
		    jqueryNoConflict.getJSON(dataSource, renderDataVisualsTemplate);
		};

*renderDataVisualsTemplate()* gets an argument that represents my the data from my flat JSON file. Again, dataDetailsTemplate.handlebars is the name of my template and #data-details is the css selector where I will inject my template that will be filled with data.

		// create projects content template
		function renderDataVisualsTemplate(data){
		    getTemplateAjax('dataDetailsTemplate.handlebars', function(template) {
		        handlebarsDebugHelper();
		        jqueryNoConflict('#data-details').html(template(data));
		    })
		};

After that, I have my function to pull my Handlebars template from an external file and compile it. I've also included a Handlebars debugger, a "helper" function shows information about the data I am trying to work with.

Let's take a look at the flat JSON file I am using to hold the data that will be rendered to the page. It's structured as it is in the Handlebars walkthrough.

		{"objects": [{"Source": "National Employment Law Project", "DataOrder": "1", "SourceLink": "http://www.nelp.org/", "Data": "12.29.2012", "Title": "The last day anyone will receive benefits from the Emergency Unemployment Compensation program unless Congress acts to renew it."}, {"Source": "Congressional Budget Office", "DataOrder": "2", "SourceLink": "", "Data": "$30,000,000,000", "Title": "Estimated cost to renew the Emergency Unemployment Compensation program through the end of 2013."}]}

To render the data, the Handlebars template is structured just as it would be if it was inline on the index.html page, save for wrapping it in a script tag.

		<div>
		    {{debug}}
		    <h2>Flat file data displayed on a handlebars.js template loaded with ajax</h2>
		    {{#objects}}
		        <p>{{Title}}: <strong>{{Data}}</strong><br />
		        -- <a href="{{SourceLink}}" target="_blank"><em>{{Source}}</em></a></p>
		    {{/objects}}
		</div>

In this case, I'm asking that every instance of an object

		{{#objects}}

		{{/objects}}

be rendered to the page and structured in a certain way.

        <p>{{Title}}: <strong>{{Data}}</strong><br />
        -- <a href="{{SourceLink}}" target="_blank"><em>{{Source}}</em></a></p>

My HTML page isn't any special, other than have a div that will have all kinds of data injected into it thanks to Handlebars.

	<div id="data-details"></div>

### Practical Applications?

Your mileage might vary, but I've found several practical applications of Handlebars.js just by looking at my needs.

For instance, I came from shops that used a CMS where I could add html, css and JavaScript to a CMS "asset" which was then wrapped by the site header, rail and footer. Here at [SCPR](http://www.scpr.org/), I've been lucky enough to have mentors who wanted to and helped to create something similar.

[This project](http://projects.scpr.org/static/maps/pedestrian-safety/) is on a custom structure that lies outside of the CMS. The header and footer are each Handlebars templates, external files that I add to each new project. If I need to change a link in the footer I change it in one place and it's changed on all project pages using the template. Same goes for the header.

You could easily recreate something similar. Let's say your template structure is something like:

		<body>
		    <div id="data-header"></div>
		        <div id="data-container">
		            <div class="row-fluid">
		                <div class="span4">
		                    <div id="data-details"></div>
		                </div>
		                <div class="span8">
		                    <div id="data-visuals"></div>
		                </div>
		            </div>
		        </div>
		    <div id="data-footer"></div>
		</body>

You can probably spot some candidates for possible Handlebars templates now; data-header, data-details, data-visuals and data footer all make sense, where data-header and data-footer could be used on all projects.

Or say you want to quickly create a table to display some information. Using the data file from my earlier example, I can create a Handlebars template to do just that:

		<table class="table">
		    <tbody>
		        <tr>
		            {{#objects}}
		                <td>{{Title}}</td>
		                <td>{{Data}}</td>
		                <td>{{Source}}</td>
		            {{/objects}}
		        </tr>
		    </tbody>
		</table>

### Wrapup

As an intermediate beginner to the world of web development, and entering my fifth year of being an "online guy" in a newsroom, I've found Handlebars to be a lot of fun. To increase that fun, there are all kinds of add ons and helper functions that you can use. [swag.js](http://elving.github.com/swag/) might be the most fun thus far.

See while Handlebars tried to keep logic out of the templates -- and I respect that -- there some things I'd like to be able to do, and swag.js allows for some of that. For instance, if in my table example I wanted the title to be in all-caps I can do this with swag:

		{{uppercase Title}}

Or if I want to evaluate the data in my flat JSON file, I can run comparisons on my Handlebars templates.

		{{#objects}}
		    {{#is Source 'National Employment Law Project'}}
		        <td>The Source is {{Source}}</td>
		    {{else}}
		        <td>No Source</td>
		    {{/is}}
		{{/objects}}
