    var jqueryNoConflict = jQuery;
    var fn = fn || {};

    // pull data from spreadsheet onload
    jqueryNoConflict(document).ready(function(){
        fn.retrieveData();
    });

    // begin data configuration object
    var fn = {

        dinnerTime: {
            entrees: null,
            sides: null,
            vegetables: null
        },

        retrieveData: function(){
            Tabletop.init({
                key: '0An8W63YKWOsxdG1wYlkxb20zRjdBd2x2b1pOOVNxMWc',
                callback: fn.processData,
                parseNumbers: true,
                simpleSheet: false,
                debug: false
            });
        },

        processData: function(data, tabletop){
            fn.dinnerTime.entrees = _.pluck(data.entrees.elements, 'entrees');
            fn.dinnerTime.sides = _.pluck(data.sides.elements, 'sides');
            fn.dinnerTime.vegetables = _.pluck(data.vegetables.elements, 'vegetables');
            fn.getIdOfButtonClicked();
        },

        chosenMeal: {
            entrees: null,
            sides: null,
            vegetables: null
        },

        // get the id of a bill container on click
        getIdOfButtonClicked: function(){
            jqueryNoConflict('.meal-generator').click(function(){
                fn.generateRandomMeal(jqueryNoConflict(this).attr('id'));
            });
        },

        generateRandomMeal: function(component){
            var mealComponentArray = _.result(fn.dinnerTime, component);
            var randomComponent = Math.floor(mealComponentArray.length * Math.random());
            var displayElement = '#' + component + '-value';
            jqueryNoConflict(displayElement).html(mealComponentArray[randomComponent]);
        },

        addMealToList: function(output){
            fn.chosenMeal.entrees = jqueryNoConflict('#entrees-value').text();
            fn.chosenMeal.sides = jqueryNoConflict('#sides-value').text();
            fn.chosenMeal.vegetables = jqueryNoConflict('#vegetables-value').text();

            var menuListItem = '<li>' + fn.chosenMeal.entrees + ' with ' + fn.chosenMeal.sides + ' and ' + fn.chosenMeal.vegetables + '</li>';
            jqueryNoConflict('h2.hidden').removeClass('hidden');
            jqueryNoConflict('#formatted-output').append(menuListItem);
            jqueryNoConflict('#meal-plan').removeClass('hidden');

        },

        e_friend: function(email_address, subject){
            var body_text = jqueryNoConflict('#formatted-output').text();
            window.location='mailto:' + email_address + '?subject=Dinner plans this week?&body=' + body_text + '\n';
        }

    }