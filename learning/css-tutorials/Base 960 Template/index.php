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
<!-- BEGIN LOOP QUERY -->
<?php query_posts('showposts=3'); ?>

<!-- BEGIN LOOP -->
<?php while (have_posts()) : the_post(); ?>

<!-- BEGIN POST -->
<div class="post">

<!-- BEGIN POST HEADING -->
<div class="post-header">

<span class="date"><a href="<?php echo get_month_link(get_the_time('M'), get_the_time('j'), get_the_time('Y')); ?>"><?php the_time(__('M', 'f2')); ?> <?php the_time(__('j', 'f2')); ?>  <?php the_time(__('Y', 'f2')); ?>
</a></span>

<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
</div>
<!-- END POST HEADING -->

<!-- BEGIN POST CONTENT -->
<div class="post-section">
<?php the_excerpt(); ?>
</div>

<!-- BEGIN POST FOOTER -->
<div class="post-footer">
<strong>Posted in <?php the_category(', ') ?></strong>
<ul>
<li><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><strong>Read More</strong></a></li>
<!-- <li><a href="#">Retweet</a></li> -->
<li><a href="<?php comments_link(); ?>"><?php comments_number( 'Leave a Comment', '1 Comment', '% Comments' ); ?></a></li>
</ul>

<!-- BEGIN COMMENTS TEMPLATE -->
<?php comments_template(); ?>

</div>
<!-- END POST FOOTER -->

</div>
<!-- END POST -->

<div class="clear"></div>

<div class="spacer">
</div>

<?php endwhile; ?>
<!-- END LOOP -->

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