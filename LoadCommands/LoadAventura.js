const Discord = require("discord.js")
const fs = require("fs")
const { join } = require("path")
module.exports = async (client) => {
let dir = __dirname
client.commands = new Discord.Collection();
  
const FireSimple = require("../DatabaseUtil.js");
  client.db = new FireSimple({
    apiKey: "AIzaSyAgv6EICjfRgQJPTvsEJPjTPwYl_Rq2d5U",
    databaseURL: "https://royale-bot-7b344-default-rtdb.firebaseio.com"
  });

  const cmds = fs.readdirSync(join(__dirname, "../Aventura")).filter(file => file.endsWith(".js"));
  for(let file of cmds) {
    let ave = require(join(__dirname, "../Aventura", `${file}`));
    client.commands.set(`${file}`.replace(".js", ""), ave);
    if(ave.conf && ave.conf.aliases) {
      ave.conf.aliases.forEach(alias => {
        client.commands.set(alias, ave);
      })
    }
  }
console.log("Aventura carregada com sucesso!");











}
