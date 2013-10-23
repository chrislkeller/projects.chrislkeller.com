<!-- BEGIN HEADER -->
<?php include("/includes/header.php"); ?>
<!-- END HEADER -->

<!-- BEGIN HEADLINE -->
<p>
<label class="text">Headline</label>
<input type="text" id="headline" name="headline" class="text" value="Value=Headline"/>
</p>
<!-- END HEADLINE -->

<!-- BEGIN BYLINE -->
<p>
<label class="text">Byline</label>
<input type="text" id="byline" name="byline" class="text" value="Value=Byline"/>
</p>
<!-- END BYLINE -->

<!-- BEGIN OPTION MENU -->
<p>
<label class="menu">Menu 2</label>
<select id="#" name="#">
<option value="#">Option 1</option>
<option value="#">Option 2</option>
<option value="#">Option 3</option>
</select>
</p>
<!-- END OPTION MENU -->

<!-- BEGIN OPTION MENU -->
<p>
<label class="menu">Menu 3</label>
<select id="#" name="#">
<option value="#">Option 1</option>
<option value="#">Option 2</option>
<option value="#">Option 3</option>
</select>
</p>
<!-- END OPTION MENU -->

<!-- BEGIN CHECKBOXES -->
<label class="checkbox">Menu 4</label>
<input type="checkbox" name="#" class="click" value="#" />

<label class="checkbox">Menu 5</label>
<input type="checkbox" name="#" class="click" value="#" />

<label class="checkbox">Menu 6</label>
<input type="checkbox" name="#" class="click" value="#" />

<label class="checkbox">Menu 7</label>
<input type="checkbox" name="#" class="click" value="#" />
<!-- END CHECKBOXES -->

<form action="#">

<fieldset>

<legend>Form legend</legend>

<div><label for="f1">Text input:</label><input type="text" id="f1" value="input text" /></div>

<div><label for="pw">Password input:</label><input type="password" id="pw" value="password" /></div>

<div><label for="f2">Radio input:</label><input type="radio" id="f2" /></div>

<div><label for="f3">Checkbox input:</label><input type="checkbox" id="f3" /></div>

<div><label for="f4">Select field:</label><select id="f4"><option>Option 01

</option><option>Option 02</option></select></div>


<div><label for="f5">Textarea:</label><textarea id="f5" cols="30" rows="5" >Textarea text</textarea></div>

<div><label for="f6">Input Button:</label> <input type="button" id="f6" value="button text" /></div>

</fieldset>

</form>

<!-- BEGIN FOOTER -->
<?php include("/includes/footer.php"); ?>
<!-- END FOOTER -->