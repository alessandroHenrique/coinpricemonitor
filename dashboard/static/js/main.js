var wsUri = "ws://localhost:8000/ws/";

function setupWebSocket() {
  var websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
}

function onOpen (evt) {
  console.log("Connected to websocket!");
}

function onMessage (evt) {
  var spanWithPrice = document.getElementsByClassName('bitcoin-price')[0];
  spanWithPrice.innerHTML = ' $' + String(JSON.parse(evt.data).last_price);
}

window.addEventListener("load", setupWebSocket, false);
