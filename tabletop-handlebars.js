var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0An8W63YKWOsxdC1rbVVTUGRUdXBwTHY3SHNnSFZrNWc&output=html';

    $(document).ready(function(){
        Tabletop.init({key: public_spreadsheet_url,
        callback: showInfo,
        parseNumbers: true } );
    });

    function showInfo(data, tabletop){
        var source   = $("#cat-template").html();
        var template = Handlebars.compile(source);

        $.each( tabletop.sheets("Sheet1").all(), function(i, data) {
            var html = template(data);
            $("#content").append(html);
        });
    };