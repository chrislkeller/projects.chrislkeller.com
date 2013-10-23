<?php include('includes/header.php'); ?>

<!-- BEGIN BODY -->
<body>

<!-- BEGIN WRAPPER -->
<div id="wrapper">

<!-- BEGIN SHADOW -->
<div class="shadow">

<?php include('includes/navigation.php'); ?>

<!-- BEGIN CONTENT -->
<div id="content">


<?php
function spamcheck($field)
  {
  //filter_var() sanitizes the e-mail
  //address using FILTER_SANITIZE_EMAIL
  $field=filter_var($field, FILTER_SANITIZE_EMAIL);

  //filter_var() validates the e-mail
  //address using FILTER_VALIDATE_EMAIL
  if(filter_var($field, FILTER_VALIDATE_EMAIL))
    {
    return TRUE;
    }
  else
    {
    return FALSE;
    }
  }

if (isset($_REQUEST['email']))
  {//if "email" is filled out, proceed

  //check if the email address is invalid
  $mailcheck = spamcheck($_REQUEST['email']);
  if ($mailcheck==FALSE)
    {
    echo "<p>Please don't try to use php email Injections. Just tell us your email.</p>
	<p><a href='http://www.greenlogomedia.com/'>Return to home page</a></p>";
    }
  else
    {//send email
    $email = $_REQUEST['email'] ;
    $subject = $_REQUEST['subject'] ;
    $message = $_REQUEST['message'] ;
    mail("contact@greenlogomedia.com", "Subject: $subject",
    $message, "From: $email" );
    echo "<p>Thank you for contacting us. We will be in touch shortly.</p>
	<p><a href='http://www.greenlogomedia.com/'>Return to home page</a></p>";
    }
  }
?>


</div>
<!-- END CONTENT -->

<!-- BEGIN SIDERAIL -->
<div id="siderail">
<h2>To think about</h2>
<ul>
<li><p>Why have a website?</p></li>
<li><p>What will users do?</p></li>
<li><p>What will bring users back?</p></li>
<li><p>What is your content plan?</p></li>
<li><p>What don't you want?</p></li>
</ul>
</div>
<!-- END SIDERAIL -->

<?php include('includes/footer.php'); ?>