//global variables
var chart;
var chartType = 'column';
var optionsChart;
var minChart = 0;
var maxChart = 90000;
var votesTotal;
var candidateSoglin;
var candidateCieslewicz;
var dataSource = 2409321;


//begin function
$(document).ready(function(){

	//chart options
	optionsChart = {

		chart: {
			renderTo: 'hc-ouput',
			defaultSeriesType: chartType,
			marginBottom: 35,
		},

		title: {
			style: {
				color: '#000000',
			},
			align: 'center',
			text: '2011 Madison Mayoral Voting',
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
				'Total Votes',
				'Paul Soglin',
				'Dave Cieslewicz',
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
				return '<b>' + this.y + ' votes';
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

		//write data
		$.getJSON('http://tables.googlelabs.com/api/query?sql=SELECT * FROM ' + dataSource + ' &jsonCallback=?', function(data) {

	    	//assign data to chart variables
			var votesTotal = data.table.rows[0][0]
			var candidateSoglin = data.table.rows[0][1]
			var candidateCieslewicz = data.table.rows[0][2]

			//write chart series
			var data = [votesTotal, candidateSoglin, candidateCieslewicz];
	
			// Create the chart if it doesn't exist
			if(!chart)
				chart = new Highcharts.Chart(optionsChart);
		
			// Set new data to the chart
			chart.series[0].setData(data, chartType)

		});

	//working on change chart type via select menu
	/*$('#chartType').change(function() {
		var chartType = $('#chartType').val();
		alert(chartType);
	});*/

});