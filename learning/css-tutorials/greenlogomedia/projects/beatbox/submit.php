<!-- BEGIN HEADER -->
<?php include("./includes/header.php"); ?>
<!-- END HEADER -->

<!-- BEGIN USER-WELCOME MESSAGE -->
<?php include("./includes/user-welcome.php"); ?>
<!-- END USER-WELCOME MESSAGE -->

<!-- BEGIN FORM -->
<form method="post" action="">

<!-- BEGIN OPTION MENU -->
<p>
<label class="menu">What did you see?</label>
<select id="crime" name="section name">
<option value="#">Option 1</option>
<option value="#">Option 2</option>
<option value="#">Option 3</option>
<option value="#">Option 4</option>
<option value="#">Option 5</option>
<option value="#">Option 6</option>
</select>
</p>
<!-- END OPTION MENU -->

<!-- BEGIN OPTION MENU -->
<p>
<label class="menu">Where did you see it?</label>
<select id="location" name="section name">
<option value="#">Option 1</option>
<option value="#">Option 2</option>
<option value="#">Option 3</option>
<option value="#">Option 4</option>
<option value="#">Option 5</option>
<option value="#">Option 6</option>
</select>
</p>
<!-- END OPTION MENU -->

<!-- BEGIN OPTION MENU -->
<p>
<label class="menu">When did you see it?</label>
<select id="location" name="section name">
<option value="#">Option 1</option>
<option value="#">Option 2</option>
<option value="#">Option 3</option>
<option value="#">Option 4</option>
<option value="#">Option 5</option>
<option value="#">Option 6</option>
</select>
</p>
<!-- END OPTION MENU -->

<!-- BEGIN TEXT SUBMISSION -->
<p>
<label class="text">What should we know?</label>
<textarea  class="body"/></textarea>
</p>
<!-- END TEXT SUBMISSION -->

<div class="clear"></div>

<p class="tip">Please include all relevant information such as location, time of day...</p>

<input type="hidden" name="process" value="1"/>

<input type="submit" class="btn" value="Submit Tip" />

<input type="submit" class="btn" value="View Incidents" />

<input type="submit" class="btn" value="Log Out" />

</form>
<!-- END FORM -->

<!-- BEGIN FOOTER -->
<?php include("./includes/footer.php"); ?>
<!-- END FOOTER -->