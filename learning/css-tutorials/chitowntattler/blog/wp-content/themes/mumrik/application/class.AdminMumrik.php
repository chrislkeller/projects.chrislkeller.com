<?php 
class AdminMumrik {
	
	function AdminMumrik(){
		add_action('admin_menu', array(&$this, 'admin_menu'));
		
		//Set ad array as default
		//if(!is_array(get_option('mumrik_sidebar_ads'))) {
		//	add_option('mumrik_sidebar_ads', array('', '', '', ''));
		//}
		
		if(!get_option('mumrik_featured_category_id')) {
			add_option('mumrik_featured_category_id', '-1');
		}
		
		if(!get_option('mumrik_feedburner_integration')) {
			add_option('mumrik_feedburner_integration', '-1');
		}
		
		if(!get_option('mumrik_feedburner_url')) {
			add_option('mumrik_feedburner_url', '');
		}
		
		if(!get_option('mumrik_feedburner_id')) {
			add_option('mumrik_feedburner_id', '');
		}
		
		if(!get_option('mumrik_feedburner_stats')) {
			add_option('mumrik_feedburner_stats', false);
		}
		
		if(!get_option('mumrik_feedburner_show_count')) {
			add_option('mumrik_feedburner_show_count', '-1');
		}
		
		if(!get_option('mumrik_google_analytics_id')) {
			add_option('mumrik_google_analytics_id', '');
		}
		
		
	}
	
	function admin_menu() {
		//add_theme_page( page_title, menu_title, access_level/capability, file, [function]);
		add_theme_page('Mumrik Theme Settings', 'Mumrik Settings', 'edit_themes', "mumrik_admin_theme_page", array(&$this, 'admin_ui'));
	}
	
	function admin_ui(){
		if ($_POST['action'] == 'save') {
			$this->store_settings();
		}
		require_once(TEMPLATEPATH . '/templates/admin_theme_page.php');
	}
	
	function store_settings(){
		//print_r($_POST);
		/*
		if(isset($_POST['ad_code'])) {
			update_option('mumrik_sidebar_ads', $_POST['ad_code']);
		}
		*/
		
		if(isset($_POST['featured_category_id'])) {
			update_option('mumrik_featured_category_id', $_POST['featured_category_id']);
		}
		
		if(isset($_POST['mumrik_feedburner_integration']) && $_POST['mumrik_feedburner_integration'] == '1') {
			update_option('mumrik_feedburner_integration', '1');
		} else {
			update_option('mumrik_feedburner_integration', '-1');
		}
		
		if(isset($_POST['mumrik_feedburner_url'])) {
			update_option('mumrik_feedburner_url', $_POST['mumrik_feedburner_url']);
			
		}
		
		if(isset($_POST['mumrik_feedburner_id'])) {
			update_option('mumrik_feedburner_id', $_POST['mumrik_feedburner_id']);
		}
		
		if(isset($_POST['mumrik_feedburner_stats']) && $_POST['mumrik_feedburner_stats'] == '1') {
			update_option('mumrik_feedburner_stats', true);
		} else {
			update_option('mumrik_feedburner_stats', false);
		}
		
		if(isset($_POST['mumrik_google_analytics_id'])) {
			update_option('mumrik_google_analytics_id', $_POST['mumrik_google_analytics_id']);
		}
		//die();
	}
}
?>