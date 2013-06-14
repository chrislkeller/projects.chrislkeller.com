var $ = jQuery.noConflict();


      window.onload = function() { init() };

      var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AulEnFPPj4jWdHhhc3cwdWZlek9oTDQ0MW1zY21RalE&output=html';
	  
	  //These are the variables that will hold your data that feeds the chart
	  var firstDataSet = [];
	  var secondDataSet = [];
  	  var thirdDataSet = [];

	 
      
	  function init() {
        Tabletop.init( { key: public_spreadsheet_url,
                         callback: showInfo,
                         simpleSheet: true } );
      }

      function showInfo(data, tabletop) {
      
		$.each( tabletop.sheets(), function(i, sheet) {
			$("#table_info").append("<p>Your sheet named " + sheet.name + " has " + sheet.column_names.join(", ") + " as columns that you can pull data from.</p>");
		});
		
		$.each( tabletop.sheets("Sheet1").all(), function(i, header) {
			//You are looping through all of the rows in each column and assigning them to the variable as an array.
			
			var yAxis = header.month;
			var dataOne = header.sales;
			var dataTwo = header.dollars;
			var dataThree = header.customers;
			
			//This exists only to populate the variables above that feed yoru chart
			var salesArray = [yAxis, dataOne]
			var dollarsArray = [yAxis, dataTwo];
			var peopleArray = [yAxis, dataThree];
			
			//Here you are pushing the data to the vars that build your chart
			firstDataSet.push(salesArray);
			secondDataSet.push(dollarsArray);
			thirdDataSet.push(peopleArray);
		});
	             
        
		//Build the chart
      	$(function() {
		
			//Options for formatting the X axis in the chart
			var options = {
			series : {
				points: {show: false, fill: true, fillColor: "rgba(255, 255, 255, 0.8)"},
				lines: {show: true}
			},
			xaxis: { ticks:[[1,'Jan.'],[2,'Feb.'],[3,'March'], [4,'April'], [5,'May'], [6,'June'],[7,'July'], [8,'Aug.'], [9,'Sept.'], [10,'Oct.']]},
			grid: {
				hoverable: true
			},
			legend: {
				show: true
					},
			colors: ["#990000", "#000", "#99ff00"]
			};
			
		
			
			$.plot("#placeholder", [
                { label: "Sales", 
                data: firstDataSet }, 
                {  label: "Dollars",
                data: secondDataSet }, 
                { label: "Customers",
                data: thirdDataSet }], options);
			
		});
      
      }
      

	

      document.write("The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a>");        
