<?php
	require_once(TEMPLATEPATH . '/application/class.Mumrik.php');
	
	if(is_admin()) {
		require_once(TEMPLATEPATH . '/application/class.AdminMumrik.php');
		$admin = new AdminMumrik();
	}
	
	
	$mumrik = new Mumrik();
	
?>