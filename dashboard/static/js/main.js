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
});

anychart.onDocumentReady(function() {
  const BTC_INITIAL_PRICE = 3000
  // create data set on our data
  var dataSet = anychart.data.set([getData(BTC_INITIAL_PRICE)]);

  // map data for the first series, take x from the zero column and value from the first column of data set
  var seriesData_1 = dataSet.mapAs({
  x: [0],
  value: [1]
  });

  // create line chart
  chart = anychart.line();

  // turn on chart animation
  chart.animation(true);

  // set chart padding
  chart.padding([10, 20, 5, 20]);

  // turn on the crosshair
  chart.crosshair()
  .enabled(true)
  .yLabel(false)
  .yStroke(null);

  // set tooltip mode to point
  chart.tooltip().positionMode('point');

  // set chart title text settings
  chart.title('Trend of Sales of the Most Popular Products of ACME Corp.');
  chart.title().padding([0, 0, 5, 0]);

  // set yAxis title
  chart.yAxis().title('Number of Bottles Sold (thousands)');
  chart.xAxis().labels().padding([5]);

  // create first series with mapped data
  var series_1 = chart.line(seriesData_1);
  series_1.name('Brandy');
  series_1.hoverMarkers()
  .enabled(true)
  .type('circle')
  .size(4);
  series_1.tooltip()
  .position('right')
  .anchor('left')
  .offsetX(5)
  .offsetY(5);

  // turn the legend on
  chart.legend()
  .enabled(true)
  .fontSize(13)
  .padding([0, 0, 10, 0]);

  // set container id for the chart and set up paddings
  chart.container('container');

  // initiate chart drawing
  chart.draw();

  var wsUri = "ws://localhost:8000/ws/";
  var websocket;

  function setupWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
  }

  function onOpen (evt) {
    console.log("Connected to websocket!");
  }

  function onMessage (evt) {
    console.log('on message')
    var data = JSON.parse(evt.data);
    data = getData(data.BTC)
    dataSet.append(data);
  }

  setupWebSocket();
});

function getData(data) {
  var currentDate = new Date();
  var formattedDate =
      ("00" + currentDate.getHours()).slice(-2) + ":" +
      ("00" + currentDate.getMinutes()).slice(-2) + ":" +
      ("00" + currentDate.getSeconds()).slice(-2);

  return [formattedDate, data]
}
