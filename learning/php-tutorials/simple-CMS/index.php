<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!-- BEGIN DOCUMENT -->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<!-- BEGIN HEADER -->
<head>

<!-- BEGIN META DATA -->
<title>Simple CMS with PHP</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="content-language" content="en"></meta>
<meta name="description" content="#"></meta>
<meta name="keywords" content="#"></meta>
<!-- END META DATA -->

<!-- BEGIN CSS -->
<link rel="stylesheet" type="text/css" href="style.css" />

<style></style>
<!-- END CSS -->

<!-- BEGIN SCRIPTS -->
<script type="text/javascript" src="#"></script>
<!-- END SCRIPTS -->

</head>
<!-- END DOCUMENT HEADER -->

<!-- BEGIN BODY -->
<body>

<!-- BEGIN WRAPPER -->
<div id="page-wrap">

<!-- BEGIN DATABASE CONNECT -->
<?php
    
      include_once('_class/simpleCMS.php');
      $obj = new simpleCMS();

	  /* CHANGE THESE SETTINGS FOR YOUR OWN DATABASE */
      $obj->host = 'localhost:8888';
      $obj->username = 'root';
      $obj->password = 'thedoors';
      $obj->table = 'php_budget';
      $obj->connect();
    
      if ( $_POST )
        $obj->write($_POST);
    
      echo ( $_GET['admin'] == 1 ) ? $obj->display_admin() : $obj->display_public();
    
?>
<!-- END DATABASE CONNECT -->

</div>
<!-- END WRAPPER -->

</body>
<!-- END BODY -->

</html>
<!-- END DOCUMENT -->