# sleeper-discord-trade-bot
Discord Trade Bot created for the All Out Blitz Brigade Fantasy Football League

### Flow
- Api call to sleeper transations
    https://docs.sleeper.com/#get-transactions
Insert transactions into mongodb
    New Collection for Transactions
        New Table for
            Trades
            Waivers
            Free Agent Pickup
Discord Bot polling/waiting for change in DB
    https://www.mongodb.com/docs/drivers/node/current/usage-examples/changeStream/


### Notes
https://discord.com/api/oauth2/authorize?client_id=844035419091501096&permissions=0&scope=bot%20applications.commands
Fantasty Calc Player Values
https://api.fantasycalc.com/values/current?isDynasty=true&numQbs=2&numTeams=12&ppr=.5