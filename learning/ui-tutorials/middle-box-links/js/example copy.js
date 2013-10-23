$(function() {

    var $el, $tempDiv, $tempButton, divHeight = 0;
    
    $(".widget").hover(function(){
    
        $el = $(this).css("border-color", "white");
        divHeight = $el.height() + parseInt($el.css("padding-top")) + parseInt($el.css("padding-bottom"));
                
        $tempDiv = $("<div />", {
        
            "class": "overlay rounded"
        
        })
        
        $tempButton = $("<a />", {
        
            href: "#",
            text: "Learn more",
            class: "widget-button rounded",
            css: {
                top: (divHeight / 2) - 5 + "px"
            }
        
        }).appendTo($tempDiv);
        
        $tempDiv.appendTo($el);
    
    }, function() {
    
        $el = $(this).css("border-color", "#999");
    
        $(".overlay").fadeOut("fast", function() {
            $(this).remove();
        })
    
    });

});