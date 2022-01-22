 
const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("pixapi").formatTimer;

module.exports.run = async function(client, message, args) {

  if(!config.owners.includes(message.author.id)) {
    message.inlineReply('**❌| Esse comando é so pro dono do bot!**');
    return;
  }

  let uptime = ms(client.uptime);

  let msg = `🟢 **| Estou online há** \` ${uptime.days ? uptime.days+'d ' : ''}${uptime.hours ? uptime.hours+'h ' : ''}${uptime.minutes ? uptime.minutes+'m ' : ''}${uptime.seconds ? uptime.seconds+'s' : ''} \`\n
📝**| Uso de Memória:**
> **Máximo atingido:** \` ${global.ramUsoMax}MB \`
> **Minimo atingido:** \` ${global.ramUsoMin}MB \`
> **Uso atual:** \` ${global.ramUso}MB \``

  
  let embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(msg)
    .setTimestamp()

  message.inlineReply(embed);
}


