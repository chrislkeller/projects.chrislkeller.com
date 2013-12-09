// make sure the spreadsheet is published to the web
//var dataSpreadsheet = '0Aq8qwSArzKP9dExrQV9QUFh3ODFTY2RWSERRYWFPOVE';
var dataSpreadsheet = '0AmYzu_s7QHsmdE5OcDE1SENpT1g2R2JEX2tnZ3ZIWHc';

// the sheet being queried
//var dataSheet = 'contacts';
var dataSheet = 'Cats';

    // You need to declare the tabletop instance separately, then feed it into the model/collection.
    // You *must* specify 'wait: true' so that it doesn't try to fetch data when you initialize.

    var dataSource = Tabletop.init({
        key: dataSpreadsheet,
        //callback: retriveData,
        //parseNumbers: true,
        //simpleSheet: false,
        debug: true,
        wait: true
    });

    // define the model
    // Need to specify that you'd like to sync using Backbone.tabletopSync
    // Can specify tabletop attributes, or you can do it on the collection
    var Cat = Backbone.Model.extend({
        idAttribute: 'name',
        tabletop: {
            instance: dataSource,
            sheet: dataSheet
        },
        sync: Backbone.tabletopSync
    });

    // define the collection the model belongs to
    // Need to specify that you'd like to sync using Backbone.tabletopSync
    // Need to specify a tabletop key and sheet
    var Collection = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Cat,
        tabletop: {
            instance: dataSource,
            sheet: dataSheet
        },
        sync: Backbone.tabletopSync
    });


    // define a view of a person
    var CatView = Backbone.View.extend({

        // wraps view in an element
        tagname: 'div',

        // wraps the div in a class
        className: "person-container",

        // identifies the template
        template: $('#person-template').html(),

        // renders the template
        render: function() {
            var source = this.template;
            var template = Handlebars.compile(source);
            var html = template(this.model.toJSON());
            $(this.el).html(html);
            return this;
        }
    });


    // You need to initialize Tabletop before you do aaaaanything.
    // You might think it'd be a good idea to put that into backbone.tabletopSync,
    // but IMHO the fact that you could put the key/url into any model anywhere
    // ever sounds like trouble.

    $(document).ready( function() {
        var cats = new Collection();
        cats.fetch({
            success: showInfo
        })
    });

    function showInfo(cats) {

        var boscoView = new CatView({
            model: cats.get('Bosco')
        });

        console.log(boscoView);

        boscoView.el = $('#content');
        boscoView.render();
    }