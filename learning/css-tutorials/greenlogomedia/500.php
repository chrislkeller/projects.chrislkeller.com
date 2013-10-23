<!DOCTYPE HTML>
<html>

<!-- BEGIN DOC HEADER -->
<head>

<!-- BEGIN META -->
<title>green logo media | 500 Server Error</title>
<meta name="description" content="Specializing in wordpress design, implementation and upkeep, Green Logo Media is a full-service design, content and social media consulting business.">
<meta name="keywords" content="green logo media, wordpress, wordpress themes, wordpress design, web design, content strategy, social media strategy ">
<meta name="author" content="Green Logo Media, &#169; 2011">
<meta name="google-site-verification" content="5V_tmsCFrR4zWGaXvH_7EZNgEcscOy7O6GbyBo-XkBc" />
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="content-language" content="en">
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
<!-- END META -->

<!-- BEGIN FAVICON/MOBILE TOUCH ICON -->
<link rel="shortcut icon" href="#">
<link rel="apple-touch-icon" href="#">
<!-- END FAVICON/MOBILE TOUCH ICON -->

<!-- BEGIN CSS  -->
<link rel="stylesheet" type="text/css" href="css/typography.css">
<link rel="stylesheet" type="text/css" href="css/layout.css">
<!-- END CSS  -->

<!-- BEGIN SCRIPTS  -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js"></script>
<!-- END SCRIPTS  -->

</head>
<!-- END DOC HEADER -->

<?php include('/includes/header.php'); ?>

<!-- BEGIN BODY -->
<body>

<!-- BEGIN WRAPPER -->
<div id="wrapper">

<!-- BEGIN SHADOW -->
<div class="shadow">

<?php include('/includes/navigation.php'); ?>

<!-- BEGIN CONTENT -->
<div id="content">
<h2>500 Server Error</h2>
<p>A misconfiguration on the server caused a hiccup.
Check the server logs, fix the problem, then try again.</p>
<?
echo "URL: http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]<br>\n";
$fixer = "checksuexec ".escapeshellarg($_SERVER[DOCUMENT_ROOT].$_SERVER[REQUEST_URI]);
echo `$fixer`;
?>
<hr></hr>
</div>
<!-- END CONTENT -->

<!-- BEGIN SIDERAIL -->
<div id="siderail">
</div>
<!-- END SIDERAIL -->

<?php include('/includes/footer.php'); ?>