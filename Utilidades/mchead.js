const Discord = require("discord.js");


exports.run = async function(client, message, args, database) {
  if(!args.length) return message.inlineReply(`:x: **| Por favor, insira o nick de algum jogador de minecraft!**`);
  let embed = new Discord.MessageEmbed()
    .setDescription(`Cabeça de ${args[0]}`)
    .setImage(`https://mc-heads.net/head/${args[0]}`)
    .setColor("#0D02FA")
  message.inlineReply(embed)
}

