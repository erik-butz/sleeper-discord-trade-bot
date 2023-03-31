const express = require('express');
const MongoDbConnection = require('./src/database/connection');
const BotConnection = require('./src/server/bot/utils/botConnection');
const setUpAobbUsers = require('./src/server/routes/setUpUsers');
const pollForTransactions = require('./src/server/bot/transactions');
const tradePolling = require('./src/server/bot/tradePolling');
const cors = require('cors');

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

//Set up Discord bot Connection
BotConnection.loginToBot();
tradePolling.sendTradeMessage();


//Connect to MongoDb
MongoDbConnection.connectToDb();
app.use('/setUpAobbUsers', setUpAobbUsers);

// allRosterUsers.fetchUserData();
app.listen(port, () => console.log(`Server Ready and Running on port ${port}`));

setInterval(() => {
    pollForTransactions.fetchAllTransactions();
},10000);