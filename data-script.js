var jqueryNoConflict = jQuery;

//begin main function
jqueryNoConflict(document).ready(function(){
    renderYourTemplate();
});
//end

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

// create header template
function renderYourTemplate(){
    var data = {
        users: [
            {username: "alan", firstName: "Alan", lastName: "Johnson", age: "26", email: "alan@test.com" },
            {username: "allison", firstName: "Allison", lastName: "House", age: "35", email: "allison@test.com" },
            {username: "ryan", firstName: "Ryan", lastName: "Carson", age: "50", email: "ryan@test.com" }
        ]
    };

    getTemplateAjax('template.handlebars', function(template) {
        jqueryNoConflict('#main-content').html(template(data));
    })
};
// end