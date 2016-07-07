var settings = settings || {};
var fn = fn || {};

// begin main function
$(document).ready(function(){
    fn.initialize();
});
// end main function

// default configuration options
var settings = {

    // add the key from your Google spreadsheet if the dataSource is set to tabletop.
    search_housing_key: "1BRB7KS5tCNMBqncFit0AfXMRjkxG0IbqLZAOXXd6o7Q",

    search_academic_key: "15YF1Ji4S0ry6EbJlWcJB3ILcVf8O38ZA1ZEkZReOTd8",

    // the div id in which the table will be displayed.
    tableElementContainer: "#demo",

    columns: [{
        "data": "first_name",
        "title": "First Name"
    }, {
        "data": "last_name",
        "title": "Last Name"
    }, {
        "data": "email",
        "title": "Email"
    }, {
        "data": "room_number",
        "title": "Room Number"
    }, {
        "data": "program",
        "title": "Program"
    }, {
        "data": "academic_track",
        "title": "Academic Track"
    }, {
        "data": "session",
        "title": "Session"
    }, {
        "data": "home_university",
        "title": "Home University"
    }],

    student_blueprint: {
        id: null,
        full_name: null,
        last_name: null,
        first_name: null,
        email: null,
        program: null,
        academic_track: null,
        session: null,
        home_university: null,
        email: null,
        status: null,
        check_in: null,
        check_out: null,
        test_route: null,
        residence_number: null,
        room_number: null,
    },

    // the table sorting method.
    // the first value is the zero-indexed column to sort on. the second value can be "asc" or "desc".
    tableOrder: [[ 1, "asc" ]],

    // needs to at least be set to a minimum of 10 needed to alter the per page select menu.
    pageLength: 10,

};

// begin main datatables object
var fn = {

    tabletop_data: [],

    initialize: function(){
        fn.retrieveTabletopObject(settings.search_housing_key);
        fn.retrieveTabletopObject(settings.search_academic_key);
        var checkExist = setInterval(function() {
            if (fn.tabletop_data.length > 0){
                clearInterval(checkExist);
                var relational_data = fn.relate_data_from(fn.tabletop_data);
                $(settings.tableElementContainer).html("<table cellpadding='0' cellspacing='0' border='0' class='display table table-bordered table-striped' id='data-table-container'></table>");
                $("#data-table-container").DataTable({
                    "autoWidth": false,
                    "data": relational_data,
                    "columns": settings.columns,
                    "order": settings.tableOrder,
                    "pageLength": settings.pageLength,
                    "pagingType": "full_numbers",
                    "paging": true,
                    "searching": true,
                    "info": true
                });
            }
        }, 5000);
    },

    retrieveTabletopObject: function(spreadsheetKey){
        Tabletop.init({
            key: spreadsheetKey,
            callback: function(data, tabletop){
                var data_key = tabletop.googleSheetName;
                fn.tabletop_data.push({data: data})
            },
            simpleSheet: true,
            parseNumbers: true,
            debug: true
        });
    },

    relate_data_from: function(arrays){
        var housing = arrays[0].data;
        var academic = arrays[1].data;
        var mergedList = _.map(housing, function(item){
            return _.extend(item, _.findWhere(academic, {id: item.id}));
        });
        return mergedList;
    },
};
