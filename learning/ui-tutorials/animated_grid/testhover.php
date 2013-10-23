<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php include($_SERVER['DOCUMENT_ROOT'] . '/app/inc/header_norail.php'); ?>


<?php ############# BEGIN HEADER HERE ##################### ?>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

<?php ############# BEGIN TITLE HERE ##################### ?>
<title>Fancy Thumbnail Hover Effect w/ jQuery - by Soh Tanaka</title>

<?php ############# BEGIN CSS HERE ##################### ?>
<style type="text/css">
#varsitybody {width:960px;}
.left-col {width:630px; margin-right:5px; border-right:thin solid #000000; float:left;}
.right-col {width:315px; margin-left:5px; float:right;}
.line_dotted { background: url(/app/images/dots.gif) repeat-x scroll left top; margin: 0 -3px; padding-top: 8px; }
.logoblock {padding: 5px; float:left;}
.logoconference_duneland {width:630px;}
.logoconference_greaterss {width:630px;}
.logoconference_crossroads {width:630px;}
.logoconference_2 {width:315px;}
.logoconference_6 {width:960px;}

ul.thumb {
	float: left;
	list-style: none;
	margin: 0; padding: 5px;
	width: 630px;
}


ul.thumb li {
	margin: 0; padding: 5px;
	float: left;
	position: relative;
	width: 140px;
	height: 140px;
}
ul.thumb li img {
	width: 130px; height: 130px;
	border: 1px solid #ddd;
	padding: 5px;
	background: #f0f0f0;
	position: absolute;
	left: 0; top: 0;
	-ms-interpolation-mode: bicubic; 
}
ul.thumb li img.hover {
	background:url(thumb_bg.png) no-repeat center center;
}
#main_view {
	float: left;
	padding: 9px 0;
	margin-left: -10px;
}
</style>
<?php ############# END CSS HERE ##################### ?>

<?php ############# BEGIN JAVASCRIPT HERE ##################### ?>
<script language="JavaScript">
<!--

function SymError()
{
  return true;
}

window.onerror = SymError;

var SymRealWinOpen = window.open;

function SymWinOpen(url, name, attributes)
{
  return (new Object());
}

window.open = SymWinOpen;

//-->
</script>

<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script> 
<script type="text/javascript"> 
$(document).ready(function(){

//Larger thumbnail preview 

$("ul.thumb li").hover(function() {
	$(this).css({'z-index' : '10'});
	$(this).find('img').addClass("hover").stop()
		.animate({
			marginTop: '-110px', 
			marginLeft: '-110px', 
			top: '50%', 
			left: '50%', 
			width: '174px', 
			height: '174px',
			padding: '20px' 
		}, 200);
	
	} , function() {
	$(this).css({'z-index' : '0'});
	$(this).find('img').removeClass("hover").stop()
		.animate({
			marginTop: '0', 
			marginLeft: '0',
			top: '0', 
			left: '0', 
			width: '130px', 
			height: '130px', 
			padding: '5px'
		}, 400);
});

//Swap Image on Click
	$("ul.thumb li a").click(function() {
		
		var mainImage = $(this).attr("href"); //Find Image Name
		$("#main_view img").attr({ src: mainImage });
		return false;		
	});
 
});
</script>
<?php ############# END JAVASCRIPT HERE ##################### ?>
</head>
<?php ############# END HEADER HERE ##################### ?>
<body>
<h1>A Page Title</h1>
<p>Some Page Content</p>


<?php ############# BEGIN VARSITY BODY DIV HERE ##################### ?>
<div id="varsitybody">
<?php ############# BEGIN LEFT COL DIV HERE ##################### ?>
<div class="left-col">
<?php ############# BEGIN DUNELAND DIV HERE ##################### ?>
<h2>Duneland Athletic Conference</h2>
<div class="logoconference_duneland">

<ul class="thumb">
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7025&school_id=256"><img src="logos/chesterton.jpg" alt="Chesterton"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7027&school_id=258"><img src="logos/crownpoint.jpg" alt="Crown Point" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7035&school_id=284"><img src="logos/lakecentral.jpg" alt="Lake Central" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7037&school_id=286"><img src="logos/laporte.jpg" alt="LaPorte"/><p>LaPorte</p></a></li>

<div class="clear"></div>

<li><a href="http://www2.nwitimes.com/varsity/?team_id=7040&school_id=291"><img src="logos/mville.jpg" alt="Merrillville"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7041&school_id=292"><img src="logos/michigancity.jpg" alt="Michigan City"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7045&school_id=299"><img src="logos/portage.jpg" alt="Portage"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7050&school_id=312"><img src="logos/valparaiso.jpg" alt="Valparaiso"/></a></li>
</ul>
</div>
<?php ############# END DUNELAND DIV HERE ##################### ?>


<?php ############# BEGIN GSS DIV HERE ##################### ?>
<h2>Greater South Shore Conference</h2>
<div class="logoconference_greaterss">
<ul class="thumb">
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7022&school_id=273"><img src="logos/bishopnoll.jpg" alt="Bishop Noll"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7024&school_id=255"><img src="logos/calumet.jpg" alt="Calumet"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7036&school_id=285"><img src="logos/lakestation.jpg" alt="Lake Station" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7044&school_id=297"><img src="logos/northnewton.jpg" alt="North Newton"/></a></li>

<div class="clear"></div>

<li><a href="http://www2.nwitimes.com/varsity/?team_id=7047&school_id=302"><img src="logos/riverforest.jpg" alt="River Forest"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7052&school_id=315"><img src="logos/wheeler.jpg" alt="Wheeler"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7053&school_id=316"><img src="logos/whiting.jpg" alt="Whiting"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7049&school_id=304"><img src="logos/southcentral.jpg" alt="South Central"/></a></li>
</ul>
</div>
<?php ############# END GSS DIV HERE ##################### ?>


<?php ############# BEGIN NCC DIV HERE ##################### ?>
<h2>Northwest Crossroads Conference</h2>
<div class="logoconference_greaterss">
<ul class="thumb">
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7021&school_id=237"><img src="logos/andrean.jpg" alt="Andrean" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7030&school_id=267"><img src="logos/griffith.jpg" alt="Griffith" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7032&school_id=276"><img src="logos/highland.jpg" alt="Highland" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7033&school_id=277"><img src="logos/hobart.jpg" alt="Hobart" /></a></li>

<div class="clear"></div>

<li><a href="http://www2.nwitimes.com/varsity/?team_id=7034&school_id=281"><img src="logos/kankakee.jpg" alt="Kankakee Valley" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7039&school_id=287"><img src="logos/lowell.jpg" alt="Lowell" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7043&school_id=295"><img src="logos/munster.jpg" alt="Munster" /></a></li>
</ul>
</div>
<?php ############# END NCC DIV HERE ##################### ?>
</div>
<?php ############# END LEFT RAIL DIV HERE ##################### ?>


<?php ############# BEGIN RIGHT COLUMN DIV HERE ##################### ?>
<div class="right-col">
<h2>Great Lakes Athletic Conference</h2>
<?php ############# BEGIN LOGOCONFERENCE_2 DIV HERE ##################### ?>
<div class="logoconference_2">
<ul class="thumb">
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7026&school_id=270"><img src="logos/clark.jpg" alt="Clark" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7029&school_id=271"><img src="logos/gavit.jpg" alt="Gavit" /></a></li>

<div class="clear"></div>

<li><a href="http://www2.nwitimes.com/varsity/?team_id=7031&school_id=268"><img src="logos/hammondhigh.jpg" alt="Hammond" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7042&school_id=272"><img src="logos/morton.jpg" alt="Morton" /></a></li>
</ul>
</div>
<?php ############# END LOGOCONFERENCE_2 DIV HERE ##################### ?>


<?php ############# BEGIN NORTHWESTERN CONFERENCE DIV HERE ##################### ?>
<h2>Northwestern Conference</h2>
<div class="logoconference_2">

<ul class="thumb">
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7038&school_id=263"><img src="logos/lewwallace.jpg" alt="Lew Wallace"/></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7048&school_id=262"><img src="logos/roosevelt.jpg" alt="Roosevelt"/></a></li>

<div class="clear"></div>

<li><a href="http://www2.nwitimes.com/varsity/?team_id=7051&school_id=264"><img src="logos/westside.jpg" alt="West Side"/></a></li>
</ul>
</div>
<?php ############# END NORTHWESTERN CONFERENCE DIV HERE ##################### ?>



<?php ############# BEGIN INDEPENDENT DIV HERE ##################### ?>
<h2>Others/Independent</h2>
<div class="logoconference_2">
<ul class="thumb">
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7028&school_id=260"><img src="logos/eccentral.jpg" alt="E.C. Central" /></a></li>
<li><a href="http://www2.nwitimes.com/varsity/?team_id=7046&school_id=300"><img src="logos/rensselaer.jpg" alt="Rensselaer"/></a></li>

<div class="clear"></div>

<li><a href="http://www2.nwitimes.com/varsity/?school_id=1079"><img src="logos/bowman.jpg" alt="Bowman Academy" /></a></li>
</ul>
</div>
<?php ############# END INDEPENDENT DIV HERE ##################### ?>


</div>
<?php ############# END RIGHT COLUMN DIV HERE ##################### ?>


</div>
<?php ############# END VARSITY BODY DIV HERE ##################### ?>

</body>

</html>

<?php include($_SERVER['DOCUMENT_ROOT'] . '/app/inc/footer.php'); ?>