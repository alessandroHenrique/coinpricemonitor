var wsUri = "ws://localhost:8000/ws/";
var websocket;
var dataLineGraph = [];
var svg;

function setupWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  setupGraph();
}

function onOpen (evt) {
  console.log("Connected to websocket!");
}

function onMessage (evt) {
  var data = JSON.parse(evt.data);

  if (data.BTC) {
    $("span.bitcoin-price").html("$" + data.BTC)
    dataLineGraph.push({
      time: new Date(),
      value: +data.BTC
    });
  } else {
    $("span.litecoin-price").html("$" + data.LTC)
    dataLineGraph.push({
      time: new Date(),
      value: +data.LTC
    });
  }

  if ($("svg").length == 0) {
    setupGraph();
  }

  plotLineGraph();
}

// keep reference to these variables from setupGraph
var valueline, x, y, xAxisG, yAxisG, line, focus;

// Set the dimensions of the canvas / graph
var margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
  },
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

var bisectDate = d3.bisector(function(d) { return d.date; }).left;
var formatValue = d3.format(",.2f");
var formatCurrency = function(d) { return "$" + formatValue(d); };

function setupGraph() {

  var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  // Set the ranges
  x = d3.time.scale().range([0, width]);
  y = d3.scale.linear().range([height, 0]);

  // Define the line
  valueline = d3.svg.line()
    .x(function(d) {
      return x(d.time);
    })
    .y(function(d) {
      return y(d.value);
    })
    .interpolate('linear');

  // Adds the svg canvas
  svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the X Axis
  xAxisG = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

  // Add the Y Axis
  yAxisG = svg.append("g")
    .attr("class", "y axis");

  line = svg.append("path");

  focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

  focus.append("circle")
      .attr("r", 4.5);

  focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);
}

// *** Function for to draw the line graph ...
function plotLineGraph() {

  // Scale the range of the data
  x.domain(d3.extent(dataLineGraph, function(d) {
    return d.time;
  }));

  if (dataLineGraph.length == 1) {
    y.domain([dataLineGraph[0].value - 25, dataLineGraph[0].value + 25])
  }

  if ((y.domain()[1] - dataLineGraph[dataLineGraph.length - 1].value < 2) ||
      (dataLineGraph[dataLineGraph.length - 1].value - y.domain()[0] < 2)) {
    y.domain([dataLineGraph[dataLineGraph.length - 1].value - 25, dataLineGraph[dataLineGraph.length - 1].value + 25]);
  }

  // transistion axis
  xAxisG
    .transition()
    .duration(500)
    .ease("linear")
    .call(d3.svg.axis().scale(x).orient("bottom"));

  yAxisG
    .transition()
    .duration(500)
    .ease("linear")
    .call(d3.svg.axis().scale(y).orient("left").ticks(15));

  // change the line
  line.transition()
    .duration(500)
    .attr("d", valueline(dataLineGraph))
    .attr('class', 'dots');
}

$(".change-coin-js").click(function (e) {
  if ($(".wrapper-bitcoin").css("display") == "none") {
    $(".wrapper-bitcoin").css("display", "block");
    $(".wrapper-litecoin").css("display", "none");

    $(".change-coin-js")[0].innerHTML = "Change to litecoin";

    websocket.send(JSON.stringify({
      coin: 'bitcoin'
    }))
  } else if ($(".wrapper-litecoin").css("display") == "none") {
    $(".wrapper-litecoin").css("display", "block");
    $(".wrapper-bitcoin").css("display", "none");

    $(".change-coin-js")[0].innerHTML = "Change to bitcoin";

    websocket.send(JSON.stringify({
      coin: 'litecoin'
    }))
  }

  $("svg").remove();
  dataLineGraph = [];
});

window.addEventListener("load", setupWebSocket, false);
