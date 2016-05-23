$(document).ready(function(){
    Tabletop.init({
        key: 'https://docs.google.com/spreadsheets/d/1I16e32v9KJ-gs-khwSrBSh9v4JeZI6MdGEaZyVrt7XE/pubhtml',
        callback: showInfo,
        simpleSheet: false,
        debug: false
    });
});

function showInfo(data, tabletop){
    displayMain(data);
    displayLis(data.projects.elements, "projects");
    displayLis(data.demos.elements, "demos");
    displayLis(data.code_snippets.elements, "code-snippets");
    displayLis(data.published_work.elements, "published-work");
};

function displayMain(objects){
    var o = objects.inventory.elements;
    var row_length = 3;
    var o_length = 0;
    for (var i=0; i<o.length; i++){
        if (o[i].project_order){

            o_length ++;

            $("#featured").append(
                "<div class='col-md-4 portfolio-item'>" +
                    "<div class='image-block'>" +
                        "<a href='" + o[i].project_url + "'>" +
                            "<img class='img-responsive' src='" + o[i].project_image + "' alt='" + o[i].project_title + "'>" +
                        "</a>" +
                    "</div>" +
                    "<h3>" +
                        "<a href='" + o[i].project_url + "'>" + o[i].project_title + "</a>" +
                    "</h3>" +
                    "<p>" + o[i].project_description + "</p>" +
                "</div>"
            );
        };
    };

    var calculation = o_length/row_length
    var isInt = parseInt(calculation) === calculation

    if (isInt === false){
        appendPlaceHolder("featured");
    };

};

function displayLis(objects, element_id){
    var element_id = "#" + element_id;
    for (var i=0; i<objects.length; i++){
        if (!objects[i].project_order){
            $(element_id).append(
                "<li><a href='" + objects[i].project_url + "'>" + objects[i].project_title + "</a></li>"
            );
        };
    };
};

function appendPlaceHolder(element_id){
    var element_id = "#" + element_id;
    $(element_id).append(
        "<div class='col-md-4 portfolio-item'>" +
            "<div class='image-block'></div>" +
        "</div>"
    );
};

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight){
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {width: srcWidth * ratio, height: srcHeight * ratio};
};

function getHighestHeight(targetElementId){
    var heights = [];
    $(targetElementId).children().each(function(){
        var new_height = $(this).outerHeight();
        heights.push(new_height)
    });
    return heights;
};
