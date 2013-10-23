//OPENS FLYOUT MENU
        $j(document).ready(function() {

            $j(".contact").click(function(e) {          
				e.preventDefault();
                $j("fieldset#contact-menu").toggle();
				$j(".contact").toggleClass("menu-open");
            });
			
			$j("fieldset#contact-menu").mouseup(function() {
				return false
			});
			$j(document).mouseup(function(e) {
				if($j(e.target).parent("a.contact").length==0) {
					$j(".contact").removeClass("menu-open");
					$j("fieldset#contact-menu").hide();
				}
			});			
			
        });