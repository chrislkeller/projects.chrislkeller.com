<html>
<head>
<?php // ############# BEGIN JAVA SCRIPT ##################### ?>
<script type="text/javascript">
function check(writer)
  {
  document.getElementById("answer").value=writer;
  }
</script>
<?php // ############# END JAVA SCRIPT ##################### ?>
</head>

<?php // ############# BEGIN BODY ##################### ?>
<body>
<?php // ############# BEGIN SCRIPTED WRITERS ##################### ?>
<h1>Select item to update</h1>
<form>
<select>
<option name="writer" onclick="check(this.value)" value=""></option>
<option name="writer" onclick="check(this.value)" value="Ben Cunningham">Ben Cunningham</option>
<option name="writer" onclick="check(this.value)" value="Christine Kraly">Christine Kraly</option>
<option name="writer" onclick="check(this.value)" value="Chris Keller">Chris Keller</option>
<option name="writer" onclick="check(this.value)" value="Matt Erickson">Matt Erickson</option>
</select>
<?php // ############# END SCRIPTED WRITERS ##################### ?>
<br />
<br />
<?php // ############# BEGIN SCRIPTED OUTPUT ##################### ?>
Your Writer Is: <input type="text" id="answer" size="20">
<?php // ############# END SCRIPTED OUTPUT ##################### ?>
<br />
<br />




<script type="text/javascript">
var email;
email="ckeller@nwi.com";
document.write("Your Email Is: <br />");
document.write(email);
document.write("<br /> Your Email Is: <br />");
email="merickson@nwi.com";
document.write(email);
</script>

<br />
<br />


Your Email Is: <input type="text">
<br />
<br />
Your Phone Number Is: <input type="text">
</form>

<br />
<br />




<script type="text/javascript">
txt1="bcunningham@nwi.com";
txt2="(219) 933-0001";
txt3=txt1+"<br />"+txt2;
</script>



<script type="text/javascript">
var x;
var mycars = new Array();
mycars[0] = "Saab";
mycars[1] = "Volvo";
mycars[2] = "BMW";

for (x in mycars)
{
document.write(mycars[x] + "<br />");
}
</script>


<br />
<br />



<script type="text/javascript">
var x;
var email = new Array();
email[0] = "bcunningham@nwi.com";
email[1] = "ckraly@nwi.com";
email[2] = "ckeller@nwi.com";
email[3] = "merickson@nwi.com";

for (x in email)
{
document.write(email[x] + "<br />");
}
</script>




<br />
<br />






<script type="text/javascript">
var d = new Date();
theDay=d.getDay();
switch (theDay)
{
case 5:
  document.write("<b>Finally Friday</b>");
  break;
case 6:
  document.write("<b>Super Saturday</b>");
  break;
case 0:
  document.write("<b>Sleepy Sunday</b>");
  break;
default:
  document.write("<b>I'm really looking forward to this weekend!</b>");
}
</script>



<?php // ############# SUBMIT OFFERING ##################### ?>
<!-- <input type="submit" name="submit" value="Submit Offering"> -->
<?php // ############# END SUBMIT OFFERING ##################### ?>


</body>
</html>