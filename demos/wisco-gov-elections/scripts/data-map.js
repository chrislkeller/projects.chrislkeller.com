	//global variables
	var result2010 = 2287502; //2010 MAP DRAFT - Wisco Gov Election County By County
	var data2010 = 2287189; //2010 MAP DATA - Wisco Gov Election County By County

	var result2006 = 2287287; //2006 MAP DRAFT - Wisco Gov Election County By County
	var data2006 = 2287343; //2006 MAP DATA - Wisco Gov Election County By County
		
	var result2002 = 2287429; //2002 MAP DRAFT - Wisco Gov Election County By County
	var data2002 = 2287283; //2002 MAP DATA - Wisco Gov Election County By County
		
	var result1998 = 2294476; //1998 MAP DRAFT - Wisco Gov Election County By County
	var data1998 = 2294646; //1998 MAP DATA - Wisco Gov Election County By County
		
	var result1994 = 2294834; //1994 MAP DRAFT - Wisco Gov Election County By County
	var data1994 = 2294641; //1994 MAP DATA - Wisco Gov Election County By County
		
	var result1990 = 2297634; //1990 MAP DRAFT - Wisco Gov Election County By County
	var data1990 = 2297714; //1990 MAP DATA - Wisco Gov Election County By County
	
	var result1986 = 2297574; //1986 MAP DRAFT - Wisco Gov Election County By County
	var data1986 = 2297572; //1986 MAP DATA - Wisco Gov Election County By County

	var result1982 = 2297568; //1982 MAP DRAFT - Wisco Gov Election County By County
	var data1982 = 2297566; //1982 MAP DATA - Wisco Gov Election County By County

	var result1978 = 2297486; //1978 MAP DRAFT - Wisco Gov Election County By County
	var data1978 = 2297562; //1978 MAP DATA - Wisco Gov Election County By County
	
	var increment;
	var ftLayer;
	var dataLayer;
	var layer;
	var latlng = new google.maps.LatLng(44.74648547505308, -89.84939737499997);
	var zoom = 7;
	var map;

//begin function
$(document).ready(function(){
	
	//API options
    var options = {
			center: latlng,
			zoom: zoom,
			minZoom: zoom,
			maxZoom: zoom,
			scrollwheel: false,		
			draggable: false,
			mapTypeControl: false,
			navigationControl: false,
			streetViewControl: false,
			panControl: false,
			scaleControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_TOP}
	};

	//fusion layer & supress fusion info window
	var map = new google.maps.Map(document.getElementById('map_canvas'), options);
	layer = new google.maps.FusionTablesLayer(result1978, {suppressInfoWindows: true});
	layer.setQuery("SELECT geometry FROM " + result1978);
	layer.setMap(map);

		//click listener on current layer
		google.maps.event.addListener(layer, 'click', function(q) {

			$("#dem-votes").html(
				'<p><strong>Percent:</strong> ' + q.row['Dem County Percent'].value +
				'<br><strong>Votes:</strong> ' + q.row['Dem County Votes'].value +
				'<br><strong>Vote Margin: </strong>' + q.row['Dem County Margin'].value + '</p>');

			$("#gop-votes").html( 
				'<p><strong>Percent:</strong> ' + q.row['Gop County Percent'].value +
				'<br><strong>Votes:</strong> ' + q.row['Gop County Votes'].value +
				'<br><strong>Vote Margin:</strong> ' + q.row['Gop County Margin'].value + '</p>');

			$("#location").html( 
				'<h3>' + q.row['County_Name'].value + ' County Results</h3>');

			$("#third-votes").html( 
				'<p style="text-align: center"><strong>Third-Party/Write-in votes:</strong> ' + q.row['3rd Party'].value + '</p>');
		});

		//creates slider
		$("#slider").slider();
	
		var sliderBar = $('#slider'),
		play_btn = $('#play-btn');
	
		//slider options
		sliderBar.slider({
			'value':0,
			'min': 1978,
			'max': 2010,
			'step': 4,

		//displays when user slides the controller
  		slide: function(event, ui) {
			var increment = ui.value;
			var handle = ui.handle;
			$('div.values-container').html('<p>I am sliding</p>');
		},

		//displays when slider change is made
		change: function(event, ui) {
			var increment = ui.value;
			var handle = ui.handle;

			$('#values-container').html('result' + increment);

				var ftLayer = 'result' + increment;
				
				if(ftLayer == "result1978") {
					ftLayer = result1978;
					dataLayer = data1978;
					//alert('cool:'+ ftLayer);

				} else if(ftLayer == "result1982") {
					ftLayer = result1982;
					dataLayer = data1982;
					//alert('cool: '+ftLayer);
					
				} else if(ftLayer == "result1986") {
					ftLayer = result1986;
					dataLayer = data1986;
					//alert('cool: '+ftLayer);
					
				} else if(ftLayer == "result1990") {
					ftLayer = result1990;
					dataLayer = data1990;
					//alert('cool: '+ftLayer);
					
				} else if(ftLayer == "result1994") {
					ftLayer = result1994;
					dataLayer = data1994;
					//alert('cool: '+ftLayer);

				} else if(ftLayer == "result1998") {
					ftLayer = result1998;
					dataLayer = data1998;
					//alert('cool: '+ftLayer);

				} else if(ftLayer == "result2002") {
					ftLayer = result2002;
					dataLayer = data2002;
					//alert('cool: '+ftLayer);

				} else if(ftLayer == "result2006") {
					ftLayer = result2006;
					dataLayer = data2006;
					//alert('cool: '+ftLayer);

				} else if(ftLayer == "result2010") {
					ftLayer = result2010;
					dataLayer = data2010;
					//alert('cool: '+ftLayer);
				}
				
				//changes map
				$('#map-data').fadeOut('fast');				
				showLoading();

				layer.setMap();
				layer = new google.maps.FusionTablesLayer(ftLayer, {suppressInfoWindows: true});
				layer.setQuery("SELECT geometry FROM " + ftLayer);
				layer.setMap(map);

					//write data
					$.getJSON('http://tables.googlelabs.com/api/query?sql=SELECT * FROM ' + dataLayer + ' &jsonCallback=?', function(data) {

						$('#map-election').html(
							'<h3 class="display">' + data.table.rows[0][1] + ' Governor\'s Election</h3>');

						$("#dem-profile").html(
							'<h3 class="dem-highest">' + data.table.rows[0][11] + '</h3>' +
							'<img src="' + data.table.rows[0][12] + '" height="99px" alt="' + data.table.rows[0][11] + '" />');

						$("#dem-votes").html(
							'<p><strong>Percent:</strong> ' + data.table.rows[0][10] +
							'<br><strong>Votes:</strong> ' + data.table.rows[0][9] +
							'<br><strong>Margin: </strong>' + data.table.rows[0][22] + '</p>');

						$("#gop-profile").html( 
							'<h3 class="gop-highest">' + data.table.rows[0][17] + '</h3>' +
							'<img src="' + data.table.rows[0][18] + '" height="99px" alt="' + data.table.rows[0][17] + '" />');

						$("#gop-votes").html( 
							'<p><strong>Percent:</strong> ' + data.table.rows[0][16] +
							'<br><strong>Votes:</strong> ' + data.table.rows[0][15] +
							'<br><strong>Vote Margin: </strong>' + data.table.rows[0][24] + '</p>');
						
						$("#location").html( 
						'<h3>Statewide Results</h3>');

						$("#third-votes").html('');

						hideLoading();
						$("#map-data").fadeIn('fast'); 

					});
					
				//click listener on current layer
				google.maps.event.addListener(layer, 'click', function(q) {

					$("#dem-votes").html(
						'<p><strong>Percent:</strong> ' + q.row['Dem County Percent'].value +
						'<br><strong>Votes:</strong> ' + q.row['Dem County Votes'].value +
						'<br><strong>Vote Margin: </strong>' + q.row['Dem County Margin'].value + '</p>');

					$("#gop-votes").html( 
						'<p><strong>Percent:</strong> ' + q.row['Gop County Percent'].value +
						'<br><strong>Votes:</strong> ' + q.row['Gop County Votes'].value +
						'<br><strong>Vote Margin:</strong> ' + q.row['Gop County Margin'].value + '</p>');

					$("#location").html( 
						'<h3>' + q.row['County_Name'].value + ' County Results</h3>');

					$("#third-votes").html( 
						'<p style="text-align: center"><strong>Third-Party/Write-in votes:</strong> ' + q.row['3rd Party'].value + '</p>');
				
			});

		}
		//end slider change is made
  	});
		//end slider options
});
//end main function

		//loading screen
		function showLoading() {
			$("#map-loading").show();
		}

		function hideLoading() {
			$("#map-loading").hide();
		}