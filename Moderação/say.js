const Discord = require("discord.js")
const { Permissions } = require('discord.js');
module.exports.run = async (client, message, args, database) => {
if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) { return message.reply('<:erro:858615784771551252>| Você não pode usar esse comando!') }

if(!args[0]) {
message.reply(`Escreva uma mensagem após o Comando!`)
return;
}
const say = args.join(' ')
message.channel.send(say)
}
  

  