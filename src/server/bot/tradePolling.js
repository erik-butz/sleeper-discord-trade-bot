const {client} = require('./utils/botConnection');

const channelId = '1091167686660194354';

const sendTradeMessage = () => {

    console.log(client);
    client.on('message', client => {
        const channel = client.channels.cache.get(channelId);
        channel.send('Hello There');
    });
};

module.exports = { sendTradeMessage };