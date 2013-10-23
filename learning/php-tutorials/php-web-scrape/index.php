<?php
include_once('simple_html_dom.php');

echo file_get_html('http://localdirectory.madison.com/search.pg?q=restaurants&z=Madison%2C%20WI')->plaintext; 


//CREATE DOM OBJECT FROM URL
//$html = file_get_html('http://localdirectory.madison.com/search.pg?q=restaurants&z=Madison%2C%20WI');

// Find all links 
//foreach($html->find('div') as $element) 



	//echo $element->class . '<br>';




?>


