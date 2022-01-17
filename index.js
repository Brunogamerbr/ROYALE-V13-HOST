const Discord = require("discord.js");
const config = require("./config.json");
const firebase = require("firebase")
const fs = require("fs");
const client = new Discord.Client({intents: config.intents})
client.tryes = new Discord.Collection();
client.lastCmds = new Discord.Collection();
client.aliases = new Discord.Collection();

client.on("ready", () => {
require("./Eventos/Ready.js")(client)
require("./LoadCommands.js")(client)
require("./firebase.js")(client, firebase)
const DatabaseUtil = require("./DatabaseUtil.js");
client.db = new DatabaseUtil({
  serverKey: "832judw.21ud.jiq1456f"
});
})

client.on("messageCreate", async message => {
require("./Handler.js")(client,config,message)
})

client.login("OTIyNzE4ODk3NzgwNzExNDY1.YcFi8A.PGPPDCoVnPO1zw0KWDP9qRh_e9Y");
