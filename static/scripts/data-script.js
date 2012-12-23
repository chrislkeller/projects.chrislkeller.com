    $(document).ready(function(){
        header();
        content();
    });

    // function to render handlebars templates via ajax
    function getTemplateAjax(path, callback) {
        var source;
        var template;

        $.ajax({
            url: path,
                success: function(data) {
                    source = data;
                    template = Handlebars.compile(source);
                        if (callback) callback(template);
                }
        });
    }

    //begin function
    function header(){

        // path to template
        getTemplateAjax('./templates/header.handlebars', function(template) {

            // path to data/content/info
            headerData = {title: "Madison Tweets"}

            // div to place template into
            $('#header').html(template(headerData));
        })

    }
    //end function

    //begin function
    function content() {
        $.getJSON('http://search.twitter.com/search.json?lang=en&geocode=43.074551,-89.384143,15mi&rpp=100&result_type=recent&callback=?', function(data) {

            var source = getTemplateAjax('./templates/tweets_content.handlebars', function(template) {
                $('#content').html(template(data));
            })

        });
    }
    //end function