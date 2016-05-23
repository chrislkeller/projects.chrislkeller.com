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

App.Models.StarredRepo = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        full_name: null,
        owner: null,
        html_url: null,
        description: null,
        issue_events_url: null,
        updated_at: null,
        ssh_url: null,
        clone_url: null,
        language: null,

        private: null,
        fork: null,
        url: null,
        forks_url: null,
        keys_url: null,
        collaborators_url: null,
        teams_url: null,
        hooks_url: null,
        events_url: null,
        assignees_url: null,
        branches_url: null,
        tags_url: null,
        blobs_url: null,
        git_tags_url: null,
        git_refs_url: null,
        trees_url: null,
        statuses_url: null,
        languages_url: null,
        stargazers_url: null,
        contributors_url: null,
        subscribers_url: null,
        subscription_url: null,
        commits_url: null,
        git_commits_url: null,
        comments_url: null,
        issue_comment_url: null,
        contents_url: null,
        compare_url: null,
        merges_url: null,
        archive_url: null,
        downloads_url: null,
        issues_url: null,
        pulls_url: null,
        milestones_url: null,
        notifications_url: null,
        labels_url: null,
        releases_url: null,
        created_at: null,
        pushed_at: null,
        git_url: null,
        svn_url: null,
        homepage: null,
        size: null,
        stargazers_count: null,
        watchers_count: null,
        has_issues: null,
        has_downloads: null,
        has_wiki: null,
        has_pages: null,
        forks_count: null,
        mirror_url: null,
        open_issues_count: null,
        forks: null,
        open_issues: null,
        watchers: null,
        default_branch: null
    }
});

App.Collections.StarredRepos = Backbone.Collection.extend({

    model: App.Models.StarredRepo,

    /*
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
    */

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

    /*
    el: ".search-terms",
    */

    template: _.template("\
        <div class='row'>\
            <div class='col-lg-12'>\
                <% _.each(collection, function(item) { %>\
                    <h3><%= item.attributes.language %></h3>\
                    <p><%= item.attributes.name %></p>\
                    <p><%= item.attributes.full_name %></p>\
                    <p><%= item.attributes.owner.login %></p>\
                    <p><%= item.attributes.owner.html_url %></p>\
                    <p><%= item.attributes.owner.gists_url %></p>\
                    <p><%= item.attributes.html_url %></p>\
                    <p><%= item.attributes.description %></p>\
                    <p><%= item.attributes.issue_events_url %></p>\
                    <p><%= item.attributes.updated_at %></p>\
                    <p><%= item.attributes.ssh_url %></p>\
                    <p><%= item.attributes.clone_url %></p>\
                    <hr>\
                <% }); %>\
            </div>\
        </div>\
    "),

    initialize: function(){
        var rootUrl = "https://api.github.com/users/chrislkeller/starred?direction=asc&page=";

        this.containerCollection = new App.Collections.StarredRepos();
        this.containerCollection.fetch({
            url: rootUrl + 1,
            async: false,
        });

        this.repoCollection = new App.Collections.StarredRepos();
        for (var i=1; i<15; i++) {
            this.repoCollection.fetch({
                url: rootUrl + i,
                async: false,
            });
            this.containerCollection.add(this.repoCollection.models);
        };
        this.render();
    },



    render: function(){
        console.log(this.containerCollection);
        //var uniqueRecords = this.exemptionCollection.unique(this.exemptionCollection, "recordtype");
        $(".data-visuals").html(this.template({
            collection: this.containerCollection.models
        }));
    },



    /*
    events: {
        "click .list-inline li a": "queryClickedSearchTerm",
        "keyup :input": "queryUserSearchTerm",
        "click #submit": "filterAndDisplayObjects",
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
    */

});