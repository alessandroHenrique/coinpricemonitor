from channels import route

from dashboard import consumers


channel_routing = [
    route('websocket.connect', consumers.ws_connect),
    route('websocket.disconnect', consumers.ws_disconnect),
]
