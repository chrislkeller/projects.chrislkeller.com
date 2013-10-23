<?php
/*
Template Name: Section First Page
*/
?>
<?php get_header();?>
	<div id="Content">
		
		<?php if($full_image = get_post_meta($post->ID, 'full_image', true)) { ?>
		<div id="FullContent">
		<img class="full_image" src="<?php echo($full_image); ?>" />
		<?php if($puff = get_post_meta($post->ID, 'puff', true)) { ?>
		<div id="rotator">
		<div class="puff">
			<?php echo($puff); ?>
		</div>
		</div>
		<?php } ?>
		</div>
		<hr />
		<?php } ?>
		<?php include('navigation.php'); ?>
		<div id="MainContent">
			<?php while (have_posts()) : the_post(); ?>
			<div class="Post clearfix">
				<h3><?php the_title(); ?></h3>
				
				<?php if(!is_search() && !is_archive()) { ?>
				<div class="PostContent">
					<?php the_content('Read the rest of this entry &raquo;'); ?>
				</div>
				<?php } ?>
			</div>	

			<?php endwhile; ?>
			
		</div>
		<?php get_sidebar();?>
	</div>
	
<?php get_footer(); ?>