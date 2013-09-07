var jqueryNoConflict = jQuery;

// function to initialize tabletop
jqueryNoConflict(document).ready(function() {
    Tabletop.init({
        key: '0An8W63YKWOsxdGRzTldqRWhPMVByQU8xZmZ0TDB0MlE',
        callback: retriveData,
        parseNumbers: true,
        simpleSheet: false,
        debug: false
    });
});
// end

// display data on template
function retriveData(data, tabletop) {

    var handlebarsData = {
        objects: data.master.elements
    };

    handlebarsDebugHelper();

    console.log(handlebarsData)

    // this function takes the template name, the css selector you are adding content to and the data
    renderHandlebarsTemplate('table-content.handlebars', '#handlebars-content', handlebarsData);
};
// end