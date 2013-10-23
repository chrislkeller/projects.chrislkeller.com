<!-- BEGIN HEADER -->
<?php include("/includes/header.php"); ?>
<!-- END HEADER -->

<!-- BEGIN USER-WELCOME MESSAGE -->
<?php include("/includes/user-welcome.php"); ?>
<!-- END USER-WELCOME MESSAGE -->

<!-- BEGIN INCIDENT LIST -->
<div id="slideshow">

<!-- BEGIN SLIDE NAV -->
<ul class="slides-nav">
<li class="on"><a href="#slide-one">Submit</a></li>
<li><a href="#slide-two">Incidents</a></li>
<li><a href="#slide-three">Users</a></li>
</ul>
<!-- END SLIDE NAV -->

<!-- BEGIN SLIDES -->
<div class="slides">

<ul>

<!-- BEGIN FIRST SLIDE -->
<li id="slide-one">

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
</li>
<!-- END FIRST SLIDE -->

<!-- BEGIN SECOND SLIDE -->
<li id="slide-two">

<label class="text">Incidents in Beat 2313:</label>

<!-- BEGIN ITEM -->
<div id="incident-item">

<!-- BEGIN DATA -->
<div id="incident-data">
<p class="user-name">chriskeller</p>
<p class="incident-name">I saw a man breaking car windows.</p>
<p class="notify"><a href="#">Notify all users in beat</a></p>
<p class="votes">Score: 2.00</a></p>
</div>
<!-- END DATA -->

<!-- BEGIN VOTE -->
<div id="incident-vote">
<a href="#"><strong>Vote Up</strong></a> <a href="#"><strong>Vote Down</strong></a>
</div>
<!-- END VOTE -->

</div>
<!-- END ITEM -->

<!-- BEGIN ITEM -->
<div id="incident-item">

<!-- BEGIN DATA -->
<div id="incident-data">
<p class="user-name">chriskeller</p>
<p class="incident-name">I saw a car that did not stop for a someone in the crosswalk. Red Honda Accord 4 door. License plate g34-jhg.</p>
<p class="notify"><a href="#">Notify all users in beat</a></p>
<p class="votes">Score: 2.00</a></p>
</div>
<!-- END DATA -->

<!-- BEGIN VOTE -->
<div id="incident-vote">
<a href="#"><strong>Vote Up</strong></a> <a href="#"><strong>Vote Down</strong></a>
</div>
<!-- END VOTE -->

</div>
<!-- END ITEM -->

<!-- BEGIN ITEM -->
<div id="incident-item">

<!-- BEGIN DATA -->
<div id="incident-data">
<p class="user-name">chriskeller</p>
<p class="incident-name">Guy was spraypainting my fence and he threw a brick at me.</p>
<p class="notify"><a href="#">Notify all users in beat</a></p>
<p class="votes">Score: 2.00</a></p>
</div>
<!-- END DATA -->

<!-- BEGIN VOTE -->
<div id="incident-vote">
<a href="#"><strong>Vote Up</strong></a> <a href="#"><strong>Vote Down</strong></a>
</div>
<!-- END VOTE -->

</div>
<!-- END ITEM -->

</li>
<!-- END SECOND SLIDE -->






<!-- BEGIN THIRD SLIDE -->
<li id="slide-three">

<label class="text">Users on Beat 2313:</label>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>

</li>
<!-- END THIRD SLIDE -->





</ul>
</div>
<!-- END SLIDES -->

</div>
<!-- END INCIDENT LIST -->

<input type="submit" class="btn" value="Submit Tip" />

<input type="submit" class="btn" value="View Incidents" />

<input type="submit" class="btn" value="Log Out" />

<!-- BEGIN FOOTER -->
<?php include("/includes/footer.php"); ?>
<!-- END FOOTER -->