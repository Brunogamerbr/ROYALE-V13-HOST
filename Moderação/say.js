const Discord = require("discord.js")

exports.run = async (client, message, args, database) => {


  
  
  if (!message.member.hasPermission(['ADMINISTRATOR'])) { return message.inlineReply('<:erro:858615784771551252>| Você não pode usar esse comando!') }

if(!args[0]) {
  message.reply(`Escreva uma mensagem após o Comando!`)
return;
}
      argsresult = args.join(' ')
      message.channel.send(argsresult)
    }
  

  