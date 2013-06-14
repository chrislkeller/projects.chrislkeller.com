var jqueryNoConflict = jQuery;
var defaultChartOptions = defaultChartOptions || {};
var dataChartConfig = dataChartConfig || {};

// begin main function
jqueryNoConflict(document).ready(function(){
    dataChartConfig.initializeDataSource();
});
// end main function

// default configuration options
var defaultChartOptions = {

    // specifies source of data for the table, either 'tabletop' or 'flatfile'.
    dataSource: 'tabletop',

    // add the key from your Google spreadsheet if the dataSource is set to tabletop.
    spreadsheetKey: '0AjsyCVrBXivzdFBOeDBOMnRJMmpzc3pHLXhhQnVRQVE',

    // add the name of the sheet in your Google spreadsheet
    dataSheet: 'lacers_contribs',

    // add the path to a flat json file if the dataSource is set to flatfile.
    jsonFile: '',

    // the div id in which the table will be displayed.
    chartElementContainer: '#demo',

    // the type of table to render, either 'standard' or 'drilldown'.
    // drilldown adds drill-down rows that contain more information.
    chartType: 'spline',

    chartCategories: [
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ]
};

// begin main datatables object
var dataChartConfig = {

    // call data from tabletop
    initializeDataSource: function(){
        Tabletop.init({
            key: defaultChartOptions.spreadsheetKey,
            callback: dataChartConfig.showInfo,
            parseNumbers: true,
            simpleSheet: true,
            debug: false
        });
    },

    showinfo: function(data){
        console.log(data);
    }


};










// create an instance of the chart
function getSplineChartConfig(containerToRenderTo, titleText, subtitleText, chartDataArray){

    var configChart = {};

    configChart.chart = {
        renderTo: containerToRenderTo,
        backgroundColor: '#ffffff',
        zoomType: 'xy',
    };

    configChart.title = {
        text: titleText
    };

    configChart.subtitle = {
        text: subtitleText
    };

    configChart.xAxis = [{
        categories: ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012']
    }];

    configChart.yAxis = [{

        // primary axis
        labels: {
           formatter: function() {
                return this.value / 1000000 +'M';
            },
            style: {
                color: '#2B2B2B'
            }
        },
        title: {
            text: 'Annual pension contributions (in millions)',
            style: {
                color: '#2B2B2B'
            }
        },

        tickPixelInterval: 50

    }];

    configChart.tooltip = {
        formatter: function(){
            return ''+ this.series.name +': '+ Highcharts.numberFormat(this.y, 0, ',');
        }
    };

    configChart.legend = {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        y: 0,
        floating: false,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
    };

    configChart.credits = {
        enabled: true,
        text: 'KPCC'
    };

    configChart.series = chartDataArray;

    return configChart;

};
//end function