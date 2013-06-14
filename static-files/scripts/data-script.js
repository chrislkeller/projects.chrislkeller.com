var jqueryNoConflict = jQuery;

// make sure the spreadsheet is published to the web
var dataSpreadsheet = '0An8W63YKWOsxdHI1WURvU2ZHLUd6bmxicWdsNl9pRVE';

// the sheet being queried
var dataSheet = 'Inventory';

// begin main function
jqueryNoConflict(document).ready(function(){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: showInfo,
        simpleSheet: false,
        debug: false
    });
});
// end

// display page template
function showInfo(data, tabletop){


    console.log(data.Inventory.elements);

    var handlebarsData = {
        objects: data.Inventory.elements
    };

    renderFeaturedProjectsContentTemplate(handlebarsData)
    renderOtherProjectsContentTemplate(handlebarsData)

};
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

// create projects content template
function renderFeaturedProjectsContentTemplate(data){
    getTemplateAjax('static-files/templates/featured-projects-content.handlebars', function(template) {
        jqueryNoConflict('#featured-projects-content').html(template(data));
    })
};

// create other projects template
function renderOtherProjectsContentTemplate(data){
    getTemplateAjax('static-files/templates/other-projects-content.handlebars', function(template) {
        jqueryNoConflict('#other-projects-content').html(template(data));
    })
};