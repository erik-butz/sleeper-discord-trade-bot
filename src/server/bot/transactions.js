const MongoDbConnection = require('../../database/connection');
const axios = require('axios');
require('dotenv').config();


// const db = await MongoDbConnection.getDb();
// const collectionName = 'Trade';
// const tradeCollection = await db.collection(collectionName);

const transactionUrl = 'https://api.sleeper.app/v1/league/919431908273004544/transactions/1';

//This function calls sleeper api for transactions for our league and inserts them into a mongodb cloud db. It loops through each item in the returned json response
//and once it finds one already in the database it stops.
const fetchAllTransactions = async () => {
    await axios
        .get(transactionUrl)
        .then(({data}) => {
            for (let i = 0; i < Object.keys(data).length; i++) {
                //Insert Each Transaction here
                //console.log(data);
                //Loop through each transaction, build an updateOne() with mongodb using 'transaction_id' as the _id to query on
                //Add a break statement to break out early as the transactions are indexed and when it finds one already in the db
                //we know that it's caught up
            }
        });
};

const insertTransactionsToDb = async () => {
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

module.exports = {fetchAllTransactions};