var jqueryNoConflict = jQuery;

//begin main function
jqueryNoConflict(document).ready(function(){
    retriveData();
});
//end main function

// grab data
function retriveData() {
    var dataSource = 'working-data-file.json';
    jqueryNoConflict.getJSON(dataSource, processDataFrom);
};

// display page template
function processDataFrom(data){
    renderDataVisualsTemplate(data);
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

// add handlebars debugger
function handlebarsDebugHelper(){
    Handlebars.registerHelper("debug", function(optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);
    });
};
// end

// create projects content template
function renderDataVisualsTemplate(data){
    getTemplateAjax('dataDetailsTemplate.handlebars', function(template) {
        handlebarsDebugHelper();
        jqueryNoConflict('#data-details').html(template(data));
    })
};