const { MongoClient } = require('mongodb');
require('dotenv').config();
let db;

const mongoDbEnvHelper = () => {
    console.log(process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {
        case 'local':
        case 'development':
            console.log('Local/Dev Mongodb Env');
            return 'mongodb://localhost:27017';
        case 'production':
            console.log('Prod Mongodb Env');
            return `mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPw}@${process.env.MongoDbCollection}`;
        default:
            console.log('Default Mongodb Env');
            return 'mongodb://localhost:27017';
    }
};

const connectToDb = async () => {
    const url = mongoDbEnvHelper();
    const client = new MongoClient(url);
    try {
        await client.connect().then(() => {
            console.log('Successfully connected to MongoDB database');
            db = client.db('SleeperTradeBot');
        }).catch((err) => {
            console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
};

const getDb = async () => {
    return db;
};

module.exports = { connectToDb, getDb };