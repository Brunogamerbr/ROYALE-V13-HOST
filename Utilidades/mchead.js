const Discord = require("discord.js");
module.exports.run = async function(client, message, args, database) {
  if(!args.length) return message.reply(`:x: **| Por favor, insira o nick de algum jogador de minecraft!**`);
  let embed = new Discord.MessageEmbed()
    .setDescription(`Cabeça de ${args[0]}`)
    .setImage(`https://mc-heads.net/head/${args[0]}`)
    .setColor("#0D02FA")
  message.reply({embeds: [embed]})
}

