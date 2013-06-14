$(document).ready(function(){

	//triggers animation based on class
	$(".run-first").click(function(){
	
	//hides content
	$("#first-graf")
	.slideUp(5000)
	
	//animates the image
	$("#first-image")
	
	//brings up
	.animate({opacity: "0.1", left: "+=200"}, 300)
	
	//expands		
	.animate({opacity: "1", height: "600", width: "600"}, 9000)
	
	//fades image	
	$("#first-image").fadeOut("slow"
	,function() {
	
	//shows next paragraph
	$("#second-graf").fadeIn("slow");
});

	return false;
});

	//triggers animation based on class
	$(".run-second").click(function(){
	
	//hides content
	$("#second-graf")
	.slideUp(5000)
	
	//animates the image
	$("#second-image")
	
	//brings up
	.animate({opacity: "0.1", left: "+=200"}, 300)
	
	//expands		
	.animate({opacity: "1", height: "600", width: "600"}, 9000)
	
	//fades image	
	$("#second-image").fadeOut("slow"
	,function() {
	
	//shows next paragraph
	$("#third-graf").fadeIn("slow");
});

	return false;
});

	//triggers animation based on class
	$(".run-third").click(function(){
	
	//hides content
	$("#third-graf")
	.slideUp(5000)
	
	//animates the image
	$("#third-image")
	
	//brings up
	.animate({opacity: "0.1", left: "+=200"}, 300)
	
	//expands		
	.animate({opacity: "1", height: "600", width: "600"}, 9000)
	
	//fades image	
	$("#third-image").fadeOut("slow"
	,function() {
	
	//shows next paragraph
	$("#fourth-graf").fadeIn("slow");
});

	return false;
});

	//triggers animation based on class
	$(".run-fourth").click(function(){
	
	//hides content
	$("#fourth-graf")
	.slideUp(5000)
	
	//animates the image
	$("#fourth-image")
	
	//brings up
	.animate({opacity: "0.1", left: "+=200"}, 300)
	
	//expands		
	.animate({opacity: "1", height: "600", width: "600"}, 9000)
	
	//fades image	
	$("#fourth-image").fadeOut("slow"
	,function() {
	
	//shows next paragraph
	$("#fifth-graf").fadeIn("slow");
});

	return false;
});

	//triggers animation based on class
	$(".run-fifth").click(function(){
	
	//hides content
	$("#fifth-graf")
	.slideUp(5000)
	
	//animates the image
	$("#fifth-image")
	
	//brings up
	.animate({opacity: "0.1", left: "+=200"}, 300)
	
	//expands		
	.animate({opacity: "1", height: "600", width: "600"}, 9000)
	
	//fades image	
	$("#fifth-image").fadeOut("slow"
	,function() {
	
	//shows next paragraph
	$("#sixth-graf").fadeIn("slow");
});

	return false;
});

	//triggers animation based on class
	$(".run-sixth").click(function(){
	
	//hides content
	$("#sixth-graf")
	.slideUp(5000)
	
	//animates the image
	$("#sixth-image")
	
	//brings up
	.animate({opacity: "0.1", left: "+=200"}, 300)
	
	//expands		
	.animate({opacity: "1", height: "600", width: "600"}, 9000)
	
	//fades image	
	$("#sixth-image").fadeOut("slow"
	,function() {
	
	//shows next paragraph
	$("#seventh-graf").fadeIn("slow");
});

	return false;
});

});