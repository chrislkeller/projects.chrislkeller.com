### Loading handlebars template with AJAX & displaying flat file data

There are some good resources out there for those who want to start using the handlebars JavaScript template library, so I don't want to start from scratch with it.

But I would like to try to demonstrate how I've ramped up my use of handlebars templates over the past couple months in a newsroom environment, and how it's made deploying interactive projects fairly fast.

This example will take a flat json file I created from a csv and display it in a handlebars template stored in a separate file and rendered on a web page.

- [Demo](http://projects.chrislkeller.com/snippets/ajax-handlebars/)

- [Repo](https://gist.github.com/3230081)

#### Overview

The handlebars.js documentation describes adding templates to bottom of your index.html file like this:

        <script id="entry-template" type="text/x-handlebars-template">
	        {{template content}}
        </script>

Coming across this after learning the basics of django templating, I really wanted a way to store handlebars templates in [reusable, decoupled files that could be shared across projects](https://github.com/wycats/handlebars.js/issues/82).  

Thankfully this function helps me to do exactly that. 

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
		        handlebarsDebugHelper();
		        jqueryNoConflict('#data-details').html(template(data));
		    })
		};

#### Walkthrough

Let's go through the full [data-script.js file](https://gist.github.com/raw/3230081/31abdbfb3f4746f8fb761d196dcfa81cdd38184d/data-script.js), because there's a lot in there that I've kind of picked up over the last several months. I don't really have an idea if it is "correct" to programmers out there, but I know that it works and doesn't throw me errors. 

In learning to use jQuery in the context of my previous CMS -- which used several jQuery libraries -- I found it just made sense to use a no conflict variable and it's something I've just stuck with:

		var jqueryNoConflict = jQuery;

When the DOM is ready I call the *retriveData()* function which kind of starts the whole ball rolling: 

		//begin main function
		jqueryNoConflict(document).ready(function(){
		    retriveData();
		});
		//end main function

*retriveData()* looks for my flat JSON file, which set to a variable. It then uses jQuery's getJSON method to pull the data and run it through a function called *renderDataVisualsTemplate()*. This is the function that will render my handlebars template to the page with data in it. 

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

After that, I have my function to pull my handlebars template from an external file and compile it. I've also included a handlebars debugger, a "helper" function shows information about the data I am trying to work with.   

Let's take a look at the flat JSON file I am using to hold the data that will be rendered to the page. It's structured as it is in the handlebars walkthrough.

		{"objects": [{"Source": "National Employment Law Project", "DataOrder": "1", "SourceLink": "http://www.nelp.org/", "Data": "12.29.2012", "Title": "The last day anyone will receive benefits from the Emergency Unemployment Compensation program unless Congress acts to renew it."}, {"Source": "Congressional Budget Office", "DataOrder": "2", "SourceLink": "", "Data": "$30,000,000,000", "Title": "Estimated cost to renew the Emergency Unemployment Compensation program through the end of 2013."}]} 

To render the data, the handlebars template is structured just as it would be if it was inline on the index.html page, save for wrapping it in a script tag.

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

My HTML page isn't any special, other than have a div that will have all kinds of data injected into it thanks to handlebars.
	
	<div id="data-details"></div>

I've found several practical applications of this demonstration, but your mileage might very. All it really takes though is some imagination and a need.

For instance, I came from shops that used the same CMS, where I could add html, css and JavaScript to a CMS "asset" which would then be wrapped up in the site header, rail and footer. Here at SCPR, I've been lucky enough to have mentors who wanted to and helped to create something similar.

For instance, [this project](http://projects.scpr.org/static/maps/pedestrian-safety/) is on a custom template that lies outside of the CMS. The header and footer are each handlebars templates, external files that are added to each project. Need to change a link in the footer? Change it in one place and it's changed on all project pages that use the template. Same goes for the header.

#### License

[The MIT License](http://opensource.org/licenses/MIT)