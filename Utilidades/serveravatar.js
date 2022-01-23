const Discord = require("discord.js");
module.exports.run = async (client, message, args, database) => {
let embed = new Discord.MessageEmbed()
.setDescription(`🖼️| **Avatar do servidor ${message.guild.name}, cliquei [aqui](${message.guild.iconURL()}) para baixar a imagem!**`)
.setImage(message.guild.iconURL({size: 1024}))
.setColor(`#0D02FA`)
message.reply({embeds: [embed]})
}
