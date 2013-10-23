<!-- BEGIN HEADER -->
<?php get_header(); ?>

<!-- BEGIN CONTAINER -->
<div class="container_12">

<!-- BEGIN GRID 12 -->
<div class="grid_12">

<!-- BEGIN GRID 8 -->
<div class="grid_8 alpha">

<!-- BEGIN CONTENT -->
<div id="content">

<!-- BEGIN LOOP -->
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

<!-- BEGIN POST -->
<div class="post">

<!-- BEGIN POST HEADER/META -->
<div class="post-header">

<!-- GET THE DATE AND LINK -->
<span class="date"><a href="<?php echo get_month_link(get_the_time('M'), get_the_time('j'), get_the_time('Y')); ?>"><?php the_time(__('M', 'f2')); ?> <?php the_time(__('j', 'f2')); ?>  <?php the_time(__('Y', 'f2')); ?>
</a></span>

<!-- BEGIN HEADING -->
<div class="post-it">
<h4><?php the_category(', ') ?></h4>
<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
<a href="<?php comments_link(); ?>"><?php comments_number( 'Leave a Comment', '1 Comment', '% Comments' ); ?></a>
</div>
<!-- END HEADING -->

</div>
<!-- END POST HEADER/META -->

<!-- BEGIN POST CONTENT -->
<div class="post-section">

<!-- BEGIN SOCIAL BUTTONS -->
<div id="social-buttons">
<ul>
<li><a href="http://twitter.com/share" class="twitter-share-button" data-count="none" data-via="chitowntattler">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></li>
<li><script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:like href="http://www.chitowntattler.com/" layout="button_count" show_faces="false" width="60" font="arial" colorscheme="light"></fb:like></li>
</ul>
</div>
<hr>
<!-- END SOCIAL BUTTONS -->

<?php the_content(); ?>
</div>
<!-- END POST CONTENT -->

<!-- BEGIN POST FOOTER -->
<div class="post-footer">
<p><strong>Tagged: </strong><?php the_tags(' ', ', ', '<br />'); ?></p>
<p><strong>Posted on </strong><?php the_time('l, F jS, Y') ?> at <?php the_time() ?> and filed under <?php the_category(', ') ?></p>

<!-- BEGIN COMMENTS TEMPLATE -->
<?php comments_template(); ?>

</div>
<!-- END POST FOOTER -->

<?php endwhile; else: ?>
<p>Sorry, no posts matched your criteria.</p>
<?php endif; ?>
<!-- END LOOP -->

</div>
<!-- END POST -->

<div class="clear"></div>

</div>
<!-- END CONTENT -->

</div>
<!-- END GRID 8 -->

<!-- BEGIN SIDEBAR -->
<?php get_sidebar(); ?>

</div>
<div class="clear"></div>
<!-- END GRID 12 -->

</div>
<!-- END CONTAINER -->

<!-- BEGIN FOOTER -->
<?php get_footer(); ?>