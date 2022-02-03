const Discord = require("discord.js");
const { Permissions } = require('discord.js');
module.exports = async (client, message, database, config) => {

  let dbPref = await database.ref(`Servidores/${message.guild.id}`).once('value');
  let prefix = dbPref.val() ? dbPref.val().prefix ? dbPref.val().prefix : config.prefix.toLowerCase() : config.prefix.toLowerCase();

  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let eco = args.shift();
  let comando = client.economia.get(eco);
  if(!comando) return;
  
try {
comando.run(client, message, args, database, prefix);
} catch (err) {console.log(err)}
}
