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

### Standings
    Winners - https://api.sleeper.app/v1/league/<league_id>/winners_bracket
    Losers - https://api.sleeper.app/v1/league/<league_id>/losers_bracket
    AOBB 2023 - 919431908273004544
    AOBB 2022 - 784526741342461952
    AOBB 2021 - 688639493300912128

    2022 Winners Bracked
        [{
            "t2": 3,
            "t1": 1,
            "w": 3,
            "l": 1,
            "r": 1,
            "m": 1
        },
        {
            "t2": 11,
            "t1": 6,
            "w": 6,
            "l": 11,
            "r": 1,
            "m": 2
        },
        {
            "t2": 6,
            "t1": 9,
            "w": 9,
            "l": 6,
            "r": 2,
            "m": 3
        },
        {
            "t2": 3,
            "t1": 4,
            "w": 4,
            "l": 3,
            "r": 2,
            "m": 4
        },
        {
            "t2": 1,
            "t1": 11,
            "w": 1,
            "l": 11,
            "r": 2,
            "m": 5,
            "p": 5
        },
        {
            "t1_from": {
            "w": 3
            },
            "t2_from": {
            "w": 4
            },
            "t2": 4,
            "t1": 9,
            "w": 4,
            "l": 9,
            "r": 3,
            "m": 6,
            "p": 1
        },
        {
            "t1_from": {
            "l": 3
            },
            "t2_from": {
            "l": 4
            },
            "t2": 3,
            "t1": 6,
            "w": 3,
            "l": 6,
            "r": 3,
            "m": 7,
            "p": 3
        }]


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