const Discord = require("discord.js")
module.exports.run = async (client, message, args, database) => {
if (!message.member.permission.has(Permissions.FLAGS.ADMINISTRATOR)) { return message.reply('<:erro:858615784771551252>| Você não pode usar esse comando!') }

if(!args[0]) {
  message.reply(`Escreva uma mensagem após o Comando!`)
return;
}
const say = args.join(' ')
message.channel.send(argsresult)
}
  

  