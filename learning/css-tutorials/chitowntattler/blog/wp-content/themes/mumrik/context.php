<div id="ContextualContent">
		
			<?php if(is_single() && function_exists('the_terms2posts')){?>
			<h4>Related Entries</h4>
			<ul class="ContextualList">
				<?php the_terms2posts(); ?>
			</ul>
			<?}?>
			
			<h4>Categories</h4>
		    <ul class="ContextualList">
		      <?php list_cats(0, '', 'name', 'asc', '', 1, 0, 0, 1, 1, 1, 0,'','','','','') ?>
		   	</ul>
			<h4>Archives</h4>
			<ul class="ContextualList">
				<?php wp_get_archives('type=monthly'); ?>
			</ul>
		</div>