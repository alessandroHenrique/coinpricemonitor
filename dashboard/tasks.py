import json

from bitcoinmonitor.celeryconfig import app
from channels import Group
from .helpers import get_coin_price


app.conf.beat_schedule = {
    'get-bitcoin-price-every-five-seconds': {
        'task': 'dashboard.tasks.get_bitcoin_price',
        'schedule': 5.0,
    },
    'get-litecoin-price-every-five-seconds': {
        'task': 'dashboard.tasks.get_litcoin_price',
        'schedule': 5.0,
    },
}


@app.task
def get_bitcoin_price():
    data = get_coin_price('BTC')

    Group('btc-price').send({'text': data})


@app.task
def get_litcoin_price():
    data = get_coin_price('LTC')

    Group('ltc-price').send({'text': data})
