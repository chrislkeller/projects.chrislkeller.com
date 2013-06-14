# Handlebars.js template file rendered with AJAX

Here's a simple script I've been using to display a flat data file on Handlebars templates rendered with AJAX, which has allowed me to learn to deploy interactive data projects fairly fast.

## Overview

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

## Usage

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

I then abstract out a function to display the compiled template, passing in the name of the template, the css selector I am targeting and the data I want to display.

        // function to compile handlebars template
        function renderHandlebarsTemplate(withTemplate,inElement,withData){
            getTemplateAjax(withTemplate, function(template) {
                jqueryNoConflict(inElement).html(template(withData));
            })
        };

I can then call it like this, where dataDetailsTemplate.handlebars is the name of my template, and #data-details is the css selector I am targeting, and data is what I want to display.

        renderHandlebarsTemplate('dataDetailsTemplate.handlebars', '#data-details', data);

## Links & Resources

- [Blog Post](http://www.chrislkeller.com/display-data-from-a-flat-json-file-on-a-handl)
- [Demo Page](http://projects.chrislkeller.com/snippets/ajax-handlebars/)
- [Repo](https://gist.github.com/3230081)

----

## License

[The MIT License](http://opensource.org/licenses/MIT)