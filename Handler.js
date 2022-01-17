const Discord = require("discord.js")
const config = require("./config.json")
module.exports = async(client, message, database) => {
  
if (message.author.bot) return;
if (message.channel.type == 'dm') return;

let prefix = await client.db.get(`Servidores/${message.author.id}/prefix`)
if (!prefix) prefix = config.prefix;

if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
const EcoFile = require(`../commands/${command}.js`)

  
try {
    EcoFile.run(client, message, args, database, prefix);
  } catch(err) {
    console.log(err);
  }
}