// SLIDESHOW SCRIPT
//variable that will increment through the images
var step=1
var whichimage=1
function slideit(){
//if browser does not support the image object, exit.
if (!document.images)
return
document.images.slide.src=eval("image"+step+".src")
whichimage=step
if (step<7)
step++
else
step=1
//call function "slideit()" every 2.5 seconds
setTimeout("slideit()",2500)
}
slideit()
function slidelink(){
if (whichimage==1)
window.location="http://localhost/gallery/Chandeliers.html"
else if (whichimage==2)
window.location="http://localhost/gallery/Art.html"
else if (whichimage==3)
window.location="http://localhost/gallery/Jewelry.html"
else if (whichimage==4)
window.location="http://localhost/gallery/Music.html"
}