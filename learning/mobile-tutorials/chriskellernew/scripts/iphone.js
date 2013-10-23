//Initializing a variable named hist as an empty array. It exists in the global scope and will be available everywhere in the page
var hist = [];


//Defining the relative url of the remote page to load when the user first visits iphone.html.
var startUrl = 'index.html';

//This line and the next make up the document ready function definition. Passing the start page to the loadPage() function.
$(document).ready(function(){
loadPage(startUrl);
});


function loadPage(url) {

//On to the loadPage() function.
$('body').append('<div id="progress">Loading...</div>');

scrollTo(0,0);

//This if...else statement determines which elements to load from the remote page. For example, if we want the start page, we grab the uls from the header; otherwise, we grab the content div
if (url == startUrl) {
	var element = ' #header ul';
    } else {
	var element = ' #content';
    }

//url parameter and the appropriate source element are concatenated as the first parameter passed to the load function. As for the second parameter, I’m passing an anonymous function (an unnamed function that is defined inline) directly. As we go through the anonymous function, you’ll notice a strong resemblance to the hijackLinks() function, which has been replaced by this anonymous function. For example, the following three lines are identical to previous examples.	
$('#container').load(url + element, function(){
        var title = $('h2').html() || 'Hello!';
        $('h1').html(title);
        $('h2').remove();

		//removing the .leftButton object from the page.
		$('.leftButton').remove();

		//using built-in unshift method of the JavaScript array to add an object to start of hist array.
		//object has two properties: url and title. Needed to support back button display and behavior.
        hist.unshift({'url':url, 'title':title});
        
		//built-in length method of the JavaScript array to find out how many objects are in the history array
		//only one object in the history array, user on first page.
		//more than one object in the hist array, we need to add a button to the header.
		if (hist.length > 1) {

			//adding .leftButton. text of button will be the same as title of prevous page.
			//accessed with the hist[1].title code
            $('#header').append('<div class="leftButton">'+hist[1].title+'</div>');
            
			
			//binding anonymous function to the click handler of the back button.
			//click handler code executes when the user clicks, not when the page loads.
			$('#header .leftButton').click(function(e){
            
				//call jQuery’s addClass() function to assign my clicked CSS class to the button.
				$(e.target).addClass('clicked');

				//built-in shift method of the array to remove the first two items from the hist array
				var thisPage = hist.shift();
                var previousPage = hist.shift();
                loadPage(previousPage.url);
            });
        }
        $('#container a').click(function(e){
            var url = e.target.href;
            if (url.match(/localhost/)) {
                e.preventDefault();
                loadPage(url);
            }
        });
        $('#progress').remove();
    });
} 