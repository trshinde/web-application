/**
 * http://usejsdoc.org/
 */


function tryMe(arg){
	document.write(arg);
}

function dataSelect(country, fromMongo){
	var year = [];
	var value = [];

	
	console.log(fromMongo);
	
	hdiCrossFilter(fromMongo.hdi);
	
	educationCrossFilter(fromMongo.education);
	
	gdpCrossFilter(fromMongo.gdp);
	
	lifeCrossFilter(fromMongo.lifeExpectancy);
	
	//testFunction(fromMongo.childLabour);
}

function hdiCrossFilter(data){
	console.log("Hi");
	var dataNameChart = dc.barChart("#dataType");
	var dataNameLineChart = dc.lineChart("#dataType_1");
	var top3Chart = dc.rowChart("#dataType_2");

	var dataSet = data;
	
	var ndx = crossfilter(data);
	var all = ndx.groupAll();
	var i = 0;
	
	var yearValue = ndx.dimension(function (d) {return d.year; });
	var dataName = ndx.dimension(function (d) {return d.value; });
	
	var yearTypeGroup = yearValue.group().reduceSum(function(d) {return d.value;});
	var dataNameGroup = dataName.group().reduceSum(function(d) {return d.year;});
	
	dataNameChart
	.width(500)
    .height(125)
    .x(d3.scale.linear().domain([15,70]))
    .brushOn(false)
    .yAxisLabel("value")
    .xAxisLabel("year")
	.dimension(yearValue)
	.group(yearTypeGroup)
	.elasticX(true)
	.on('renderlet', function(chart) {
        chart.selectAll('rect').on("click", function(d) {
            console.log("click!", d);
        });
    });
	
	console.log(yearValue.bottom(1));
	
	var minDate = yearValue.bottom(1)[0].year;
	var maxDate = yearValue.top(1)[0].year;
	console.log(minDate);
	console.log(maxDate);
	
	dataNameLineChart
	.height(125)
	.width(400)
	.margins({top: 10, right: 50, bottom: 30, left: 50})
	.dimension(yearValue)
	.group(yearTypeGroup)
	.transitionDuration(500)
	.x(d3.time.scale().domain([minDate, maxDate]))
	.elasticY(true)
	.renderHorizontalGridLines(true)
	.renderVerticalGridLines(true)
	.xAxisLabel("Year")
	.yAxis().ticks(6);
	
	
	top3Chart
	.height(125)
	.width(250)
	.dimension(yearValue)
	.group(yearTypeGroup)
	.elasticX(true)
	.data(function (group) { return group.top(5); });
	
	dc.renderAll();
}


function educationCrossFilter(data){
	
	
	var dataNameChart = dc.barChart("#dataType1");
	var dataNameLineChart = dc.lineChart("#dataType1_11");
	var top3Chart = dc.rowChart("#dataType1_12");
	var dataSet = data;
	
	var ndx = crossfilter(data);
	var all = ndx.groupAll();
	var i = 0;
	
	var yearValue = ndx.dimension(function (d) {return d.year; });
	var dataName = ndx.dimension(function (d) {return d.value; });
	
	var yearTypeGroup = yearValue.group().reduceSum(function(d) {return d.value;});
	var dataNameGroup = dataName.group().reduceSum(function(d) {return d.year;});
	
	dataNameChart
	.width(500)
    .height(125)
    .x(d3.scale.linear().domain([15,70]))
    .brushOn(false)
    .yAxisLabel("value")
    .xAxisLabel("year")
	.dimension(yearValue)
	.group(yearTypeGroup)
	.elasticX(true)
	.on('renderlet', function(chart) {
        chart.selectAll('rect').on("click", function(d) {
            console.log("click!", d);
        });
    });
	
	var minDate = yearValue.bottom(1)[0].year;
	var maxDate = yearValue.top(1)[0].year;
	console.log(minDate);
	console.log(maxDate);
	
	dataNameLineChart
	.height(125)
	.width(400)
	.margins({top: 10, right: 50, bottom: 30, left: 50})
	.dimension(yearValue)
	.group(yearTypeGroup)
	.transitionDuration(500)
	.x(d3.time.scale().domain([minDate, maxDate]))
	.elasticY(true)
	.renderHorizontalGridLines(true)
	.renderVerticalGridLines(true)
	.xAxisLabel("Year")
	.yAxis().ticks(6);
	
	
	top3Chart
	.height(125)
	.width(250)
	.dimension(yearValue)
	.group(yearTypeGroup)
	.elasticX(true)
	.data(function (group) { return group.top(5); });
	dc.renderAll();
	dc.renderAll();

}

function gdpCrossFilter(data){
	console.log("Here");
	
	var dataNameChart = dc.barChart("#dataType2");
	var dataNameLineChart = dc.lineChart("#dataType2_21");
	var top3Chart = dc.rowChart("#dataType2_22");
	var dataSet = data;
	
	var ndx = crossfilter(data);
	var all = ndx.groupAll();
	var i = 0;
	
	var yearValue = ndx.dimension(function (d) {return d.year; });
	var dataName = ndx.dimension(function (d) {return d.value; });
	
	var yearTypeGroup = yearValue.group().reduceSum(function(d) {return d.value;});
	var dataNameGroup = dataName.group().reduceSum(function(d) {return d.year;});
	
	dataNameChart
	.width(500)
    .height(125)
    .x(d3.scale.linear().domain([15,70]))
    .brushOn(false)
    .yAxisLabel("value")
    .xAxisLabel("year")
	.dimension(yearValue)
	.group(yearTypeGroup)
	.elasticX(true)
	.on('renderlet', function(chart) {
        chart.selectAll('rect').on("click", function(d) {
            console.log("click!", d);
        });
    });
	
	//console.log("Neeraj Venugopal");
	console.log(yearValue.bottom(1)[0]);
	var minDate = yearValue.bottom(1)[0].year;
	var maxDate = yearValue.top(1)[0].year;
	console.log(minDate);
	console.log(maxDate);
	
	dataNameLineChart
	.height(125)
	.width(400)
	.margins({top: 10, right: 50, bottom: 30, left: 50})
	.dimension(yearValue)
	.group(yearTypeGroup)
	.transitionDuration(500)
	.x(d3.time.scale().domain([minDate, maxDate]))
	.elasticY(true)
	.renderHorizontalGridLines(true)
	.renderVerticalGridLines(true)
	.xAxisLabel("Year")
	.yAxis().ticks(6);
	
	
	top3Chart
	.height(125)
	.width(250)
	.dimension(yearValue)
	.group(yearTypeGroup)
	.elasticX(true)
	.data(function (group) { return group.top(5); });
	dc.renderAll();
	dc.renderAll();
	
	dc.renderAll();

	
}


function lifeCrossFilter(data){
	var dataNameChart = dc.barChart("#dataType3");
	var dataNameLineChart = dc.lineChart("#dataType3_31");
	var top3Chart = dc.rowChart("#dataType3_32");
	var dataSet = data;
	
	var ndx = crossfilter(data);
	var all = ndx.groupAll();
	var i = 0;
	
	var yearValue = ndx.dimension(function (d) {return d.year; });
	var dataName = ndx.dimension(function (d) {return d.value; });
	
	var yearTypeGroup = yearValue.group().reduceSum(function(d) {return d.value;});
	var dataNameGroup = dataName.group().reduceSum(function(d) {return d.year;});
	
	dataNameChart
	.width(500)
    .height(125)
    .x(d3.scale.linear().domain([15,70]))
    .brushOn(false)
    .yAxisLabel("value")
    .xAxisLabel("year")
	.dimension(yearValue)
	.group(yearTypeGroup)
	.elasticX(true)
	.on('renderlet', function(chart) {
        chart.selectAll('rect').on("click", function(d) {
            console.log("click!", d);
        });
    });
	
	var minDate = yearValue.bottom(1)[0].year;
	var maxDate = yearValue.top(1)[0].year;
	console.log(minDate);
	console.log(maxDate);
	
	dataNameLineChart
	.height(125)
	.width(400)
	.margins({top: 10, right: 50, bottom: 30, left: 50})
	.dimension(yearValue)
	.group(yearTypeGroup)
	.transitionDuration(500)
	.x(d3.time.scale().domain([minDate, maxDate]))
	.elasticY(true)
	.renderHorizontalGridLines(true)
	.renderVerticalGridLines(true)
	.xAxisLabel("Year")
	.yAxis().ticks(6);
	
	
	top3Chart
	.height(125)
	.width(250)
	.dimension(yearValue)
	.group(yearTypeGroup)
	.elasticX(true)
	.data(function (group) { return group.top(5); });
	dc.renderAll();
	dc.renderAll();
}


function testFunction(data){
	console.log("I am HEre");
	var testChart = dc.lineChart("#testDataType");
	var ndx = crossfilter(data);
	var all = ndx.groupAll();
	
	var yearValue = ndx.dimension(function (d) {return d.year; });
	var dataName = ndx.dimension(function (d) {return d.value; });
	
	var yearTypeGroup = yearValue.group().reduceSum(function(d) {return d.value;});
	var dataNameGroup = dataName.group().reduceSum(function(d) {return d.year;});
	
	var minDate = yearValue.bottom(1)[0].year;
	var maxDate = yearValue.top(1)[0].year;
	console.log(minDate);
	console.log(maxDate);
	
	testChart
	.height(220)
	.margins({top: 10, right: 50, bottom: 30, left: 50})
	.dimension(yearValue)
	.group(yearTypeGroup)
	.transitionDuration(500)
	.x(d3.time.scale().domain([minDate, maxDate]))
	.elasticY(true)
	.renderHorizontalGridLines(true)
	.renderVerticalGridLines(true)
	.xAxisLabel("Year")
	.yAxis().ticks(6);
	
	
	/*
	.height(220)
	.margins({top: 10, right: 50, bottom: 30, left: 50})
	.dimension(yearValue)
	.group(dataNameGroup)
	.renderArea(true)
	.transitionDuration(500)
	.x(d3.time.scale())
	.elasticY(true)
	.renderHorizontalGridLines(true)
	.renderVerticalGridLines(true)
	.xAxisLabel("Year")
	.yAxis().ticks(6);
	*/
	
/*
 * .dimension(yearValue)
	.xUnits(dc.units.ordinal.)
	.group(yearTypeGroup)
	.elasticX(true)
	.data(function (group) { return group.top(5); });
 */

	
	dc.renderAll();
}


