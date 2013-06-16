var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function() {
    displayDocument();
});

    // function called on load
    function displayDocument() {

        // get the document id from the url, using jquery.url.min.js
        // so from http://s3.amazonaws.com/datadesk/dc.html?doc=29933-rahm-ruling
        // we get '29933-rahm-ruling'
        var documentcloud_id = jqueryNoConflict.url.param("doc");

        // build the documentcloud url
        var documentcloud_url = "http://www.documentcloud.org/documents/" + documentcloud_id + ".js";

        // NOTE! The page doesn't make sure the document id is valid or that the document is
        // public. It probably should. If you have code to do that, let me know!

        // assign the document loader to varible 'viewer'
        var viewer = DV.load(documentcloud_url, {
            container: 'div#document',
            embedded: true,

            // after the document loads ...
            afterLoad: function(viewer) {

                // ... get its title, and put it on the page and in the title bar
                var document_title = viewer.api.getTitle();
                jqueryNoConflict('#maintitle').text(document_title);
                jqueryNoConflict('#titletext').text(document_title);

                // ... get its source, and put it in if it exists
                var document_source = viewer.api.getSource();
                var document_source_html = "Source: " + document_source

                if(document_source != null) {
                    jqueryNoConflict('#document-source').html(document_source_html);
                }

                // ... show the link to the related article, if it exists
                var related_article_url = viewer.api.getRelatedArticle();
                var related_html = "<a id='back-link' rel='external' href='" +
                    related_article_url + "'>&laquo; Go to the related story.</a>";

                if(related_article_url != null) {
                    jqueryNoConflict('#article-link').html(related_html);
                }
            }
        });
    };