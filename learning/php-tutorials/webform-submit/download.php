<?php
// Connects to Our Database
mysql_connect("localhost", "root", "thedoors") or die(mysql_error());
mysql_select_db("budget") or die(mysql_error());


//get the mysql and store them in $result
//change whatevertable to the mysql table you're using
//change whatevercolumn to the column in the table you want to search
$result = mysql_query("SELECT * FROM stories WHERE storyslug LIKE '%$search%'");

//grab all the content
while($r=mysql_fetch_array($result))
{	
   //the format is $variable = $r["nameofmysqlcolumn"];
   //modify these to match your mysql table columns
  
   $storyslug=$r["storyslug"];
   $line=$r["line"];
   $storytags=$r["storytags"];
   $additionalnotes=$r["additionalnotes"];
   $group1=$r["group1"];
   $group2=$r["group2"];
   $group3=$r["group3"];
   
   //display the row
   echo "<strong>Story Slug:</strong> $storyslug <br> <strong>Story Line:</strong> $line <br> <strong>Story Tags:</strong> $storytags <br> <strong>Additional Notes:</strong> $additionalnotes <br> <strong>Image:</strong> $group1 <br> <strong>Video:</strong> $group2 <br> <strong>Other Assets:</strong> $group3 <br><br>";
}
?>