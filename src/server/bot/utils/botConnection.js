const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
require('dotenv').config();

// Create a new client instance
const client = new Client(
    { 
        intents: 
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
        ]
    }
);

const loginToBot = () => {
    // When the client is ready, run this code (only once)
    // We use 'c' for the event parameter to keep it separate from the already defined 'client'
    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    // Log in to Discord with your client's token
    client.login(token);
};

module.exports = { loginToBot, client };