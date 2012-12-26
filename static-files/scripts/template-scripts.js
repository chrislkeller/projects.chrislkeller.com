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
    renderPageHeaderTemplate();
    renderDataDetailsTemplate();
    renderDataFooterTemplate();
    renderPageFooterTemplate();
};
// end

function renderPageHeaderTemplate(){
    getTemplateAjax('static-files/templates/page-header.handlebars', function(template) {
        jqueryNoConflict('#page-responsive-header').html(template());
    })
};

function renderDataDetailsTemplate(){
    getTemplateAjax('static-files/templates/data-details.handlebars', function(template) {
        jqueryNoConflict('#data-details').html(template());
    })
};

function renderDataFooterTemplate(){
    getTemplateAjax('static-files/templates/data-footer.handlebars', function(template) {
        jqueryNoConflict('#data-footer').html(template());
    })
};

function renderPageFooterTemplate(){
    getTemplateAjax('static-files/templates/page-footer.handlebars', function(template) {
        jqueryNoConflict('#page-responsive-footer').html(template());
    })
};