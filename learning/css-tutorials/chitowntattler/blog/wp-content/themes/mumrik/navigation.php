<?php ############# BEGIN LEFT NAVIGATION DIV ##################### ?>
<div id="NavigationContent">

<?php ############# BEGIN IMAGE LINKS ##################### ?>
<a href="/gallery/index.html"><img src="/gallery/images/SideNAV/Letter.jpg" alt="Volcan Gallery" border="0" /></a>
<a href="/gallery/index.html"><img src="/gallery/images/SideNAV/VG.jpg" alt="Volcan Gallery"/></a>
<?php ############# END IMAGE LINKS ##################### ?>

<?php ############# BEGIN NAV MENU ##################### ?>
<ul id="AccordionList" style="padding-left: 30px">

<?php ############# BEGIN PHP CODE FOR DYNAMIC UPDATE ##################### ?>
<?php /*wp_list_pages('title_li=' ); ?>
<?php ############# BEGIN UL TAG COMMENTED OUT DUE TO ONE BELOW ##################### ?>
<!-- </ul> -->
<?php ############# END UL TAG COMMENTED OUT DUE TO ONE BELOW ##################### ?>
<?php
	if(get_option('mumrik_show_ads_placeholders') == true) {
		do_action('ad-minister', array('position' => 'Navigation Below Left'));
	}*/
?>
<?php ############# END PHP CODE FOR DYNAMIC UPDATE ##################### ?>

<?php ############# BEGIN MANUAL CODING FOR PAGES UPDATE ##################### ?>

<li class="link"><a href="/gallery/About.html" id="aboutnav">ABOUT</a></li>
<li class="link"><a href="/gallery/Chandeliers.html" id="chandeliersnav">CHANDELIERS</a></li>
<li class="link"><a href="/gallery/Art.html" id="artnav">ART</a></li>
<li class="link"><a href="/gallery/Jewelry.html" id="jewelrynav">JEWELRY</a></li>
<li class="link"><a href="/gallery/Music.html" id="musicnav">MUSIC</a></li>
<li class="link"><a href="/gallery/News.html" id="newsnav">NEWS</a></li>
<li class="link"><a href="/gallery/Contact.html" id="contactnav">CONTACT</a></li>
</ul>
<?php ############# END NAV MENU ##################### ?>
</div>
<?php ############# END LEFT NAVIGATION DIV ##################### ?>
