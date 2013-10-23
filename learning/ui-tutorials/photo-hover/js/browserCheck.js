window.addEvent('domready',function(e){
	if(Browser.Engine.name=='webkit'){
		$('warning').setStyle('display', 'none');
		$('msg').setStyle('display', 'block');
	}
});