var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function() {
    renderStaticTemplates();
});

// begin
function renderStaticTemplates(){
    renderProjectsHeaderTemplate();
    renderProjectsFooterTemplate();
}

// create header template
function renderProjectsHeaderTemplate(){
    getTemplateAjax('static-files/templates/projects-header.handlebars', function(template) {
        jqueryNoConflict('#projects-header').html(template());
    })
}

// create footer template
function renderProjectsFooterTemplate(){
    getTemplateAjax('static-files/templates/projects-footer.handlebars', function(template) {
        jqueryNoConflict('#projects-footer').html(template());
    })
}