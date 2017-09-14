import json

from channels import Group
from channels.auth import channel_session_user


@channel_session_user
def ws_connect(message):
    Group('btc-price').add(message.reply_channel)

    message.channel_session['coin-group'] = 'btc-price'

    message.reply_channel.send({
        'accept': True
    })


@channel_session_user
def ws_receive(message):
    data = json.loads(message.content.get('text'))

    if data.get('coin') == 'litecoin':
        Group('ltc-price').add(message.reply_channel)
        Group('btc-price').discard(message.reply_channel)

        message.channel_session['coin-group'] = 'ltc-price'

    elif data.get('coin') == 'bitcoin':
        Group('btc-price').add(message.reply_channel)
        Group('ltc-price').discard(message.reply_channel)

        message.channel_session['coin-group'] = 'btc-price'


@channel_session_user
def ws_disconnect(message):
    user_group = message.channel_session['coin-group']

    Group(user_group).discard(message.reply_channel)
