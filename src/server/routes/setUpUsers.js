const { Router } = require('express');
const router = Router();
const axios = require('axios');
const MongoDbConnection = require('../../database/connection');
require('dotenv').config();

router.get('/', (_req, res) => {
    console.log('Inside Setup AOBB Users Endpoint');
    fetchUserData(res);
});

const fetchUserData = async (res) => {
    const users = new Map();
    let user ={};
    //Get User_Id & Display_Name from 1 endpoint and add to a users map
    await axios
        .get('https://api.sleeper.app/v1/league/919431908273004544/users')
        .then(({ data }) => {
            for (let i = 0; i < Object.keys(data).length; i++) {
                user = {
                    owner_id: data[i].user_id,
                    display_name: data[i].display_name,
                    roster_id: ''
                };
                users.set(data[i].user_id, user);
            }
        });
    //Using the user_id get the roster_id needed in trades endpoint and update user in the users map
    await axios
        .get('https://api.sleeper.app/v1/league/919431908273004544/rosters')
        .then(({data})=> {
            for (let j = 0; j < Object.keys(data).length; j++) {
                const ownerIdToFetch = data[j].owner_id;
                const userToUpdate = users.get(ownerIdToFetch);
                userToUpdate.roster_id = data[j].roster_id;
                users.set(ownerIdToFetch, userToUpdate);
                insertUserIntoMongoDbDatabase(userToUpdate);
            }
            console.log(users);
        });

    return res.status(200).json({message: 'Successfully setup AOBB users'});
};

const insertUserIntoMongoDbDatabase = async (user) => {
    const db = await MongoDbConnection.getDb();
    const collectionName = 'LeagueUsers';
    const leagueUsers = await db.collection(collectionName);

    let query = {
        _id: `${user.owner_id}`
    };

    let dbUser = {
        $set: {
            _id: `${user.owner_id}`,
            owner_id:  `${user.owner_id}`,
            display_name: `${user.display_name}`,
            roster_id: user.roster_id
        }
    };

    try {
        console.log(await leagueUsers.updateOne(
            query,
            dbUser,
            {
                upsert: true
            }
        ));
    } catch (err) {
        console.log(err);
    }
};

module.exports = router;