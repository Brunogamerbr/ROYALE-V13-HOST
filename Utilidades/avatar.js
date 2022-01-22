const Discord = require("discord.js");
module.exports.run = async (client, message, args, database) => {
  let fulano = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let msg = new Discord.MessageEmbed() 
    .setTitle(`**🌇| Avatar**`)
    .setDescription(`**Avatar de ${fulano} Clique [aqui](${fulano.displayAvatarURL()}) Para baixar a imagem**`)
    .setColor(`#0D02FA`) 
    .setImage(fulano.avatarURL({ dynamic: true, format: "png", size: 1024 })) 
   message.reply({embeds: [msg]});
}

