const { MongoClient } = require('mongodb');
require('dotenv').config();
let db;

const mongoDbEnvHelper = () => {
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
            return `mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPw}@${process.env.MongoDbCollection}`;
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
        await listDatabases(client);

    } catch (err) {
        console.log(err);
    }

    async function listDatabases(client) {
        let databasesList = await client.db().admin().listDatabases();

        console.log('Databases:');
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    }
};

const getDb = async () => {
    return db;
};

module.exports = { connectToDb, getDb };