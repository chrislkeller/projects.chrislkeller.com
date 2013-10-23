$(function(){
	//$("#MainNavigation a[href='" + location.href + "']").addClass('current');
	$("#RSSButton").toggle(function(){
		$("#SubscriptionChooser").show('fast');	
		//$("#Search").hide();
	}, function(){
		$("#SubscriptionChooser").hide('fast');	
		//$("#Search").show();
	});
});