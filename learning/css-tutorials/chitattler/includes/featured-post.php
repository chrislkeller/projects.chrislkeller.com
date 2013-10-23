<!-- BEGIN FEATURED POST -->
<?php query_posts('showposts=1&tag=#featured'); ?>

<!-- BEGIN LOOP -->
<?php while (have_posts()) : the_post(); ?>

<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>

<?php the_excerpt(); ?>

<a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><strong>READ MORE</strong></a></p>

<?php endwhile; ?>
<!-- END LOOP -->
<!-- END FEATURED POST -->