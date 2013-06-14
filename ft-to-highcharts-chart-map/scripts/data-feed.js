//global variables
var chart;
var map;
var series;
var optionsChart;
var minChart = 0;
var maxChart = 2100;
var ward;
var votesSoglin;
var votesCieslewicz;
var votesTotal;

//begin function
$(document).ready(function(){

	//chart options
	optionsChart = {

		chart: {
			renderTo: 'hc-ouput',
			defaultSeriesType: 'column',
			marginBottom: 35,
		},

		title: {
			style: {
				color: '#000000',
			},
			align: 'left',
			text: '',
		},
		subtitle: {
			style: {
				color: '#000000',
			},
			y: 37,
			align: 'left',
		},
		xAxis: {
			categories: [
				'Total',
				'Soglin',
				'Cieslewicz',
			]
		},

		yAxis: {
			min: minChart,
			max: maxChart,
			title: {
				text: 'Number of Votes',
				style: {
					color: '#999999',
				}
			}
		},

		legend: {
			itemStyle: {},
			layout: 'vertical',
			backgroundColor: '#FFFFFF',
			align: 'left',
			verticalAlign: 'top',
			x: 1000000,
			y: 70,
			floating: true,
			shadow: true
		},

		tooltip: {
			style: {},

			formatter: function () {
				return '' + this.point.name + ':' + '<b>' + this.y + ' votes';
			}
		},

		plotOptions: {
			column: {
				pointPadding: 0.025,
				borderWidth: 0
			}
		},

		credits: {
			style: {
				color: '#666666',
			},

			text: 'SOURCE: City of Madison',
			href: 'http://www.cityofmadison.com/',
			position: {
				align: 'right',
				y: -3
			}
		},

		series: [{
		  data: []
		}]

	};

	//map options
    var optionsMap = {
		zoom: 11,
		center: new google.maps.LatLng(43.083433,-89.403305),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		disableDragging: true,
		mapTypeControl: false,
		navigationControl: true,
		streetViewControl: false,
		scaleControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_TOP
		}
	};

	//write the map
	var map = new google.maps.Map(document.getElementById('map_canvas'), optionsMap);

	//fusion layer
	layer = new google.maps.FusionTablesLayer(835224, {suppressInfoWindows: true});
	layer.setMap(map);

	//click listener
	google.maps.event.addListener(layer, 'click', function(q) {

		//write data into divs
		$('#map-explainer').hide();

		$("#ft-ouput").html(
			'<table>' +
			'<h4>Ward ' + q.row['Ward_name'].value + ' (Aldermanic District ' + q.row['ald'].value + ')</h4>' +
			'<tbody>' +
			'<tr>' +
			'<th>Candidate</th>' +
			'<th>Percent</th>' +
			'</tr>' +
			'<tr>' +
			'<td>Soglin</td>' +
			'<td>' + q.row['Percent_Paul_Soglin'].value + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Cieslewicz</td>' +
			'<td>' + q.row['Percent_Dave_Cieslewicz'].value + '</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>');

		//writes chart
		updateChart(q);

	});

});


//writes chart
function updateChart(q){

    //assign data to chart variables
	var ward = q.row['Ward_name'].value
	var votesSoglin = q.row['Votes_Paul_Soglin'].value
	var votesCieslewicz = q.row['Votes_Dave_Cieslewicz'].value
	var votesTotal = q.row['Total_ward_votes'].value

	//write chart series
	var data = [
		['Ward ' + ward, votesTotal],
		['Ward ' + ward, votesSoglin],
		['Ward ' + ward, votesCieslewicz],
	];

	// Create the chart if it doesn't exist
	if(!chart)
	  chart = new Highcharts.Chart(optionsChart);

	// Set new data to the chart
	chart.series[0].setData(data)
}