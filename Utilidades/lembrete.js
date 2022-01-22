const Discord = require('discord.js');
const ms = require("ms")
module.exports.run = async (client, message, args, database) => {
  let time = args[0]
  
  if(!time) return message.reply("**Para definir um lembrete Use o comando dessa Forma: \`.lembrete [tempo] [mensagem de lembrete]\`**")
  
  let lembrete = args.slice(1).join(" ")
  
  if(!lembrete) return message.reply(`**Por favor. Defina um texto lembrete**`)
  
  const seliga = new Discord.MessageEmbed()
  .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
  .setTitle (`Lembrete agendado`)
  .setColor('#0D02FA') 
  .addField(`Irei lembrar você de:`, `\`${lembrete}\``, true)
  .addField("Daqui a", `\`${time}\``, true) 
  .setTimestamp(Date.now() + ms(time))
  .setFooter(`Lembrete será ocorrido `, client.user.displayAvatarURL())
  message.reply({embeds: [seliga]})
  setTimeout(() => {
  let cofoe = new Discord.MessageEmbed()
  .setTitle("Seu lembrete "  + message.author.username)
  .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
  .setDescription(`**${message.author} Seu lembrete ⏰\nLembrete: \`${lembrete}\`
**`)
.setFooter(`Lembrete Ocorido com sucesso`, client.user.displayAvatarURL())
.setColor(`#0D02FA`)
 message.channel.send({content: `${message.author}`, embeds: [cofoe]})
 }, ms(time))
    }

 