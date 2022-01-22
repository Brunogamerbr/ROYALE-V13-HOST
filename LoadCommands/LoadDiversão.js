const Discord = require("discord.js")
const fs = require("fs")
const { join } = require("path")
module.exports = async (client) => {
let dir = __dirname

client.diversão = new Discord.Collection();
const FireSimple = require("../DatabaseUtil.js");
  client.db = new FireSimple({
    apiKey: "AIzaSyAgv6EICjfRgQJPTvsEJPjTPwYl_Rq2d5U",
    databaseURL: "https://royale-bot-7b344-default-rtdb.firebaseio.com"
  });
  
  const cmds = fs.readdirSync(join(__dirname, "../Diversão")).filter(file => file.endsWith(".js"));
  for(let file of cmds) {
    let div = require(join(__dirname, "../Diversão", `${file}`));
    client.diversão.set(`${file}`.replace(".js", ""), div);
    if(div.conf && div.conf.aliases) {
      div.conf.aliases.forEach(alias => {
        client.diversão.set(alias, div);
      })
    }
  }
console.log("Diversão carregada com sucesso!");
}
