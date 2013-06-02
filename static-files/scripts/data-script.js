    var jqueryNoConflict = jQuery;

    // begin main function
    jqueryNoConflict(document).ready(function() {

        Tabletop.init({
            key: '0An8W63YKWOsxdEVqSy1zSFQwYUJ1UFBmaGNTUmltOUE',
            callback: retriveData,
            parseNumbers: true,
            simpleSheet: true,
            debug: false
        });

    });
    // end

    // display data on template
    function retriveData(data, tabletop) {

        console.log(data);

        var handlebarsData = {
            objects: data
        };

        handlebarsDebugHelper();
        renderHandlebarsTemplate('static-files/templates/data-visuals.handlebars', '#data-visuals', handlebarsData);

    };
    // end