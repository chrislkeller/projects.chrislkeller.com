App.Models.Exemption = Backbone.Model.extend({
    defaults: {
        type: null,
    }
});

App.Collections.Exemptions = Backbone.Collection.extend({
    model: App.Models.Exemption,
    url: "data/exemption-data.json",
    comparator: function(model) {
        return model.get("text");
    }
});

App.Router = Backbone.Router.extend({

    initialize: function(){},

    routes: {
        "": "renderApplicationVisuals",
    },

    renderApplicationVisuals: function(){
        if (this.applicationVisuals){
            this.applicationVisuals.remove();
        };
        this.applicationVisuals = new App.Views.ApplicationVisuals({
            container: ".data-visuals"
        });
        return this.applicationVisuals;
    }

});

App.Views.ApplicationVisuals = Backbone.View.extend({

    template: template("templates/data-visuals.html"),

    el: ".data-visuals",

    initialize: function(viewObject){
        this.exemptionCollection = new App.Collections.Exemptions();
        this.exemptionCollection.fetch({
            async: false
        });
        this.render(viewObject);
    },

    events: {
        "keyup :input": "queryEnteredIntoSearch",
        "click #submit": "searchObjects",
    },

    queryEnteredIntoSearch: function(event){
        if(event.keyCode != 13) {
            return false;
        } else if (event.keyCode === 13) {
            return false;
        } else {
            this.searchObjects();
        }
    },

    searchObjects: function (){
        $(".data-display").empty();
        var termToQuery = $("#search-term").val().toLowerCase();
        var myFilteredCollection = this.exemptionCollection.filter(function(model){
            return _.any(model.attributes, function(val, attr) {
                if (val != null){
                    var test = ~val.indexOf(termToQuery);
                        console.log(test);
                    if (test < 0){
                        console.log(val);
                        return val;
                    }
                } else {
                    return false;
                }
            });
        });

        this.appendToView(myFilteredCollection);

    },

    appendToView: function(myFilteredCollection){

        $(".data-display").append("<h3>Displaying " + myFilteredCollection.length + " results</h3>");

        for (var i=0; i<myFilteredCollection.length; i++) {

            var data = myFilteredCollection[i].attributes;

            $(".data-display").append(
                "<div class='content'>" +
                    "<p>" + data.agency + "</p>" +
                    "<p>" + data.chapter + "</p>" +
                    "<p>" + data.orsnumber + "</p>" +
                    "<p>" + data.penalty + "</p>" +
                    "<p>" + data.protectedmaterial + "</p>" +
                    "<p>" + data.recorddescription + "</p>" +
                    "<p>" + data.relatedsubject + "</p>" +
                    "<p>" + data.text + "</p>" +
                    "<p>" + data.topic + "</p>" +
                    "<p>" + data.type + "</p>" +
                "</div>" +
                "<hr></hr>"
            );

        };

    },


    render: function(viewObject){
        $(viewObject.container).html(_.template(this.template));
    }

});