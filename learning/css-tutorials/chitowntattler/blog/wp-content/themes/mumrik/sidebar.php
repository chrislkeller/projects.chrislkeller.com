<div id="ContextualContent">
<?php
if(get_option('mumrik_show_ads_placeholders') == true) {
	do_action('ad-minister', array('position' => 'Sidebar Top Right'));
}
?>


<?php ############# BEGIN TABS DIV HERE ##################### ?>
<div id="Tabs">
<ul>
<?php if(get_option('mumrik_featured_category_id') && get_option('mumrik_featured_category_id') > -1) { ?><li class="ui-tabs-nav-item"><a href="#featured-tab">Featured</a></li><?php } ?>
<?php if(get_option('mumrik_feedburner_integration') && get_option('mumrik_feedburner_integration') > -1) { ?><li class="ui-tabs-nav-item"><a href="#subscribe-tab">Subscribe</a></li><?php } ?>
<?php if(get_option('mumrik_page_content') && get_option('mumrik_page_content') != "") { ?><li class="ui-tabs-nav-item"><a href="#about-tab">About</a></li><?php } ?>
</ul>

<?php ############# BEGIN FEATURED TABS DIV HERE ##################### ?>
<div id="featured-tab">
<?php if(get_option('mumrik_featured_category_id') && get_option('mumrik_featured_category_id') > -1) { ?>
<?php query_posts('cat=' . get_option('mumrik_featured_category_id') . '&showposts=5'); ?>
<ul class="links">
<?php while (have_posts()) : the_post(); ?>
<li><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></li>
<?php endwhile;?>
</ul>
<?php } ?>
</div>
<?php ############# END FEATURED TABS DIV HERE ##################### ?>


<?php if(get_option('mumrik_feedburner_integration') && get_option('mumrik_feedburner_integration') > -1) { ?><div id="subscribe-tab">
<?php if(get_option('mumrik_feedburner_url') && get_option('mumrik_feedburner_url') != "") { ?>
<img src="<?php bloginfo('template_url'); ?>/img/feed_small.png" align="left" style="margin:0 5px 0 0 " width="16" height="16" border="0" /><a href="<?php echo(get_option('mumrik_feedburner_url')); ?>"><?php _e("Subscribe to " . get_bloginfo('name') . " RSS", "Mumrik"); ?></a>
<?php } ?>
<?php if(get_option('mumrik_feedburner_id') && get_option('mumrik_feedburner_id') > -1) { ?> or 
<form style="border:1px solid #ccc;padding:3px;text-align:center;margin-top:10px" action="http://www.feedburner.com/fb/a/emailverify" method="post" target="popupwindow" onsubmit="window.open('http://www.feedburner.com/fb/a/emailverifySubmit?feedId=<?php echo(get_option('mumrik_feedburner_id')); ?>', 'popupwindow', 'scrollbars=yes,width=550,height=520');return true"><p>Enter your email address:</p><p><input type="text" style="width:140px" name="email"/></p><input type="hidden" value="http://feeds.feedburner.com/~e?ffid=<?php echo(get_option('mumrik_feedburner_id')); ?>" name="url"/><input type="hidden" value="<?php bloginfo('name'); ?>" name="title"/><input type="hidden" name="loc" value="en_US"/><input type="submit" value="Subscribe" /><p>Delivered by <a href="http://www.feedburner.com" target="_blank">FeedBurner</a></p></form>
<?php } ?>
</div><?php } ?>
<?php ############# END DIV HERE ##################### ?>
<?php if(get_option('mumrik_page_content') && get_option('mumrik_page_content') != "") { ?>

<?php ############# BEGIN ABOUT TAB DIV HERE ##################### ?>
<div id="about-tab">
</div><?php } ?>
<?php ############# END ABOUT TAB DIV HERE ##################### ?>
</div>
<?php ############# END TABS DIV HERE ##################### ?>



<?php ############# BEGIN SIDEBAR INCLUDES HERE ##################### ?>
<?php ############# BEGIN JAVASCRIPT HERE ##################### ?>
<script type="text/javascript" charset="utf-8">
	$("#Tabs > ul").tabs();
</script>
<?php ############# END JAVASCRIPT HERE ##################### ?>
<?php
	if(get_option('mumrik_show_ads_placeholders') == true) {
		do_action('ad-minister', array('position' => 'Sidebar Right Below Tabs'));
	}
?>
<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('sidebar1') ) : ?>
				<div class="widget">
					<h4><?php _e('Archives', 'Mumrik'); ?></h4>
					<ul>
						<?php wp_get_archives('type=monthly'); ?>
					</ul>
				</div>	
				<div class="widget">
					<h4><?php _e('Categories', 'Mumrik'); ?></h4>
					<ul>
						<?php wp_list_categories('title_li=');?>
					</ul>
				</div>
				<div class="widget">
					<h4><?php _e('Blogroll', 'Mumrik'); ?></h4>
					<ul>
						<?php wp_list_bookmarks('title_li=&categorize=0'); ?>
					</ul>
				</div>
<?php endif; ?>
</div>
<?php ############# END MAIN DIV HERE ##################### ?>