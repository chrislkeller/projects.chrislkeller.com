//begin function
$(document).ready(function() {		

	//set time for each image
	slideShow(3500);
	
});

function slideShow(speed) {

	//Set the opacity of all images to 0
	$('ul.slideshow li').css({opacity: 0.0});
	
	//Get the first image and display it (set it to full opacity)
	$('ul.slideshow li:first').css({opacity: 1.0});
		
	//Call the gallery function to run the slideshow	
	var timer = setInterval('gallery()',speed);
}


function gallery() {

	//if no IMGs have the show class, grab the first image
	var current = ($('ul.slideshow li.show')?  $('ul.slideshow li.show') : $('#ul.slideshow li:first'));

	//Get next image, if it reached the end of the slideshow, rotate it back to the first image
	var next;
		if (current.next().length) {

			if (current.next().attr('id') == 'slideshow-caption') {

				next = $('ul.slideshow li:first');

				} else {
				next = current.next();
				
				$('#title').hide();

		}
}


	//Set the fade in effect for the next image, show class has higher z-index
	next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1000);
	
	//Hide the current image
	current.animate({opacity: 0.0}, 1000).removeClass('show');
}