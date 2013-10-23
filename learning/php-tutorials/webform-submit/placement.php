<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link rel="stylesheet" href="CSS/golden-extend/reset.css" type="text/css" media="screen, projection">
<link rel="stylesheet" href="CSS/golden-extend/golden.css" type="text/css" media="screen, projection">
<link rel="stylesheet" href="CSS/golden-extend/typography.css" type="text/css" media="screen, projection">
<title>Welcome to The Times Desktop Budgeting Database</title>
<style>
body{background-color:#B8B8B8;}
.main{background-color:#fff;}
#nav {
margin: 0;
padding: 0 0 0 10px;
list-style-type: none;
background-color:#7FAF95;
font-size:1.2em;
font-weight:700;

float: left; 
}
#nav li {
margin: 0;
padding: 0;
float: left;
width: 70px;
}

</style>
</head>


<?php // ############# BEGIN BODY ##################### ?>
<body>
<form action="process.php" method="post">
<div class="main">

<?php // ############# BEGIN NAV BAR ##################### ?>
<div class="g960" style="background-color:#7FAF95; height:50px">
<ul id="nav">
<li><a href=http://localhost/budget>Submit<br>Offering</a></li>
<li><a href=http://localhost/budget/space.php>Space Note</a></li>
</ul>
 </div>
<div class="clear">&nbsp;</div>
<?php // ############# END NAV BAR ##################### ?>




<?php // ############# BEGIN MAIN LEFT ##################### ?>
<div class="g480">
<h1>Daily Budget</h1>
<p>

<?php // ############# BEGIN DESKs ##################### ?>
<select>
<option value="">Select Your Zone</option>
<option value="northlake">Northlake</option>
<option value="southlake">Southlake</option>
<option value="portercounty">Porter County</option>
<option value="portercounty">Illinois</option>
<option value="business">A1</option>
<option value="online">Online</option>
</select>
<?php // ############# END DESKs ##################### ?>

<p>

<?php // ############# BEGIN LIST OF SLUGS ##################### ?>




<?php
//MySQL Database Connect
include 'datalogin.php';
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

echo <strong>Select Placement:</strong>
echo <select>
echo "<option value=\"a1\">A1</option>";
echo <option value="a2">A2</option>
echo <option value="a3">A3</option>
echo <option value="a4">A4</option>
<option value="a5">A5</option>
<option value="a6">A6</option>
<option value="a7">A7</option>
<option value="a8">A8</option>
<option value="a9">A9</option>
<option value="a10">A10</option>
<option value="a11">A11</option>
<option value="a12">A12</option>
<option value="a13">A13</option>
<option value="a14">A14</option>
</select>



<?php // ############# END LIST OF SLUGS ##################### ?>
</div>
<?php // ############# END MAIN LEFT ##################### ?>

<?php // ############# BEGIN MAIN MIDDLE ##################### ?>
<div class="g320">
<h2>Select Day, Date and Year</h2>
<?php // ############# BEGIN DAY AND DATE ##################### ?>
<table border="0">
<tr>
<th>Month</th>
<th>Date</th>
<th>Year</th>
</tr>
<tr>
<td>
<select>
<option value="month">January</option>
<option value="month">February</option>
<option value="month">March</option>
<option value="month">April</option>
<option value="month">May</option>
<option value="month">June</option>
<option value="month">July</option>
<option value="month">August</option>
<option value="month">September</option>
<option value="month">October</option>
<option value="month">November</option>
<option value="month">December</option>
</select>
</td>
<td>
<select>
<option value="day">1</option>
<option value="day">2</option>
<option value="day">3</option>
<option value="day">4</option>
<option value="day">5</option>
<option value="day">6</option>
<option value="day">7</option>
<option value="day">8</option>
<option value="day">9</option>
<option value="day">10</option>
<option value="day">11</option>
<option value="day">12</option>
<option value="day">13</option>
<option value="day">14</option>
<option value="day">15</option>
<option value="day">16</option>
<option value="day">17</option>
<option value="day">18</option>
<option value="day">19</option>
<option value="day">20</option>
<option value="day">21</option>
<option value="day">22</option>
<option value="day">23</option>
<option value="day">24</option>
<option value="day">25</option>
<option value="day">26</option>
<option value="day">27</option>
<option value="day">28</option>
<option value="day">29</option>
<option value="day">30</option>
<option value="day">31</option>
</select>
</td>
<td>
<select>
<option value="year">2009</option>
<option value="year">2010</option>
<option value="year">2011</option>
<option value="year">2012</option>
<option value="year">2013</option>
<option value="year">2014</option>
<option value="year">2015</option>
<option value="year">2016</option>
</select>
</td>
</tr>
</table>
<?php // ############# END DAY AND DATE ##################### ?>
</div>
<?php // ############# END MAIN MIDDLE ##################### ?>

<?php // ############# BEGIN MAIN RIGHT ##################### ?>
<div class="g160">
<blockquote><p><strong>...opening up a newspaper is the key to looking classy and smart. Never mind the bronze-plated stuff about the role of the press in a democracy -- a newspaper, kiddo, is about Style.<p> -- Garrison Keillor</strong></p></blockquote>
</div>
<div class="clear">&nbsp;</div>
<?php // ############# END MAIN RIGHT ##################### ?>



<?php // ############# BEGIN BOTTOM LEFT ##################### ?>
<div class="g320">
<input type="submit" name="submit" value="Preview Budget">
</form>
</br>
</br>
<!-- <a href=http://localhost/budget/download.php></a> --> 
<input type="submit" name="submit" value="Submit Budget"><mail to="ckeller@nwitimes.com">


</div>
<?php // ############# END BOTTOM LEFT ##################### ?>

<?php // ############# BEGIN BOTTOM MIDDLE ##################### ?>
<div class="g320">
</div>
<?php // ############# END BOTTOM MIDDLE ##################### ?>

<?php // ############# BEGIN BOTTOM RIGHT ##################### ?>
<div class="g320">
</div>
<div class="clear">&nbsp;</div>
<?php // ############# END BOTTOM RIGHT ##################### ?>

</div>
<?php // ############# END BODY ##################### ?>
</body>
</html>
