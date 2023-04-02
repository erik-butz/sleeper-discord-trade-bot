const { client } = require('./utils/botConnection');

//Trades Channel
const channelId = '1091387889348259860';

const sendTradeMessage = (tradeType, message) => {
    console.log('inside sendTradeMessage');
    const channel = client.channels.cache.get(channelId);
    channel.send('New ' + tradeType + ' Alert!!!!');
    channel.send(message);
};

module.exports = { sendTradeMessage };