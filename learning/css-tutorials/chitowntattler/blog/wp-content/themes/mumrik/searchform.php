<form method="get" id="Search" action="<?php bloginfo('url'); ?>/">
	<input type="text" name="s" id="s" value="<?php the_search_query(); ?>" />
	<input type="submit" id="searchsubmit" value="Go" />
</form>