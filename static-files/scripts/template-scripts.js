var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function() {
    renderStaticTemplates();
});
// end

// render handlebars templates via ajax
function getTemplateAjax(path, callback) {
    var source, template;
    jqueryNoConflict.ajax({
        url: path,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);
            if (callback) callback(template);
        }
    });
}
//end

// begin
function renderStaticTemplates(){
    renderProjectsHeaderTemplate();
    renderProjectsFooterTemplate();
};
// end

// create header template
function renderProjectsHeaderTemplate(){
    getTemplateAjax('static-files/templates/projects-header.handlebars', function(template) {
        jqueryNoConflict('#projects-header').html(template());
    })
};

// create footer template
function renderProjectsFooterTemplate(){
    getTemplateAjax('static-files/templates/projects-footer.handlebars', function(template) {
        jqueryNoConflict('#projects-footer').html(template());
    })
};