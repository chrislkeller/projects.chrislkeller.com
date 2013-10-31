(function(){

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {}
    };

    window.template = function(id){
        return _.template( $('#' + id).html());
    };

    App.Models.Song = Backbone.Model.extend({
        defaults: {
            song: 'song',
            date: 2013,
            venue: 'home'
        }
    });

    App.Collections.Songs = Backbone.Collection.extend({
       model: App.Models.Song
    });

    App.Views.Songs = Backbone.View.extend({
        tagName: 'tbody',

        initialize: function(){
          this.collection.on('add', this.addOne, this);
        },

        addOne: function(song){
            var songView = new App.Views.Song({model: song});
            this.$el.append(songView.render().el);
        },

        render: function(){
            this.collection.each(this.addOne, this);
            return this;
        }
    });

    App.Views.Song = Backbone.View.extend({
        tagName: 'tr',

        template: template('song_template'),

    	initialize: function(){
    		this.model.on('change', this.render, this);
    		this.model.on('destroy', this.remove, this);
    	},

        events: {
            'click .edit': 'editSong',
            'click .save': 'saveSong',
            'click .delete': 'destroySong'
        },

        editSong: function(){
            $('td.editable', this.el).each(function() {
                $(this).html('<input type="text" class="form-control" value="' + $(this).html() + '" />');
            });

            $('td button.edit', this.el).each(function() {
                $(this).addClass('hidden');
            });

            $('td button.save', this.el).each(function() {
                $(this).removeClass('hidden');
            });
        },

        saveSong: function(){
            var values = {};
            $('td.editable input', this.el).each(function(index, element) {
                values[index] = $(element).val();
            });
            this.model.set({
                'song': values[0],
                'date': values[1],
                'venue': values[2]
            });
        },

        destroySong: function(){
            if (confirm('Are you sure to delete?')){
                this.model.destroy();
            }
        },

        remove: function(){
            this.$el.remove();
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    App.Views.AddSong = Backbone.View.extend({
        el: '#addSong',
        events: {
            'submit': 'submit'
        },

        submit: function(e){
            e.preventDefault();
            var newSong = $(e.currentTarget).find('input#song').val();
            var newDate = $(e.currentTarget).find('input#date').val();
            var newVenue = $(e.currentTarget).find('input#venue').val();
            var song = new App.Models.Song({song: newSong, date: newDate, venue: newVenue});
            this.collection.add(song);
            $('#addPerson :input').val('');
        }
    });

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'show/:id': 'show'
        },

        /*
        index: function(){
            $(document.body).append("Index route has been called...");
        },

        show: function(id){
            $(document.body).append("Show route has been called with an id of " + id);
        }
        */

    });

    // pulls initial data from an external source
    new App.Router;
    Backbone.history.start();
    var songsCollection = new App.Collections.Songs(songData);
    var addSongView = new App.Views.AddSong({ collection: songsCollection });
    var songsView = new App.Views.Songs({collection: songsCollection});
    $('table').append(songsView.render().el);
})();