<?php

class simpleCMS {

  var $host;
  var $username;
  var $password;
  var $table;

//READS & DISPLAYS FROM DATABASE
  public function display_public() {
    $q = "SELECT * FROM testDB ORDER BY created DESC LIMIT 6";
    $r = mysql_query($q);

    if ( $r !== false && mysql_num_rows($r) > 0 ) {
      while ( $a = mysql_fetch_assoc($r) ) {
        $title = stripslashes($a['title']);
        $bodytext = stripslashes($a['bodytext']);
		$author = stripslashes($a['author']);

        $entry_display .= <<<ENTRY_DISPLAY

<div class="content">
<h2>$title</h2>
<p><strong>Body Text:</strong> $bodytext</p>
<p><strong>Author:</strong> $author</p>
</div>

ENTRY_DISPLAY;
      }
    } else {
      $entry_display = <<<ENTRY_DISPLAY

    <h2> This Page Is Under Construction </h2>
    <p>
      No entries have been made on this page. 
      Please check back soon, or click the
      link below to add an entry!
    </p>

ENTRY_DISPLAY;
    }
    $entry_display .= <<<ADMIN_OPTION

<p class="content-submission">
<a href="{$_SERVER['PHP_SELF']}?admin=1"><input type="submit" class="btn" value="Add a New Entry" /></a>
</p>

ADMIN_OPTION;

    return $entry_display;
  }


//FORM USED FOR DATABASE FIELDS
public function display_admin() {
	$form_action = htmlspecialchars($_SERVER['PHP_SELF'], ENT_QUOTES);
    return <<<ADMIN_FORM
	
	<div class="content-submission">
	<h1>Submit Content</h1>
	<form action="{$_SERVER['PHP_SELF']}" method="post">
    
	<!-- TITLE -->
    <label for="title">Title:</label><br />
    <input name="title" id="title" type="text" maxlength="150" />
    <div class="clear"></div>
    
	<!-- BODY TEXT -->
    <label for="bodytext">Body Text:</label><br />
    <textarea name="bodytext" id="bodytext" type="text"></textarea>
    <div class="clear"></div>
	
	<!-- AUTHOR -->
	<label for="author">Author:</label><br />
	<select name="author" id="author" style="width: 350px; margin-top: 0px">
	<option value="">Select The Author</option>
	<option value="Chris">Chris</option>
	<option value="Shawn">Shawn</option>
	<option value="Tommy">Tommy</option>
	<option value="Kid Sister">Kid Sister</option>
	</select>
	<div class="clear"></div>
    
	<!-- SUBMIT -->
    
	<input type="submit" class="btn" value="Create This Entry" />
	<a href="index.php"><input type="submit" class="btn" value="Back Home" /></a>
	</form>
	</div>
    
ADMIN_FORM;
  }

//WRITES TO THE DATABASE
  public function write($p) {
    if ( $_POST['title'] )
      $title = mysql_real_escape_string($_POST['title']);
    if ( $_POST['bodytext'])
      $bodytext = mysql_real_escape_string($_POST['bodytext']);
	if ( $_POST['author'])
      $author = mysql_real_escape_string($_POST['author']);
    if ( $title && $bodytext  && $author) {
      $created = time();
      $sql = "INSERT INTO testDB VALUES('$title','$bodytext','$author','$created')";
      return mysql_query($sql);
    } else {
      return false;
    }
  }

//CONNECTS TO THE DATABASE
 public function connect() {
    mysql_connect($this->host,$this->username,$this->password) or die("Could not connect. " . mysql_error());
    mysql_select_db($this->table) or die("Could not select database. " . mysql_error());
    return $this->buildDB();
}

//BUILDS THE DATABASE
private function buildDB() {
$sql = <<<MySQL_QUERY
CREATE TABLE IF NOT EXISTS testDB (
title		VARCHAR(150),
bodytext	TEXT,
author	TEXT,
created		VARCHAR(100)
)
MySQL_QUERY;

    return mysql_query($sql);
}

}
?>