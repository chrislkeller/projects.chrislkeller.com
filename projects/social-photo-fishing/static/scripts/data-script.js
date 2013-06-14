    var jqueryNoConflict = jQuery;

    //begin main function
    jqueryNoConflict(document).ready(function(){

        renderWelcomeMessage();

        jqueryNoConflict("#example").popover();

    });
    //end main function


    // render handlebars templates via ajax
    function getTemplateAjax(path, callback) {
        var source;
        var template;

        jqueryNoConflict.ajax({
            url: path,
                success: function(data) {
                    source = data;
                    template = Handlebars.compile(source);
                        if (callback) callback(template);
                }
        });
    };


    // begin function
    // this should be split up into process/scrub input and then display handlebars
    function renderTweetContent() {

        var userSearchInput = document.getElementById('search-string').value;
        var patternToMatch = /[#]+/g;
        var cleanUserSearchInput = userSearchInput.replace(patternToMatch, "");
        var addHastagToSearch = '%23'
        var finalSearchQuery = addHastagToSearch + cleanUserSearchInput;

        console.log(finalSearchQuery);

        var searchPrefix = 'http://search.twitter.com/search.json?lang=en&q=pic.twitter.com%20';
        var searchSuffix = '&geocode=33.97582766523908,-118.21907043457031,25mi&rpp=50&include_entities=true&result_type=recent';

        jqueryNoConflict.getJSON(searchPrefix + finalSearchQuery + searchSuffix + '&callback=?', function(data) {

            getTemplateAjax('./templates/renderTweetContent.handlebars', function(template) {
                $('#application_content').html(template(data));
            })

        });

    }
    // end function


    // begin function
    function renderWelcomeMessage() {

        getTemplateAjax('./templates/renderWelcomeMessage.handlebars', function(template) {

            // path to data/content/info
            headerData = {headline: "Twitter Photo Search", message: "Search a Twitter hashtag to see recent user photos. The option to search Instagram is coming soon."}

            $('#application_header').html(template(headerData));
        })

    }
    // end function