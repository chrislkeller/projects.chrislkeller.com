<?php
	class Mumrik {
		function Mumrik(){
			if ( function_exists('register_sidebar') ) {
				register_sidebar(array('name'=>'sidebar1',
					'before_widget' => '<div class="widget">',
					'after_widget' => '</div>',
					'before_title' => '<h4>',
					'after_title' => '</h4>',
				));
			}

				$ad_support = function_exists('administer_main');
				

					if(get_option('mumrik_show_ads_placeholders')) {
						update_option('mumrik_show_ads_placeholders', $ad_support);
					} else {
						add_option('mumrik_show_ads_placeholders', $ad_support, '', 'no');
					}

		}
	}
?>