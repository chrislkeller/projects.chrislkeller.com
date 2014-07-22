var appConfig = appConfig || {};
var fn = fn || {};

// begin main function
$(document).ready(function() {
    fn.retrieveTabletopData(appConfig.spreadsheetUrl);
});

// application configuration object
var appConfig = {
    spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1OcCB2DtXQEDKFhuxeV0DVlSzjmkKvm8LZmNidLAf1gk/pubhtml",
    chartType: "column",
    minChart: 0,
    maxChart: 2000
};

// begin data processing object
var fn = {

    // get data from the spreadsheet via tabletop
    retrieveTabletopData: function(spreadsheetUrl){
        Tabletop.init({
            key: spreadsheetUrl,
            callback: fn.buildChart,
            simpleSheet: true
        });
    },

    buildChart: function(data){
        var chart;

        // assign data to chart variables and convert to integers
        var votesTotal = parseInt(data[0].totalvotes);
        var candidateOne = parseInt(data[0].candidate1);
        var candidateTwo = parseInt(data[0].candidate2);

        //write chart series
        var chartData = [votesTotal, candidateOne, candidateTwo];

        // create the chart if it doesn't exist
        if(!chart){
            chart = new Highcharts.Chart(chartOptions)
        };

        // set new data to the chart
        chart.series[0].setData(chartData, chartOptions.chartType)

    }
};

//chart options
var chartOptions = {

    chart: {
        renderTo: "chart-container",
        defaultSeriesType: appConfig.chartType,
        marginBottom: 35,
    },

    title: {
        style: {
            color: "#000000",
        },
        align: "center",
        text: "2011 Madison Mayoral Voting",
    },
    subtitle: {
        style: {
            color: "#000000",
        },
        y: 37,
        align: "left",
    },
    xAxis: {
        categories: [
            "Total Votes",
            "Paul Soglin",
            "Dave Cieslewicz",
        ]
    },

    yAxis: {
        min: appConfig.minChart,
        max: appConfig.maxChart,
        title: {
            text: "Number of Votes",
            style: {
                color: "#999999",
            }
        }
    },

    legend: {
        itemStyle: {},
        layout: "vertical",
        backgroundColor: "#FFFFFF",
        align: "left",
        verticalAlign: "top",
        x: 1000000,
        y: 70,
        floating: true,
        shadow: true
    },

    tooltip: {
        style: {},
        formatter: function () {
            return "<b>" + this.y + " votes";
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
            color: "#666666",
        },

        text: "SOURCE: City of Madison",
        href: "http://www.cityofmadison.com/",
        position: {
            align: "right",
            y: -3
        }
    },

    series: [{
      data: []
    }]

};