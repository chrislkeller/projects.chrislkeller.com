<?php get_header();?>

	<div id="Content">
	<?php include('navigation.php'); ?>
		<div id="MainContent">
			<?php while (have_posts()) : the_post(); ?>
			<div class="Post clearfix">
			<div class="PostInfo"><span class="comments"><?php comments_popup_link(__('No Comments', 'Mumrik'), __('1 Comment', 'NeeWee'), __('% Comments', 'Mumrik')); ?></span> <span class="author">By <?php the_author() ?> on <?php the_time('F jS, Y') ?></span></div>
				<h3><a title="Permanent Link to <?php the_title(); ?>" href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h3>
				<div class="PostInfo"><em><?php _e('Category', 'Mumrik');?>: <?php the_category(', ') ?><?php the_tags(__(', Tags', 'Mumrik') . ': ', ', ') ?></em></div>
				<?php if(!is_search() && !is_archive()) { ?>
				<div class="PostContent">
					<?php the_content('Read the rest of this entry &raquo;'); ?>
				</div>
				<?php } ?>
			</div>	
			<hr/>
			<?php comments_template(); ?>
			<?php endwhile; ?>
			<div class="navigation">
				<div class="alignleft"><?php next_posts_link('&laquo; ' . __('Previous Entries', 'Mumrik')) ?></div>
				<div class="alignright"><?php previous_posts_link(__('Next Entries', 'Mumrik') . ' &raquo;') ?></div>
			</div>
			
		</div>
		<?php get_sidebar();?>
	</div>
	
<?php get_footer(); ?>