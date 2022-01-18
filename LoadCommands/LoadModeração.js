const Discord = require("discord.js")
const fs = require("fs")
const { join } = require("path")
module.exports = async (client) => {
let dir = __dirname

client.moderação = new Discord.Collection();
const FireSimple = require("../DatabaseUtil.js");
  client.db = new FireSimple({
    apiKey: "AIzaSyAgv6EICjfRgQJPTvsEJPjTPwYl_Rq2d5U",
    databaseURL: "https://royale-bot-7b344-default-rtdb.firebaseio.com"
  });
  
  const cmds = fs.readdirSync(join(__dirname, "../Moderação")).filter(file => file.endsWith(".js"));
  for(let file of cmds) {
    let mod = require(join(__dirname, "../Moderação", `${file}`));
    client.mod.set(`${file}`.replace(".js", ""), mod);
    if(mod.conf && mod.conf.aliases) {
      mod.conf.aliases.forEach(alias => {
        client.moderação.set(alias, mod);
      })
    }
  }
console.log("Moderação carregada com sucesso!");
}
