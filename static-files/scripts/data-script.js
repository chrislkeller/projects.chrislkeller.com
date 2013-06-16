var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){
    Tabletop.init({
        key: '0An8W63YKWOsxdHI1WURvU2ZHLUd6bmxicWdsNl9pRVE',
        callback: showInfo,
        simpleSheet: false,
        debug: false
    });
});
// end

// display page template
function showInfo(data, tabletop){

    var handlebarsData = {
        objects: data.Inventory.elements
    };

    renderHandlebarsTemplate('static-files/templates/featured-projects-content.handlebars', '#featured-projects-content', handlebarsData);
    renderHandlebarsTemplate('static-files/templates/other-projects-content.handlebars', '#other-projects-content', handlebarsData);

}