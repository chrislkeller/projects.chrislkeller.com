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

        // fix background for mobile devices
        if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {

        }

    };
    // end

    // when user submit button is clicked
    function userSubmit(){
        jqueryNoConflict('#content-article-text').hide();
        jqueryNoConflict('#content-article-buttons').hide();
        jqueryNoConflict('#data-user-submit').show();
        renderHandlebarsTemplate('static-files/templates/data-user-submit.handlebars', '#data-user-submit');
    };
    // end

    // return to main view
    function cancelSubmit(){
        jqueryNoConflict('#content-article-text').show();
        jqueryNoConflict('#content-article-buttons').show();
        jqueryNoConflict('#data-user-submit').hide();
    };
    // end