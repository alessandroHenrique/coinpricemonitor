var wsUri = "ws://localhost:8000/ws/";
var websocket;


function init () {
  setupWebSocket();
}

function setupWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  // websocket.onclose = function(evt) { onClose(evt) };
  // websocket.onmessage = function(evt) { onMessage(evt) };
  // websocket.onerror = function(evt) { onError(evt) };
}

function onOpen (evt) {
  console.log("Connected to websocket!");
}

window.addEventListener("load", init, false);
