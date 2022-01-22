const Discord = require("discord.js")
const fs = require("fs")
const { join } = require("path")
module.exports = async (client) => {
let dir = __dirname

client.utilidades = new Discord.Collection();
const FireSimple = require("../DatabaseUtil.js");
  client.db = new FireSimple({
    apiKey: "AIzaSyAgv6EICjfRgQJPTvsEJPjTPwYl_Rq2d5U",
    databaseURL: "https://royale-bot-7b344-default-rtdb.firebaseio.com"
  });
  
  const cmds = fs.readdirSync(join(__dirname, "../Utilidades")).filter(file => file.endsWith(".js"));
  for(let file of cmds) {
    let uti = require(join(__dirname, "../Utilidades", `${file}`));
    client.utilidades.set(`${file}`.replace(".js", ""), uti);
    if(uti.conf && uti.conf.aliases) {
      uti.conf.aliases.forEach(alias => {
        client.utilidades.set(alias, uti);
      })
    }
  }
console.log("Utilidades carregada com sucesso!");
}
