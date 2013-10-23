<!-- BEGIN DOCUMENT -->
<!DOCTYPE html>
<html xmlns:fb="http://www.facebook.com/2008/fbml">

<!-- BEGIN HEAD -->
<head>

<!-- BEGIN DYNAMIC PAGE TITLE -->
<title>
 <? if ( is_home() ) { ?><?php bloginfo('name'); ?><?php } ?>
 <? if ( is_search() ) { ?>Search Results | <?php bloginfo('name'); ?><?php } ?>
 <? if ( is_author() ) { global $wp_query; $curauth = $wp_query->get_queried_object(); ?>Author Archives | <?php echo $curauth->nickname; ?> | <?php bloginfo('name'); ?><?php } ?>
 <? if ( is_single() ) { ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?>
 <? if ( is_page() ) { ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?>
 <? if ( is_category() ) { ?><?php single_cat_title(); ?> | <?php bloginfo('name'); ?><?php } ?>
 <? if ( is_year() ) { ?><?php the_time('Y'); ?> | <?php bloginfo('name'); ?><?php } ?>
 <? if ( is_month() ) { ?><?php the_time('F Y'); ?> | <?php bloginfo('name'); ?><?php } ?>
 <? if ( is_day() ) { ?><?php the_time('d F Y'); ?> | <?php bloginfo('name'); ?><?php } ?>
 <? if ( is_404() ) { ?>Page not found...<?php } ?>
<? if (function_exists('is_tag')) { if (is_tag()) { ?><?php single_tag_title("", true); ?> | Tag Archive | <?php bloginfo('name'); ?><?php } } ?>
</title>
<!-- END DYNAMIC PAGE TITLE -->

<!-- BEGIN CSS -->
<link type="text/css" rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" />
<!-- END CSS -->

<!-- BEGIN SCRIPTS -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js" type="text/javascript"></script>

<?php
	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>

</head>
<!-- END HEAD -->

<!-- BEGIN BODY -->
<body>
<!-- BEGIN OVERLINE NAV -->
<table id="topbar">
<tbody><tr>
<td><div><a href="#" title="#">Home</a></div></td>
<td><div><a href="#" title="#">Apparel</a></div></td>
<td><div><a href="#" title="#">Events</a></div></td>
<td><div><a href="#" title="#">Photos</a></div></td>
<td><div><a href="#" title="#">Contact Us</a></div></td>
</tr>
</tbody></table>
<!-- END OVERLINE NAV -->

<!-- BEGIN HEADER -->
<div id="header">
<h1>
<a href="http://localhost:8888/8PaidWork/">KickAzz Xtreme</a>
</h1>

<!-- BEGIN FACEBOOK CODE -->
<div id="fb-root"></div>
<script>
      window.fbAsyncInit = function() {
        FB.init({appId: '204771226206202', status: true, cookie: true,
                 xfbml: true});
      };
      (function() {
        var e = document.createElement('script');
        e.type = 'text/javascript';
        e.src = document.location.protocol +
          '//connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
      }());
</script>
<!-- END FACEBOOK CODE -->

</div>
<!-- END HEADER -->