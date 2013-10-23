<!-- BEGIN HEADER -->
<?php include("/includes/header.php"); ?>
<!-- END HEADER -->

<!-- BEGIN FORM -->
<form action="" onsubmit="return false;">

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

<!-- BEGIN POLICE BEAT AUTO COMPLETE FUNCTION-->
<p>
<label class="text">CPD Beat</label>
<input type="text" id="CityLocal" value="" autocomplete="off" class="ac_input" style="">
<input type="button" value="Get Value" onclick="lookupLocal();">
</p>
<!-- END POLICE BEAT -->

<!-- BEGIN PASSWORD -->
<p>
<label class="text">Mobile Number</label>
<input type="text" id="byline" name="byline" class="text" value="+15555555"/>
</p>
<!-- END PASSWORD -->

<div class="clear"></div>

<input type="hidden" name="process" value="1"/>

<input type="submit" class="btn" value="Register" />

</form>
<!-- END FORM -->

<!-- BEGIN MAGICAL SCRIPT -->
<script src="js/beat-array.js"></script>
<!-- END MAGICAL SCRIPT -->

<!-- BEGIN FOOTER -->
<?php include("/includes/footer.php"); ?>
<!-- END FOOTER -->