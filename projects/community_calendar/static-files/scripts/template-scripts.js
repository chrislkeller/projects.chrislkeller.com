var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function() {
    renderStaticTemplates();
});
// end

// render all the templates
function renderStaticTemplates(){
    renderHandlebarsTemplate('static-files/templates/page-header.handlebars', '#page-responsive-header');
    renderHandlebarsTemplate('static-files/templates/data-details.handlebars', '#data-details');
    renderHandlebarsTemplate('static-files/templates/data-footer.handlebars', '#data-footer');
    renderHandlebarsTemplate('static-files/templates/page-footer.handlebars', '#page-responsive-footer');
};