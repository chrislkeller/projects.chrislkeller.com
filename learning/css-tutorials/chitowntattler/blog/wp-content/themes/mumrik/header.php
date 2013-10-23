<?php ############# BEGIN FILE ##################### ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>


<?php ############# BEGIN HEADER HERE ##################### ?>
<head>
<?php ############# BEGIN TITLE HERE ##################### ?>
<title>
<? wp_title(""); ?><?php if(strlen(wp_title("", false)) > 0) { echo " - "; } ?><?php bloginfo("name"); ?>
</title>
<?php ############# END TITLE HERE ##################### ?>

<?php ############# BEGIN META DATA HERE ##################### ?>
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<?php ############# END META DATA HERE ##################### ?>


<?php ############# BEGIN EXTERNAL JAVASCRIPT HERE ##################### ?>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.ui.1.5.min.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/mumrik.js"></script>
<?php ############# END EXTERNAL JAVASCRIPT HERE ##################### ?>	
	

<?php ############# BEGIN EXTERNAL CSS LINKS HERE ##################### ?>
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<?php wp_head(); ?>
</head>
<?php ############# END HEADER HERE ##################### ?>

<?php ############# BEGIN BODY HERE ##################### ?>
<body>
<?php ############# BEGIN MAIN DIV HERE ##################### ?>
<div id="Wrapper">

<?php ############# BEGIN LEADERBOARD AD DIV ##################### ?>
<div id="BigAd">
</div>
<?php ############# END LEADERBOARD AD DIV ##################### ?>

<?php ############# BEGIN PRIMARY HEADER HERE ##################### ?>
<div id="Header">
<p align="center"><img src="wp-content/images/Home.jpg" width="700" height="106" />

<?php ############# BEGIN SECONDARY HEADER HERE ##################### ?>
<!-- <div id="HeaderText">
</div> -->
<?php ############# END HEADER DIV HERE ##################### ?>

<?php ############# BEGIN RSS SUBSCRIPTION DIV HERE ##################### ?>
<div id="Subscription">
<!-- <a id="RSSButton" href="<?php bloginfo('rss2_url'); ?>">Subscribe to <?php bloginfo('name'); ?></a> -->
<?php ############# BEGIN ADDITIONAL SUBSCRIPTIONS HERE ##################### ?>
<div id="SubscriptionChooser">
<ul>
<li id="rss"><a href="<?php bloginfo('rss2_url'); ?>" title="Add <?php bloginfo("name"); ?> RSS to Your newsreader">Newsreader</a></li>
<li id="google-reader"><a href="http://fusion.google.com/add?feedurl=<?php bloginfo('rss2_url'); ?>" title="Add <?php bloginfo("name"); ?> RSS to Google Reader">Google Reader</a></li>
<li id="technorati"><a href="http://technorati.com/faves?sub=addfavbtn&add=<?php bloginfo("url"); ?>"><b>Technorati</b> Favorites</a></li>
<li id="my-yahoo"><a href="http://add.my.yahoo.com/rss?url=<?php bloginfo('rss2_url'); ?>" title="Add <?php bloginfo("name"); ?> RSS to My Yahoo!">My Yahoo!</a></li>
<li id="newsgator"><a href="http://www.newsgator.com/ngs/subscriber/subext.aspx?url=<?php bloginfo('rss2_url'); ?>" title="Add <?php bloginfo("name"); ?> RSS to Newsgator">Newsgator</a></li>
<li id="rojo"><a href="http://www.rojo.com/add-subscription?resource=<?php bloginfo('rss2_url'); ?>" title="Add <?php bloginfo("name"); ?> RSS to Rojo">Rojo</a></li>
<li id="netvibes"><a href="http://www.netvibes.com/subscribe.php?url=<?php bloginfo('rss2_url'); ?>" title="Add <?php bloginfo("name"); ?> RSS to Netvibes">Netvibes</a></li>
<li id="bloglines"><a href="http://www.bloglines.com/sub/<?php bloginfo('rss2_url'); ?>" title="Add <?php bloginfo("name"); ?> RSS to Bloglines">Bloglines</a></li>
</ul>
<?php ############# END ADDITIONAL SUBSCRIPTIONS HERE ##################### ?>
</div>
<?php ############# END ADDITIONAL SUBSCRIPTION DIV HERE ##################### ?>
</div>
<?php ############# END RSS SUBSCRIPTION DIV HERE ##################### ?>
</div>
<?php ############# END MAIN DIV HERE ##################### ?>



<?php ############# THIS IS COMMENTED OUT IN ALL SORTS OF WAYS HERE ##################### ?>
<?php ############# BEGIN NAVIGATION DIV HERE ##################### ?>
<!-- <div id="MainNavigation"> -->
<!-- <ul> -->
<!-- Add Config for Home -->
<!--<li> -->

<!-- <a<?php## if(is_home()){?> <!-- class="current" --><?php ## }?> <!-- href="<?php ## bloginfo('url'); ?> <!-- /">Home</a></li> -->
<?php ##wp_list_pages('title_li=&child_of=0&depth=1' ); ?>
<!-- </ul> -->
<?php ## include (TEMPLATEPATH . '/searchform.php'); ?>
<!-- </div> -->
<?php ############# END NAVIGATION DIV HERE ##################### ?>
<?php ############# THIS IS COMMENTED OUT IN ALL SORTS OF WAYS HERE ##################### ?>



<?php ############# BEGIN SOMETHING HERE ##################### ?>	
<?php
if(class_exists('bcn_breadcrumb_trail') && !is_front_page())
{ 
	echo("<div class=\"breadcrumb\"><strong>" . __("You are here:&nbsp;", "Mumrik") .  "</strong> ");
	//Make new breadcrumb object
	$breadcrumb_trail = new bcn_breadcrumb_trail;

	//Setup options here if needed
	$breadcrumb_trail->opt['home_title'] = __("Abu Dhabi 365", "Mumrik");
	$breadcrumb_trail->opt['separator'] = (" &raquo; ");
	$breadcrumb_trail->opt['current_item_linked'] = true;
	
	//Fill the breadcrumb trail
	$breadcrumb_trail->fill();
	
	
	//Display the trail
	$breadcrumb_trail->display();
	echo("</div><hr />");
}
?>
<?php ############# END SOMETHING HERE ##################### ?>