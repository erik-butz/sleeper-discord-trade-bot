const { Router } = require('express');
const router = Router();
const botSendingMessage = require('../bot/botSendingMessage');
require('dotenv').config();

router.get('/', (_req, res) => {
    botSendingMessage.sendTradeMessage('Trade',
        'Mavelas: Pick 1.01'
        + '\n'
        + 'Fourshadows: Pick 1.02, 1.03, 1.04'
    );
    res.sendStatus(200);
});


module.exports = router;