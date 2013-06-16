var jqueryNoConflict = jQuery;
var proxyPrefix = 'http://projects.scpr.org/static/static-files/templates/';

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

// handlebars help function to set every nth element
function runRegisteredHandlebarsHelpers(){
    handlebarsreplaceSpacesHelper();
    handlebarsLooperHelper();
    handlebarsFormatDateHelper();
    handlebarsSetDecimalToFixedHelper();
}

// add handlebars debugger
function handlebarsDebugHelper(){
    Handlebars.registerHelper("debug", function(optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);
    });
}

// build helper function
function handlebarsreplaceSpacesHelper(){
    Handlebars.registerHelper('replaceSpaces', function(context) {
        var replacedContext = context.split(' ').join('-');
        return replacedContext;
    });
}

function handlebarsLooperHelper(){
    // handlebars help function to set every nth element
    Handlebars.registerHelper('everyNth', function(context, every, options) {
        var fn = options.fn, inverse = options.inverse;
        var ret = "";
        if(context && context.length > 0) {
            for(var i=0, j=context.length; i<j; i++) {
                var modZero = i % every === 0;
                ret = ret + fn(_.extend({}, context[i], {
                    isModZero: modZero,
                    isModZeroNotFirst: modZero && i > 0,
                    isLast: i === context.length - 1
                }));
            }
        } else {
            ret = inverse(this);
        }
        return ret;
    });
}

// format date/time
function takeTime(dateInput) {
    var dateFormat = 'MMM. D, h:mm a';
    var dateOutput = moment(dateInput).format(dateFormat);
    return dateOutput;
}

// begin dateFormatFunction
function handlebarsFormatDateHelper(){
    Handlebars.registerHelper('dateFormat', function(context, block) {
        if (window.moment) {
            return takeTime(context);
        }else{
            return context;
        };
    });
}

// function to set decimal to fixed
function handlebarsSetDecimalToFixedHelper(){
    Handlebars.registerHelper('fixedPlace', function(context, options) {
        var out = (context * 100).toFixed(3);
        return out + '%';
    });
}