App.Views.DetailView = Backbone.View.extend({

    template: template('detail-template'),

    initialize: function(){

    },

    render: function(){
        //this.$el.html(this.model.get('html'));
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    setModel: function(model){
        this.model = model;

        var $this = this;

        if (!this.model.get('loaded')) {

            //$this.model.set('html', '<h2>id is ' + this.model.get('id') + ' and name is ' + this.model.get('first_name') + '</h2>');

            $this.model.set('loaded', true);

            $this.render();

        } else {

            $this.render();

        }
    }
});