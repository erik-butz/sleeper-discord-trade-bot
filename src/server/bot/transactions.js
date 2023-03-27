const MongoDbConnection = require('../src/database/connection');
const allRosterUsers = require('./utils/SleeperRosterInformation');

const insertTransactionsToDb = async () => {
    const users = await allRosterUsers.getUsers();
    //const collectionName = getCollectionName();
    //const db = await MongoDbConnection.getDb();
};

//Helper function to return one of the 3 collections in the mongodb database
const getCollectionName = (transactionType) =>{
    switch (transactionType) {    
    case 'trade':
        return 'Trade';
    case 'waiver':
        return 'Waiver';
    case 'free_agent':
        return 'Free_agent';
    default:
        break;
    }
};