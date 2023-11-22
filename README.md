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
Discord Bot polling/waiting for change in DB (Not needed anymore, going with new route to just post calls for any transactions not in the DB)
    https://www.mongodb.com/docs/drivers/node/current/usage-examples/changeStream/


### Notes
https://discord.com/api/oauth2/authorize?client_id=844035419091501096&permissions=0&scope=bot%20applications.commands
Fantasty Calc Player Values
https://api.fantasycalc.com/values/current?isDynasty=true&numQbs=2&numTeams=12&ppr=.5

Node Canvas for generating the trade image to post to discord
https://github.com/Automattic/node-canvas

#### Data that is needed from transaction calls

```"type": "trade",
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
"adds": {
    "8164": 10
}```