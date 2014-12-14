(function(){

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {},
    };

    $(function(){
        window.app = new App.Router();
        Backbone.history.start({
            root: "/",
            pushState: false,
        });
    });

})();

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
        id: null,
    }
});

App.Collections.Exemptions = Backbone.Collection.extend({

    model: App.Models.Exemption,

    url: "data/exemption-data.json",

    initialize: function() {
        this.index = lunr(function(){
            this.field("exemptiontext", {boost: 10})
            this.field("recordtype", {boost: 10})
            this.field("agencyname", {boost: 5})
            this.field("exemptiontype")
            this.field("legalchapter")
            this.field("penaltyforrelease")
            this.field("protectedmaterial")
            this.field("recordsexempted")
            this.field("statutenumber")
            this.ref("id")
        });
    },

    parse: function(items){
        var self = this;
        _(items).each(function(item){
            self.index.add(item);
        });
        return items;
    },

    filter: function(term){
        var self = this;
        // lunr returns an array of objects, we map over them and replace the lunr ref with the actual model
        var results = _(this.index.search(term)).map(function(r){
            return self.get(r.ref);
        });
        // return the matching models from our collection
        return results;
    },

    comparator: function(model) {
        return model.get("recordtype");
    },

    unique: function(collection, value){
        var results = _.uniq(collection.pluck(value));
        return results;
    }
});

App.Router = Backbone.Router.extend({

    routes: {
        "": "renderApplicationIndex",
    },

    renderApplicationIndex: function(){
        if (this.ApplicationIndex){
            this.ApplicationIndex.remove();
        };
        this.ApplicationIndex = new App.Views.ApplicationIndex();
        return this.ApplicationIndex;
    }

});

App.Views.ApplicationIndex = Backbone.View.extend({

    el: ".search-terms",

    template: _.template("\
        <div class='row'>\
            <div class='col-md-12'>\
                <h1>State Secrets <small>Try these in the box above!</small></h1>\
                <ul class='list-inline'>\
                    <% _.each(collection, function(item) { %>\
                        <% if (item != '') { %>\
                            <li><a href='javascript:void(0)'><%= item %></a></li>\
                        <% } %>\
                    <% }); %>\
                </ul>\
            </div>\
        </div>\
    "),

    initialize: function(){
        this.exemptionCollection = new App.Collections.Exemptions();
        this.exemptionCollection.fetch({
            async: false
        });
        this.render();
    },

    events: {
        "click .list-inline li a": "queryClickedSearchTerm",
        "keyup :input": "queryUserSearchTerm",
        "click #submit": "filterAndDisplayObjects",
    },

    render: function(){
        var uniqueRecords = this.exemptionCollection.unique(this.exemptionCollection, "recordtype");
        $(".search-terms").html(this.template({
            collection: uniqueRecords
        }));
    },

    queryClickedSearchTerm: function(event){
        var termToQuery = event.target.innerText;
        $("#search-term").val(termToQuery);
        this.filterAndDisplayObjects(termToQuery);
    },

    queryUserSearchTerm: function(event){
        if(event.keyCode === 13) {
            var termToQuery = $("#search-term").val().toLowerCase();
            this.filterAndDisplayObjects(termToQuery);
        } else {
            return false;
        }
    },

    filterAndDisplayObjects: function(termToQuery){
        $(".data-display").empty();
        var results = this.exemptionCollection.filter(termToQuery);
        $(".data-display").append("<h3>We found " + results.length + " possible exemptions.</h3>");
        _(results).each(function(r) {
            $(".data-display").append(
                "<div class='content'>" +
                    "<p><strong>Agency name:</strong> " + r.attributes.agencyname + "</p>" +
                    "<p><strong>Exemption text:</strong> " + r.attributes.exemptiontext + "</p>" +
                    "<p><strong>Exemption type:</strong> " + r.attributes.exemptiontype + "</p>" +
                    "<p><strong>Legal chapter:</strong> " + r.attributes.legalchapter + "</p>" +
                    "<p><strong>Penalty for release:</strong> " + r.attributes.penaltyforrelease + "</p>" +
                    "<p><strong>Protected material:</strong> " + r.attributes.protectedmaterial + "</p>" +
                    "<p><strong>Records exempted:</strong> " + r.attributes.recordsexempted + "</p>" +
                    "<p><strong>Record type:</strong> " + r.attributes.recordtype + "</p>" +
                    "<p><strong>Statute number:</strong> " + r.attributes.statutenumber + "</p>" +
                    "<p><strong>ID:</strong> " + r.attributes.id + "</p>" +
                "</div>" +
                "<hr></hr>"
            );
        });
    }
});