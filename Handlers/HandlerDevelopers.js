const Discord = require("discord.js");
const config = require("../config.json");
module.exports = async (client, message, database, config) => {

  let dbPref = await database.ref(`Servidores/${message.guild.id}`).once('value');
	
  let prefix = dbPref.val() ? dbPref.val().prefix ? dbPref.val().prefix : config.prefix.toLowerCase() : config.prefix.toLowerCase();

  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let dev = args.shift();
  let comando = client.developers.get(dev);
  if(!comando) return;
	if(!config.owners.includes(message.author.id)) return;
  
try {
comando.run(client, message, args, database, prefix);
} catch (err) {console.log(err)}
}
