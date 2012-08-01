    //begin function
    function header(){
    
        // path to template
        getTemplateAjax('./templates/safetyHeader.handlebars', function(template) {

            // path to data/content/info
            headerData = {title: "Latest Madison Fire Department Reports"}
            
            // div to place template into
            mapNoConflict('#header').html(template(headerData));
        })

    }
    //end function
