<?

$storyslug=$_POST['storyslug'];

$line=$_POST['line'];

$storytags=$_POST['storytags'];

$additionalnotes=$_POST['additionalnotes'];

$group1=$_POST['group1'];

$group2=$_POST['group2'];

$group3=$_POST['group3'];

// Connects to Our Database
mysql_connect("localhost", "root", "thedoors") or die(mysql_error());
mysql_select_db("budget") or die(mysql_error());

mysql_query("INSERT INTO `stories` VALUES ('$storyslug', '$line', '$storytags', '$additionalnotes', '$group1', '$group2', '$group3')");

Print "Your information has been successfully added to the database.";
?>

<?php
print "To upload another file <a href=http://localhost/budget> Click Here</a>";
?>