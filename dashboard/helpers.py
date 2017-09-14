import json
import requests


def get_coin_price(coin_name):
    url = "https://bittrex.com/api/v1.1/public/getticker?market=USDT-{}".format(coin_name)
    data = requests.get(url).json()
    last_price = data.get("result").get("Last")

    data = json.dumps({
        coin_name: last_price
    })

    return data
