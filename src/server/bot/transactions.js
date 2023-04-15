const MongoDbConnection = require('../../database/connection');
const axios = require('axios');
const botSendingMessage = require('../bot/botSendingMessage');
require('dotenv').config();

const transactionUrl = 'https://api.sleeper.app/v1/league/919431908273004544/transactions/1';

//This function calls sleeper api for transactions for our league and inserts them into a mongodb cloud db. It loops through each item in the returned json response
//and once it finds one already in the database it stops.
const fetchAllTransactions = async () => {
    await axios
        .get(transactionUrl)
        .then(({data}) => {
            for (let i = 0; i < Object.keys(data).length; i++) {
                //Insert Each Transaction here
                //For optimization we want to break out of the loop when we find the first record in the db. That means we are through the new transactions
                const breakOutOfLoop = insertTransactionToDb(data[i]);
                
                if (breakOutOfLoop === true) {
                    break;
                }
                //Loop through each transaction, build an updateOne() with mongodb using 'transaction_id' as the _id to query on
                //Add a break statement to break out early as the transactions are indexed and when it finds one already in the db
                //we know that it's caught up
            }
        });
};

const insertTransactionToDb = async (transaction) => {

    //Already in DB response
    // {
    //     acknowledged: true,
    //     modifiedCount: 0,
    //     upsertedId: null,
    //     upsertedCount: 0,
    //     matchedCount: 1 ***Check for this field returning 1 to stop the loop
    // }

    //Newly inserted response
    // {
    //     acknowledged: true,
    //     modifiedCount: 0,
    //     upsertedId: '452139567831576576',
    //     upsertedCount: 1, 
    //     matchedCount: 0
    // }

    //Transaction Example
    /*

    "type": "trade",
    "transaction_id": "940696403184058368",
    //Draft picks traded
    "draft_picks": [
    {
        "season": "2024",
        //Round number
        "round": 3,
        //Roster Id getting the pick
        "roster_id": 1,
        //Who is trading the pick
        "previous_owner_id": 10,
        //The actual owner of the original pick
        "owner_id": 1,
        "league_id": null
    }
    ],
    //players added and to which roster id
"   adds": {
        "8164": 10
    }
    */
    //console.log(transaction.transaction_id);
    // console.log(transaction);

    const db = await MongoDbConnection.getDb();
    const collectionName = 'Trades';
    const tradeCollection = await db.collection(collectionName);

    let query = {
        _id: `${transaction.transaction_id}`
    };

    let transactionToInsert = {
        $set: {
            _id: `${transaction.transaction_id}`,
            ...transaction
        }
    };

    try {
        const dbResponse = await tradeCollection.updateOne(
            query,
            transactionToInsert,
            {
                upsert: true
            }
        );

        if (dbResponse.upsertedCount === 1) {
            console.log('Record not found, sending message to trades channel!');
            botSendingMessage.sendTradeMessage('Trade', transaction);
            return true;
        } else if (dbResponse.matchedCount === 1) {
            console.log(`Transaction ${transaction.transaction_id} already in Database`);
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { fetchAllTransactions };