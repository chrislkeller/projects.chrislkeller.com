    $(document).ready(function() {
        $('.content').hide();
        $('a.slick-toggle').click(function() {
            $(this).text($(this).text() == 'Read More' ? 'Close' : 'Read More')
                   .parent().nextAll('.content').slideToggle(200);
            return false;
        });
    }); 