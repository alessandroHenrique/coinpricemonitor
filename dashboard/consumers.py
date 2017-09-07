from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http


@channel_session_user_from_http
def ws_connect(message):

    Group('btc-price').add(message.reply_channel)

    message.reply_channel.send({
        'accept': True
    })
