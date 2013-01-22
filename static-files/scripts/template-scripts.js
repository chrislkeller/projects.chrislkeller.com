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
};

// function to compile handlebars template
function renderHandlebarsTemplate(withTemplate,inElement,withData){
    getTemplateAjax(withTemplate, function(template) {
        jqueryNoConflict(inElement).html(template(withData));
    })
};

// render all the templates
function renderStaticTemplates(){
    renderHandlebarsTemplate('static-files/templates/page-header.handlebars', '#page-responsive-header');
    renderHandlebarsTemplate('static-files/templates/data-details.handlebars', '#data-details');
    renderHandlebarsTemplate('static-files/templates/data-visuals.handlebars', '#data-visuals');
    renderHandlebarsTemplate('static-files/templates/data-footer.handlebars', '#data-footer');
    renderHandlebarsTemplate('static-files/templates/page-footer.handlebars', '#page-responsive-footer');
};