const Discord = require("discord.js");
exports.run = async(client, message, args, database) => {
if(!args[0]) return message.channel.send("Coloque o ID do servidor que você quer que eu saía!")

  
  client.guilds.cache.get(args[0]).leave()

message.channel.send(`**✅ pronto**`)
}