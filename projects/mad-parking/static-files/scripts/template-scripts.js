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
    renderWelcomeScreen();
    renderPageFooterTemplate();
};
// end

function renderPageHeaderTemplate(){
    getTemplateAjax('static-files/templates/page-header.handlebars', function(template) {
        jqueryNoConflict('#page-responsive-header').html(template());
    })
};

function renderWelcomeScreen(){
    getTemplateAjax('static-files/templates/data-welcome-screen.handlebars', function(template) {
        welcomeScreenData =
            {welcomeTitle: "Where do you want to park?", welcomeMessage: "Get current Madison parking ramp conditions, search for ramp parking nearest to your location or nearest to your destination."}
        jqueryNoConflict('#data-container').html(template(welcomeScreenData));
    })

    getTemplateAjax('static-files/templates/data-footer.handlebars', function(template) {
        jqueryNoConflict('#data-footer').html(template());
    })
};

function renderPageFooterTemplate(){
    getTemplateAjax('static-files/templates/page-footer.handlebars', function(template) {
        jqueryNoConflict('#page-responsive-footer').html(template());
    })
};