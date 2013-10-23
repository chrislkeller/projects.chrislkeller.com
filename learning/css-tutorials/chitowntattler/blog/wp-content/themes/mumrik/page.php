<?php get_header();?>
	<div id="Content">
	<?php include('navigation.php'); ?>
		<div id="MainContent">
			<?php while (have_posts()) : the_post(); ?>
			<div class="Post clearfix">
				<!-- <h3><?php## the_title(); ?></h3> -->
				
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