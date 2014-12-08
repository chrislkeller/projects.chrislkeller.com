App.Utils.filterCollection = function(collection, filterValue){
    if (filterValue == "") return [];
    return collection.filter(function(data) {
        return _.some(_.values(data.toJSON()), function(value) {
           if (_.isNumber(value)) value = value.toString();
           if (_.isString(value)) return value.indexOf(filterValue) != -1;
           return false;
        });
    });
};

Backbone.Collection.prototype.filterValues = function(filterValues) {
    return App.Utils.filterCollection(this, filterValues);
}

App.Models.Exemption = Backbone.Model.extend({
    defaults: {
        agencyname: null,
        exemptiontext: null,
        exemptiontype: null,
        legalchapter: null,
        penaltyforrelease: null,
        protectedmaterial: null,
        recordsexempted: null,
        recordtype: null,
        statutenumber: null,
        uid: null,
    }
});

App.Collections.Exemptions = Backbone.Collection.extend({
    model: App.Models.Exemption,
    url: "data/exemption-data.json",
    comparator: function(model) {
        return model.get("uid");
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
        "click #submit": "filterObjects",
    },

    queryEnteredIntoSearch: function(event){
        if(event.keyCode != 13) {
            return false;
        } else if (event.keyCode === 13) {
            return false;
        } else {
            this.filterObjects();
        }
    },

    filterObjects: function (){
        var termToQuery = $("#search-term").val().toLowerCase();
        this.applicationResults = new App.Views.ApplicationResults();
        this.applicationResults.collection = this.exemptionCollection.filterValues(termToQuery);
        this.applicationResults.render();
    },

    render: function(viewObject){
        $(viewObject.container).html(_.template(this.template));
    }

});

App.Views.ApplicationResults = Backbone.View.extend({

    template: template("templates/data-results.html"),

    tagName: "div",

    className: "item-content",

    el: ".data-display",

    initialize: function(){
        _.bindAll(this, "render");
    },

    render: function(){
        this.$el.empty();

        /*
        var self = this;
        _.each(this.collection, function(model){
            var content = _.template(self.template, model.toJSON());
            console.log(content);
            $(".data-display").append(content);
        });
        */


        $(".data-display").append("<h3>We found " + this.collection.length + " possible exemptions.</h3>");
        for (var i=0; i<this.collection.length; i++) {
            var data = this.collection[i].attributes;
            $(".data-display").append(
                "<div class='content'>" +
                    "<p><strong>Agency name:</strong> " + data.agencyname + "</p>" +
                    "<p><strong>Exemption text:</strong> " + data.exemptiontext + "</p>" +
                    "<p><strong>Exemption type:</strong> " + data.exemptiontype + "</p>" +
                    "<p><strong>Legal chapter:</strong> " + data.legalchapter + "</p>" +
                    "<p><strong>Penalty for release:</strong> " + data.penaltyforrelease + "</p>" +
                    "<p><strong>Protected material:</strong> " + data.protectedmaterial + "</p>" +
                    "<p><strong>Records exempted:</strong> " + data.recordsexempted + "</p>" +
                    "<p><strong>Record type:</strong> " + data.recordtype + "</p>" +
                    "<p><strong>Statute number:</strong> " + data.statutenumber + "</p>" +
                    "<p><strong>UID:</strong> " + data.uid + "</p>" +
                "</div>" +
                "<hr></hr>"
            );
        };


    }
});