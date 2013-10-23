<!-- BEGIN HEADER -->
<?php include("/includes/header.php"); ?>
<!-- END HEADER -->

<!-- BEGIN FORM -->
<form method="post" action="">

<!-- BEGIN USERNAME -->
<p>
<label class="text">Username</label>
<input type="text" id="headline" name="headline" class="text"/>
</p>
<!-- END USERNAME -->

<!-- BEGIN PASSWORD -->
<p>
<label class="text">Password</label>
<input type="text" id="byline" name="byline" class="text"/>
</p>
<!-- END PASSWORD -->

<input type="hidden" name="process" value="1"/>

<!-- BEGIN BUTTON -->
<input type="submit" class="btn" value="Log In" />

<input type="submit" class="btn" value="Register" />
<!-- END BUTTON -->

</form>
<!-- END FORM -->

<!-- BEGIN FOOTER -->
<?php include("/includes/footer.php"); ?>
<!-- END FOOTER -->