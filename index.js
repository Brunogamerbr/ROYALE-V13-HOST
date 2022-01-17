const Discord = require("discord.js");
const config = require("./config.json");
const firebase = require("firebase")
const fs = require("fs");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "MANAGE_SERVER", "MANAGE_ROLES", "MANAGE_CHANNELS", "BAN_MEMBERS", "KICK_MEMBERS", "CREATE_INSTANT_INVITE_", "MODERATE_MEMBERS", "SEND_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "ADD_REACTIONS"]})

client.tryes = new Discord.Collection();
client.lastCmds = new Discord.Collection();
client.aliases = new Discord.Collection();

client.on("ready", () => {
require("./Eventos/Ready.js")(client)
require("./LoadCommands.js")(client)
const DatabaseUtil = require("./DatabaseUtil.js");
client.db = new DatabaseUtil({
  serverKey: "832judw.21ud.jiq1456f"
});
const firebaseConfig = {
  apiKey: "AIzaSyAgv6EICjfRgQJPTvsEJPjTPwYl_Rq2d5U",
  authDomain: "royale-bot-7b344.firebaseapp.com",
  databaseURL: "https://royale-bot-7b344-default-rtdb.firebaseio.com",
  projectId: "royale-bot-7b344",
  storageBucket: "royale-bot-7b344.appspot.com",
  messagingSenderId: "948007874893",
  appId: "1:948007874893:web:ac0626c78346936721c704",
  measurementId: "G-LT7353D3BV"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
})

client.on("messageCreate", async (message) => {
require("./Handler.js")(client,config,message)
})

client.login("OTIyNzE4ODk3NzgwNzExNDY1.YcFi8A.PGPPDCoVnPO1zw0KWDP9qRh_e9Y");
