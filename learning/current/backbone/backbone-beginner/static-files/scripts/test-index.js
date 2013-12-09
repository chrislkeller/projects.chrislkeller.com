// Stub out the person model
var Person = Backbone.Model.extend({
});

// Create a collection of persons
var People = Backbone.Collection.extend({
    model: Person
});

// Define the view for a single person
var PersonView = Backbone.View.extend({

    render: function() {
        // This is method that can be called
        // once an object is init. You could
        // also do this in the initialize event
        var source = $('#PersonTemplate').html();
        var template = Handlebars.compile(source);
        var html = template(this.model.toJSON());
      $(this.el).html(html);

    }
});

// Define the view for People
var PeopleView = Backbone.View.extend({
    render: function() {
        // This is method that can be called
        // once an object is init. You could
        // also do this in the initialize event
        var source = $('#PeopleTemplate').html();
        var template = Handlebars.compile(source);
        var html = template(this.collection.toJSON());
        $(this.el).html(html);
    },

    initialize: function(){
        this.collection.on('add', this.render, this)
    }
});

// Create instance of People Collection
var people = new People();

// Create new instances of the person models
var person = new Person({name: "Tim", age: 5});
var person2 = new Person({name: "Jill", age: 15});

// Create instances of the views
var personView = new PersonView({
    model: person
});
var peopleView = new PeopleView({
    collection: people
});

$(document).ready(function(){
    // We have to do this stuff in the dom ready
    // so that the container objects get built out

    // Set el of the views.
    personView.el = $('#personContainer');
    peopleView.el = $('#peopleContainer');

    // Add them to a new instance of the people collection
    people.add(person);
    people.add(person2);

    // Render the views.  If you are using the initialize
    // method then you do not have to do this step.
    personView.render();
    //peopleView.render();

    // Try on console!
    // people.add(new Person({name: 'Rames', age:'23'}));

});