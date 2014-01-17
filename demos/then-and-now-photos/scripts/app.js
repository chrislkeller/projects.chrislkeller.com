var jqueryNoConflict = jQuery;
var fn = fn || {};

// begin main function
jqueryNoConflict(document).ready(function() {
    fn.processData(imageData);
});

// begin data configuration object
var fn = {

    // loop through our data and process it
    processData: function(data){

        // add the slider to the initial image
        jqueryNoConflict('#images-container').twentytwenty();

        // loop through the data and determine how many
        // controls we need to create and apply a background image
        for(var i=0; i<data.objects.length; i++){
            jqueryNoConflict("#controls").append("<div id='" + i + "' class='indicator' style='background-image: url(\"" + data.objects[i].controlsbackgroundthumbnail + "\"); background-repeat: no-repeat; background-position: center;'></div>");
        }

        // see how wide our controls div is
        var controlsWidth = jqueryNoConflict('#controls').width();

        // see how many controls we have
        var numberOfElements = data.objects.length;

        // set the width of a control based on the above variables
        var elementDimension = (controlsWidth-5)/numberOfElements;

        // set the control size using jquery
        jqueryNoConflict('#controls .indicator').css({
            'width': elementDimension + 'px',
            'height': elementDimension + 'px'
        });

        // add an active class to the current control
        jqueryNoConflict('#controls .indicator:first').addClass('active');
        fn.activateClickEvent();
    },

    // sets the click event on the controls
    activateClickEvent: function(){

        // when a control is clicked
        jqueryNoConflict('div.indicator').click(function(){

            // remove the active class
            jqueryNoConflict('div').removeClass('active');

            // get the id of the control clicked
            var targetValue = jqueryNoConflict(this).attr('id');

            // add the active class to it
            jqueryNoConflict('div#' + targetValue).addClass('active');

            // add the image to the then container based on the id
            jqueryNoConflict('#images-container #then img').attr('src', imageData.objects[targetValue].thenimageurl);

            // add the image to the after container based on the id
            jqueryNoConflict('#images-container #now img').attr('src', imageData.objects[targetValue].nowimageurl);

            // set the captions based on the
            jqueryNoConflict('#captions-container').html(
                "<p>" + imageData.objects[targetValue].imagecaption + "</p>" +
                "<div id='photo-credits'>" +
                "<p><span class='pull-left'><em>" + imageData.objects[targetValue].thenimagephotocredit + "</em></span><span class='pull-right'><em>" + imageData.objects[targetValue].nowimagephotocredit + "</em></span></p>" +
                "</div>");
        });
    }
}
// end data configuration object