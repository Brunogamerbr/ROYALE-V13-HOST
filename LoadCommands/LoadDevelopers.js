const Discord = require("discord.js")
const fs = require("fs")
const { join } = require("path")
module.exports = async (client) => {
let dir = __dirname

client.developers = new Discord.Collection();
const FireSimple = require("../DatabaseUtil.js");
  client.db = new FireSimple({
    apiKey: "AIzaSyAgv6EICjfRgQJPTvsEJPjTPwYl_Rq2d5U",
    databaseURL: "https://royale-bot-7b344-default-rtdb.firebaseio.com"
  });
  
  const cmds = fs.readdirSync(join(__dirname, "../Developers")).filter(file => file.endsWith(".js"));
  for(let file of cmds) {
    let dev = require(join(__dirname, "../Developers", `${file}`));
    client.developers.set(`${file}`.replace(".js", ""), dev);
    if(dev.conf && dev.conf.aliases) {
      dev.conf.aliases.forEach(alias => {
        client.developers.set(alias, dev);
      })
    }
  }
console.log("Developers carregada com sucesso!");
}
