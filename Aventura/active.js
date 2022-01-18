const Discord = require("discord.js");
module.exports.run = async (client, message, args, database) =>{

if (args[0] == 'on'){
return message.reply(`🟢| Modo atualização ativado!`);
await client.db.set(`ModoDev`, {active: 1})
}



if (args[0] == 'off'){
return message.reply(`🟢| Modo atualização desativado!`);
await client.db.set(`ModoDev`, {active: 0})
}
}