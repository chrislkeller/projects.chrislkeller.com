var jqueryNoConflict = jQuery;

/*
begin main function to run
the renderStaticTemplates()
function when the page is loaded
*/

jqueryNoConflict(document).ready(function() {
    renderStaticTemplates();
});

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
    renderHandlebarsTemplate('static-files/templates/data-details.handlebars', '#data-details');
};