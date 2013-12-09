App.Views.Legislator = Backbone.View.extend({
    tagName: "li",

    template: template('list-template'),

    events: {
        'click a' : 'navigate'
    },

    navigate: function(e){
        e.preventDefault();
        window.app.navigate('#legislator/' + this.model.id, {
            trigger: true,
            replace: false,
        });
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

App.Views.Legislators = Backbone.View.extend({
    tagName: "ul",

    initialize: function(){
        this.collection.on("reset", this.render, this);

    },

    render: function(){
        this.addAll();
    },

    addOne: function(item){
        var itemView = new App.Views.Legislator({
            model: item
        });
        this.$el.append(itemView.render().el);
    },

    addAll: function(){
        this.collection.forEach(this.addOne, this);
    }
});