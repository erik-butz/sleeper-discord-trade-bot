const express = require('express');
const MongoDbConnection = require('./src/database/connection');
const BotConnection = require('./src/server/bot/utils/botConnection');
const setUpAobbUsers = require('./src/server/routes/setUpUsers');
const cors = require('cors');

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

const main = async () => {
    //Set up Discord bot Connection
    BotConnection.loginToBot();

    //Connect to MongoDb
    await MongoDbConnection.connectToDb();
    let db = await MongoDbConnection.getDb();

    console.log(await db.collection('LeagueUsers'));
    await app.use('/setUpAobbUsers', setUpAobbUsers);

    // allRosterUsers.fetchUserData();
    await app.listen(port, () => console.log(`Server Ready and Running on port ${port}`));
};

main();
