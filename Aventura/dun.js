const Discord = require("discord.js");
module.exports.run = async (client, message, args, database, prefix) => {
 let db = await client.db.get(`Economia/${message.author.id}`);
 let start = await client.db.get(`StartRPG/${message.author.id}`);
 
 if(start == null) {
   return message.reply(`<:erro:858615784771551252>| Você ainda não criou seu avatar, para criar um utilize \`${prefix}create-avatar\``)
 }





}
