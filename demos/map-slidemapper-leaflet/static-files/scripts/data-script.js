// begin main function
$(document).ready(function() {
    retriveData();
});

// grab data
function retriveData() {

/*
    var dataSource = 'https://www.publicinsightnetwork.org/air2/public/search?a=6f4d503616e1115157a64bd26b51aec7&q=query_uuid:5bf1fe369f0e&t=JSON';
*/

    var dataSource = 'static-files/data/dear_mayor_master_data_sheet-handlebars.json';
    $.getJSON(dataSource, processDataForMap);
}

// render data visuals template
function processDataForMap(data){
    var slide_objects = [];
    for (var i=0; i<data.objects.length; i++) {
        var data_results = data.objects[i];

        var marker_object = {
            icon: data_results.icon,
            map_marker: data_results.marker,
            marker: [
                offsetLocation(data_results.primarycity, data_results.primarylat),
                offsetLocation(data_results.primarycity, data_results.primarylong)
            ],
            center: [
                offsetLocation(data_results.primarycity, data_results.primarylat),
                offsetLocation(data_results.primarycity, data_results.primarylong)
            ],
            html: '<div class="row-fluid">' +
                '<div class="span12">' +
                    '<p><img src="' + data_results.marker + '" /><span class="kicker"> ' + data_results.responsesf6d5d1c2d738 + '</p>' +
                    '<p><strong>' + data_results.srcfirstname + ' ' + data_results.srclastname + '</strong> from ' + data_results.primarycity + ':<br />' +
                        '<p><strong>' + data_results.questions9200af1a79cbvalue + '</strong><br />' + data_results.responses9200af1a79cb + '</p>' +
                    '<p class="data-instructions"><strong>Submitted</strong>: ' + takeTime(data_results.srsdate) + '</p>' +
                '</div>',
            popup:  '<p>' + data_results.responsesf6d5d1c2d738 + ' in<br/> ' + data_results.primarycity + '</p>'
        };

        slide_objects.push(marker_object);
    }
    map_slider_data(slide_objects);
}

function map_slider_data(dataSourceToDisplay) {

    var slide_map = $('#mapper').slideMapper({
        controlType: 'top',
        autoHeight: 'true',
        center: [34.036054430724114, -118.26595796365973],
        zoom: 10,
        maxZoom: 14,
        mapHeight: 600,
        leafPile: true,
        mapType: 'stamen-toner',
        mapPosition: 'top'
    });

    slide_map.slideMapper('add', dataSourceToDisplay);
}

// format date/time
function takeTime(dateInput) {
    var dateOutput = moment(dateInput).fromNow();
    return dateOutput;
}

// function to evaluate topic and assign icon image
function offsetLocation(value_to_evaluate, current_location){
    var new_location;
    var offset_choice = [
        0.0123450,
        0.0234560,
        0.0345670,
        0.0456780
    ];

    var idx = Math.floor(offset_choice.length * Math.random());

    if  (value_to_evaluate === 'Los Angeles'){
        new_location = current_location - offset_choice[idx];
    } else {
        new_location = current_location;
    }

    return new_location;
}