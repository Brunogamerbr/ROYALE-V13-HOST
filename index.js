const Discord = require("discord.js")
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES']
});
const firebase = require("firebase");
const config = require(`./config.json`);
const fs = require("fs");
const { join } = require("path");
const reqEvent = event => require(`./Events/${event}.js`);
client.commands = new Discord.Collection();

let dir = __dirname

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

client.on("ready", () => {
const FireSimple = require("./DatabaseUtil.js");
  client.db = new FireSimple({
    apiKey: "AIzaSyAgv6EICjfRgQJPTvsEJPjTPwYl_Rq2d5U",
    databaseURL: "https://royale-bot-7b344-default-rtdb.firebaseio.com"
  });



  const cmds = fs.readdirSync(join(__dirname, "Economia")).filter(file => file.endsWith(".js"));
  for(let file of cmds) {
    let cmd = require(join(__dirname, "Economia", `${file}`));
    client.commands.set(`${file}`.replace(".js", ""), cmd);
    if(cmd.conf && cmd.conf.aliases) {
      cmd.conf.aliases.forEach(alias => {
        client.commands.set(alias, cmd);
      })
    }
  }
console.log("Economia carregada com sucesso!")
});


client.on("messageCreate", async (message) => {
require("./Handler.js")(client,message,database)
});

client.login("ODQ0MjI3ODk1ODE5ODk0Nzk0.YKPWfw.fFiPSooxWFVkZTQw7_yYgF6U0EE");