const Discord = require("discord.js");

exports.run = async (client, message, args, database) => {


  
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `<:emoji_48:900277387189714974> ${days.toFixed()} dias\n<:emoji_46:900276424634671154> ${hours.toFixed()} horas\n<:emoji_45:900275981879762944> ${minutes.toFixed()} minutos\n<:emoji_48:900276645661933578> ${seconds.toFixed()} segundos`;

  const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setThumbnail("https://i.imgur.com/WQmCfZU.gif")
    .setColor("#0D02FA")
    .setDescription(`Tempo online:\n**${uptime}**`)
  .setFooter("Mostrando o meu tempo de atividade")
  .setTimestamp()

  message.inlineReply(embed);
};