const Discord = require("discord.js");
const config = require("./config.json");
const firebase = require("firebase");
const { join } = require("path");
const fs = require("fs");
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES']
});
client.tryes = new Discord.Collection();
client.lastCmds = new Discord.Collection();
client.aliases = new Discord.Collection();
client.commands = new Discord.Collection();
client.on("ready", () => {
let dir = __dirname
require("./Eventos/Ready.js")(client)
require("./LoadCommands.js")(client)

let dir = __dirname
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
}
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const FireSimple = require("./DatabaseUtil.js");
  client.db = new FireSimple({
    apiKey: "AIzaSyAgv6EICjfRgQJPTvsEJPjTPwYl_Rq2d5U",
    databaseURL: "https://royale-bot-7b344-default-rtdb.firebaseio.com"
  });

const cmds = fs.readdirSync(join(__dirname, "Economia")).filter(file =>
file.endsWith(".js"));
  for(let file of cmds) {
    let cmd = require(join(__dirname, "Economia", `${file}`));
    client.commands.set(`${file}`.replace(".js", ""), cmd);
    if(cmd.conf && cmd.conf.aliases) {
      cmd.conf.aliases.forEach(alias => {
        client.commands.set(alias, cmd);
      })
    }
  }
})

client.on("messageCreate", async message => {
require("./Handler.js")(client,message,config,database)
})

client.login("OTIyNzE4ODk3NzgwNzExNDY1.YcFi8A.PGPPDCoVnPO1zw0KWDP9qRh_e9Y");
