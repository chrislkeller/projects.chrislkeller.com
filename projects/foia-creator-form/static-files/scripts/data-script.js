var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function() {


});

// grab data
function retriveData() {

    var currentTime = new Date();
    var agency_name = jqueryNoConflict('#agency_name').val();
    var street_address = jqueryNoConflict('#street_address').val();
    var city = jqueryNoConflict('#city').val();
    var state = jqueryNoConflict('#state').val();
    var zip_code = jqueryNoConflict('#zip_code').val();
    var data_request = jqueryNoConflict('#data_request').val();

    var testData = {"objects": [{
        date: currentTime,
        agency_name: agency_name,
        street_address: street_address,
        city: city,
        state: state,
        zip_code: zip_code,
        data_request: data_request}
        ]
    };

    renderHandlebarsTemplate('static-files/templates/data-visuals.handlebars', '#data-visuals', testData);

};

// begin dateFormatFunction
function handlebarsFormatDateForDisplay(){
    Handlebars.registerHelper('dateFormat', function(context, block) {
        if (window.moment) {
            return takeTime(context);
        }else{
            return context;
        };
    });
};

// format date/time
function takeTime(dateInput) {
    var dateFormat = 'MMMM Do, YYYY';
    //var dateFormat = 'ddd., MMM., D, YYYY, h:mm a';
    var dateOutput = moment(dateInput).format(dateFormat);
    return dateOutput;
};

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

// render handlebars template function
function renderHandlebarsTemplate(withTemplate,inElement,withData){
    getTemplateAjax(withTemplate, function(template) {
        handlebarsFormatDateForDisplay();
        jqueryNoConflict(inElement).html(template(withData));
    })
};