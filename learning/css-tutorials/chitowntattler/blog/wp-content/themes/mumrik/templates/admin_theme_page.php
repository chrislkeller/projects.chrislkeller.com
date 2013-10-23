
<div class="wrap">
<h2>Mumrik Theme Settings</h2>
<form action="" method="post" class="themeform">

<h3>Featured Content</h3>
<table class="form-table">

<input type="hidden" id="action" name="action" value="save" />
<tr valign="top">
<th scope="row">Featured Category</th>
<td>
	<select name="featured_category_id">
		<option value="-1">Select Category for Featured Articles</option>
		<?
			$categories=  get_categories(''); 
			  foreach ($categories as $cat) {
			  	$option = '<option value="'.$cat->cat_ID.'"';
				if(get_option("mumrik_featured_category_id") == $cat->cat_ID) {
					$option .= ' selected="selected"';
				}
				$option .= '>';
				$option .= $cat->cat_name;
				$option .= ' ('.$cat->category_count.')';
				$option .= '</option>';
				echo $option;
			  }
		?>
	</select>
</td>
</tr>
</table>
<h3>FeedBurner Integration</h3>
<table class="form-table">

<tr valign="top">
<th scope="row">Enable FeedBurner</th>
<td>
	<input type="checkbox" value="1" name="mumrik_feedburner_integration" <?php if(get_option("mumrik_feedburner_integration") == '1') { ?> checked="checked"<?php } ?>/>
</td>
</tr>
<tr valign="top">
<th scope="row">FeedBurner Feed URL</th>
<td>
	<input type="text" name="mumrik_feedburner_url" size="45" value="<?php echo(get_option('mumrik_feedburner_url')); ?>" />
</td>
</tr>
<tr valign="top">
<th scope="row">FeedBurner Feed ID</th>
<td>
	<input type="text" name="mumrik_feedburner_id" value="<?php echo(get_option('mumrik_feedburner_id')); ?>" />
</td>
</tr>
<!--tr valign="top">
<th scope="row">Enable FeedBurner Stats</th>
<td>
	<input type="checkbox" value="1" name="mumrik_feedburner_stats" <?php if(get_option("mumrik_feedburner_stats") == true) { ?> checked="checked"<?php } ?>/>
</td>
</tr-->
</table><!--
<h3>Google Tools Integration</h3>
<table class="form-table">
<tr valign="top">
<th scope="row">Google Anlytics ID</th>
<td>
	<input type="text" name="mumrik_google_analytics_id" value="<?php echo(get_option('mumrik_google_analytics_id')); ?>" />
</td>
</tr>
</table>-->
<p class="submit"><input type="submit" value="Save Changes" name="cp_save"/></p>
</form>
</div>