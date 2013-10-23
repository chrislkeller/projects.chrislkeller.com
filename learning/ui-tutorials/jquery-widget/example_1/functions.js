$(document).ready(function() {

state = 1; 

$(".widgetState").click(function() {

if (state == 1)
{
$(".widgetState").html("+");
state--;
}
else
{
$(".widgetState").html("-");
state++;
}


$(".widgetContent").slideToggle();


})


})

/*
EXPLANATION
-----------

As usual, we wrap everything in the document ready function. 

We then create a function which is fired when a user clicks anywhere inside the "userState" class. Notice that in the css I gave this element a padding of 5px on the sides. I did this because the minus sign is small, and the extra space helps. Since the padding is a part of the element, if you click 5px to the left or right of the minus sign, the even will still be triggered. When we create the function we have this: 

--------------------------------------
$(".widgetState").click(function() {

})
--------------------------------------

We know that whenever the user clicks on the sign we want the contents to slide up, or down. So we add the following in there: 

--------------------------------------
$(".widgetState").click(function() {

$(".widgetContent").slideToggle();

})
--------------------------------------

This already works fine. If you try it with just this code we already have it working. However, we want the sign to change to a plus when we close the thing to indicate that it can be opened. This requires us to know the state of the box (closed or open), when the user clicks. This is why there is a variable defined before our function. 

Right at the start we set a variable, "state", which can be 0 or 1. The numbers signify the state of the widget. If it is open, state will be "1", if closed, it will be "0". Since when the page loads the widget is open, we start with the value of 1. 

Let's add an if function which will check the value of the state variable. 

--------------------------------------
state = 1;

$(".widgetState").click(function() {

if (state == 1)
{

}
else
{

}

$(".widgetContent").slideToggle();

})
--------------------------------------

This is just the basic structure we need without code. An if function starts with "if", followed by the condition we are checking in the brackets. In this case, we are checking if the value of state is 1. Notice the double equals sign (==), this is the same way you would check in PHP too. If you write "state = 2" you let the variable "state" be equal to "2". If you write "state == 2" you are checking if it is two or not. 

Getting back to the example, if it is indeed 1, then execute the code in the curly brackets. In all other cases (else), execute the code in the curly brackets after the else statement. 

We want the slideToggle code to execute, regardless of the state (since this checks the state itslef and slides the box in or out accordingly), so we add it outside the if statement. 

Now, if state == 1, this means that the state of the widget is open at the time of the click, and we are now closing it. So we want to do two things. First we want to set the value of state to 0 because once the function is done the widget will be closed. Secondly, we want to change the "-" to a "+". If state does not equal 1, we want to change the value of state to 1 and change the "+" to a "-". We do this with the following code: 

state = 1; 

$(".widgetState").click(function() {

if (state == 1)
{
$(".widgetState").html("+");
state--;
}
else
{
$(".widgetState").html("-");
state++;
}

$(".widgetContent").slideToggle();

})


First of all, I changed the "-" to a "+". This is done by getting the .widgetState class and changing its element contents. The element content is everything after the start tag, until the closing tag. For us, this is just the "-". We can change the element contents using the html() function. Whatever you put inside the brackets will replace the element contents. 

The state value is changed using "state--". "--" is an operator which just means "subtract 1 from the value of state", similary "++" means add one to the variabel. We could also have written "state = state-1". 


*/

