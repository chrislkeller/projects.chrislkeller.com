App.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "legislator/:id": "show"
    },

    show: function(id){
        var model = window.appView.legislatorCollection.get(id);
        window.appView.detailView.setModel(model);
    }
});