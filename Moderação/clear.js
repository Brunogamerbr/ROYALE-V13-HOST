const Discord = require("discord.js");
module.exports.run = async (client, message, args, database) => {
    let user = message.author;
    let quantia = args[0];
    if (!quantia){
  return message.reply(`<:erro:858615784771551252>| Você não colocou o número de mensagens para ser apagadas!`)}

if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`<:erro:858615784771551252>| Você não possui permissão para usar esse comando!`);

  let tanto = 100;
  if (quantia >tanto){
      return message.reply(`<:erro:858615784771551252>| Eu só consigo apagar de 0 a 100 mensagens..`)
}

 const msg = await message.channel.send(`<a:load:873563273973338114> Deletando mensagens!`)
  
  setTimeout(() => {
    
    setTimeout(() => {
    message.channel.bulkDelete(quantia);
    }, 1000)
msg.edit(`🗑️ **${quantia}** Mensagens foram apagadas!`)
  },4000)
  
 
   

 
  
}
exports.conf = {
  aliases: ["apagar", "deletar"]
}
   