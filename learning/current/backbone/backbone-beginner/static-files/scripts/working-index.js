(function($){

    var contacts = [
        { name: "Contact 1", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 2", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 3", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
        { name: "Contact 4", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
        { name: "Contact 5", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 6", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
        { name: "Contact 7", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
        { name: "Contact 8", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" }
    ];

    // define product model
    var Contact = Backbone.Model.extend({
        defaults: {
            photo: "static-files/img/placeholder.png",
            name: "",
            address: "",
            tel: "",
            email: "",
            type: ""
        }
    });

    // define directory collection
    var Directory = Backbone.Collection.extend({
        model: Contact
    });

    // define individual contact view
    var ContactView = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",

        // ids template on the page
        template: $('#PersonTemplate').html(),

        // compiles and renders handlebars template
        // returns to the master directory view

        render: function() {
            // This is method that can be called
            // once an object is init. You could
            // also do this in the initialize event
            var source = this.template;
            var template = Handlebars.compile(source);
            var html = template(this.model.toJSON());
            $(this.el).html(html);
            return this;
        },

        events: {
            "click button.delete": "deleteContact"
        },

        // delete a contact
        deleteContact: function(){
            var removedType = this.model.get("type").toLowerCase();

            // remove model
            this.model.destroy();

            // remove view from page
            this.remove();

            // re-render select if no more of deleted type
            if (_.indexOf(directory.getTypes(), removedType) === -1){
                directory.$el.find("#filter select").children("[value='" + removedType + "']").remove();
            }
        }
    });

    // define master view
    var DirectoryView = Backbone.View.extend({
        el: $("#contacts"),

        // functions to queue or run when page loads
        initialize: function(){
            this.collection = new Directory(contacts);
            this.render();
            this.$el.find("#filter").append(this.createSelect());
            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.renderContact, this);
            this.collection.on("remove", this.removeContact, this);
        },

        render: function(){
            this.$el.find("article").remove();

            _.each(this.collection.models, function(item){
                this.renderContact(item);
            }, this);
        },

        renderContact: function(item){
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        },

        /* accepts an array as an argument and returns a new array containing only unique items
        The array we pass into the uniq() method is generated using Backbone’s pluck() method
        simple way to pull all values of a single attribute out of a collection of models
        The attribute we are interested in here is the type attribute */

        getTypes: function(){
            return _.uniq(this.collection.pluck("type"), false, function(type){
                return type.toLowerCase();
            });
        },

        createSelect: function(){
            var filter = this.$el.find("#filter"),
                select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function(item){
                var option = $("<option/>", {
                    value: item.toLowerCase(),
                    text: item.toLowerCase()
                }).appendTo(select);
            });

            return select;
        },

        // this is where we add event handlers with a key value pair
        // the key is the event, the value is what to do
        events: {
            "change #filter select": "setFilter",
            "click #add": "addContact",
            "click #showForm": "showForm"
        },

        // Set filter property and fire change event
        setFilter: function(e){
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        // filter the view
        filterByType: function(){
            if (this.filterType === "all"){
                this.collection.reset(contacts);
                contactsRouter.navigate("filter/all");
            } else {
                this.collection.reset(contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function(item){
                        return item.get("type").toLowerCase() === filterType;
                    });

                this.collection.reset(filtered);

                contactsRouter.navigate("filter/" + filterType);
            }
        },

        // function to add a contact when event is triggered
        addContact: function(e){

            // use to prevent the default behaviour of the <button> element when it is clicked
            // so it doesn't reload the page
            e.preventDefault();

            // creates empty instance of our model
            var formData = {};

            // iterate over the value of each input element
            $("#addContact").children("input").each(function(i, el){

                /* check that the field has had text entered
                if so add new property with key equal to the id of
                the current element and a value equal to its current value
                if empty property will not be set and the new model will
                inherit any defaults that may have been specified */

                if ($(el).val() !== ""){
                    formData[el.id] = $(el).val();
                }
            });

            // update data store
            contacts.push(formData);

            /* update the <select> element so if new contact has different type
            that type is available for filtering */
            if (_.indexOf(this.getTypes(), formData.type) === -1) {
                this.collection.add(new Contact(formData));
                this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
            } else {
                this.collection.add(new Contact(formData));
            }
        },

        removeContact: function(removedModel){
            var removed = removedModel.attributes;

            // if model acquired default photo property, remove it
            if (removed.photo === "/img/placeholder.png"){
                delete removed.photo;
            }

            // remove from contacts array
            _.each(contacts, function(contact){
                if (_.isEqual(contact, removed)){
                    contacts.splice(_.indexOf(contacts, contact), 1);
                }
            });

        },

        // function to toggle the form when clicked
        showForm: function(){
            this.$el.find("#addContact").slideToggle();
        },

    });

    // define the router
    var ContactsRouter = Backbone.Router.extend({
        routes: {
            "filter/:type": "urlFilter"
        },

        urlFilter: function(type){
            directory.filterType = type;
            directory.trigger("change:filterType");
        }
    });

    // create instance of master view
    var directory = new DirectoryView();

    // create router instance
    var contactsRouter = new ContactsRouter();

    // start history service
    Backbone.history.start();

} (jQuery));