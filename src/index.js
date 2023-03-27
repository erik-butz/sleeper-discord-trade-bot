const express = require('express');
const MongoDbConnection = require('./database/connection');
const BotConnection = require('./server/bot/utils/botConnection');
const allRosterUsers = require('./server/bot/utils/SleeperRosterInformation');
const cors = require('cors');


//Set up Discord bot Connection
BotConnection.loginToBot();

//Connect to MongoDb
MongoDbConnection.connectToDb();
// let db = await MongoDbConnection.getDb();
// console.log(await db.collection('AOBB.Trade'));

// allRosterUsers.fetchUserData();