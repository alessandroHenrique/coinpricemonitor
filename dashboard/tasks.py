import json
import requests

from bitcoinmonitor.celeryconfig import app
from channels import Group


app.conf.beat_schedule = {
    'add-every-30-seconds': {
        'task': 'dashboard.tasks.get_bitcoin_price',
        'schedule': 6.0,
        'args': ("dale",)
    },
}


@app.task
def get_bitcoin_price(arg):
    last_price = requests.get("https://bittrex.com/api/v1.1/public/getticker?market=USDT-BTC").json().get("result").get("Last")
    Group('btc-price').send({'text': json.dumps({
        'last_price': last_price
    })})
