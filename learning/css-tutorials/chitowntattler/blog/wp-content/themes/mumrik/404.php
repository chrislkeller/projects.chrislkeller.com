<?php header("HTTP/1.1 404 Not Found"); ?>
<?php header("Status: 404 Not Found"); ?>
<?php get_header();?>
	<div id="Content">
		<?php include('navigation.php'); ?>
		<div id="MainContent">
		<div class="Post">
			<h3><a>The page you are trying to view can not be found</a></h3>
			<p>Below we have listed some questions making it easier for you finding what you believed would be on this page. If non of the tips below works, try our search.</p>
			<h4>Did you use a link somewhere on <?php bloginfo('name'); ?>?</h4>
			<p>Try contact the owner of the website, and make sure he/she updates the link or removes it if the resource is no longer available.</p>
			
			<h4>Did you use a link on another site than <?php bloginfo('name'); ?>?</h4>
			<p>Try to contact the owner of the website where you found the link, and update them on that they are linking to a non-existing resource, maybe they do not know that. After that, you could contact the owner of this website as mentioned above, in order for him/her to update the content and maybe take contact with the website linking here.</p>
			
			<h4>Did you type the URL?</h4>
			<p>I know this is an annoying tips, but really make sure that you spelled the address correctly. Even the best makes small mistakes sometimes.</p>
		</div>
		</div>
		<?php get_sidebar();?>
	</div>
	
<?php get_footer(); ?>