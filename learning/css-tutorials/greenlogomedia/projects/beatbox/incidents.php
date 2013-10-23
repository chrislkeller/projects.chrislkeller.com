<!-- BEGIN HEADER -->
<?php include("./includes/header.php"); ?>
<!-- END HEADER -->

<!-- BEGIN USER-WELCOME MESSAGE -->
<?php include("./includes/user-welcome.php"); ?>
<!-- END USER-WELCOME MESSAGE -->

<!-- BEGIN INCIDENT LIST -->
<div id="slideshow">

<!-- BEGIN SLIDE NAV -->
<ul class="slides-nav">
<li class="on"><a href="#slide-one">Incidents</a></li>
<li><a href="#slide-two">Users by Beat</a></li>
</ul>
<!-- END SLIDE NAV -->

<!-- BEGIN SLIDES -->
<div class="slides">

<ul>

<!-- BEGIN FIRST SLIDE -->
<li id="slide-one">

<label class="text">Incidents in Beat 2313:</label>

<!-- BEGIN ITEM -->
<div id="incident-item">

<!-- BEGIN DATA -->
<div id="incident-data">
<p class="user-name">chriskeller</p>
<p class="incident-name">I saw a man breaking car windows.</p>

<p class="votes">Score: 2.00</a></p>

<!-- BEGIN VOTE -->
<div class="triangle-isosceles top"><a href="#"><strong>Vote Up</strong></a>
</div> 

<div class="triangle-isosceles"><a href="#"><strong>Vote Down</strong></a>
</div>
<!-- END VOTE -->

<div class="clear"></div>

<a href="#"><input type="submit" class="notify" value="Notify beat users" /></a>

</div>
<!-- END DATA -->

</div>
<!-- END ITEM -->

<!-- BEGIN ITEM -->
<div id="incident-item">

<!-- BEGIN DATA -->
<div id="incident-data">
<p class="user-name">chriskeller</p>
<p class="incident-name">I saw a car that did not stop for a someone in the crosswalk. Red Honda Accord 4 door. License plate g34-jhg.</p>
<p class="votes">Score: 2.00</a></p>

<!-- BEGIN VOTE -->
<div class="triangle-isosceles top"><a href="#"><strong>Vote Up</strong></a>
</div> 

<div class="triangle-isosceles"><a href="#"><strong>Vote Down</strong></a>
</div>
<!-- END VOTE -->

<div class="clear"></div>

<a href="#"><input type="submit" class="notify" value="Notify beat users" /></a>

</div>
<!-- END DATA -->

</div>
<!-- END ITEM -->
<!-- BEGIN ITEM -->
<div id="incident-item">

<!-- BEGIN DATA -->
<div id="incident-data">
<p class="user-name">chriskeller</p>
<p class="incident-name">Guy was spraypainting my fence and he threw a brick at me.</p>
<p class="votes">Score: 2.00</a></p>

<!-- BEGIN VOTE -->
<div class="triangle-isosceles top"><a href="#"><strong>Vote Up</strong></a>
</div> 

<div class="triangle-isosceles"><a href="#"><strong>Vote Down</strong></a>
</div>
<!-- END VOTE -->

<div class="clear"></div>

<a href="#"><input type="submit" class="notify" value="Notify beat users" /></a>

</div>
<!-- END DATA -->

</div>
<!-- END ITEM -->

</li>
<!-- END FIRST SLIDE -->

<!-- BEGIN SECOND SLIDE -->
<li id="slide-two">
<label class="text">Users on Beat 2313:</label>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
<p class="user-return"><strong>This is my name:</strong> 6173084627</p>
</li>
<!-- END SECOND SLIDE -->

</ul>
</div>
<!-- END SLIDES -->

</div>
<!-- END INCIDENT LIST -->

<input type="submit" class="btn" value="Submit Tip" />

<input type="submit" class="btn" value="View Incidents" />

<input type="submit" class="btn" value="Log Out" />

<!-- BEGIN FOOTER -->
<?php include("./includes/footer.php"); ?>
<!-- END FOOTER -->