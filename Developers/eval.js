const Discord = require('discord.js')
const { inspect } = require('util')
const config = require("../config.json");
module.exports.run = async (client, message, args, database) => {
  
  /*if(!config.owners.includes(message.author.id)) {
    message.reply('**❌| Esse comando é so pro dono do bot!**')
    return;
  }*/


  let evaled;

  let embed = new Discord.MessageEmbed()
    .setColor(`#0D02FA`)
    .setThumbnail(`https://imgur.com/7dUYVcV.png`)
     .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp(Date.now())

  try {
    evaled = await eval(args.join(' '));
    embed.setDescription(`**📥| Entrada:** \`\`\`js\n${args.join(' ')}\`\`\`\n**📤| Saída:** \`\`\`js\n${inspect(evaled)}\`\`\``);
  } catch (error) {
    embed.setDescription(`**📥| Entrada:** \`\`\`js\n${args.join(' ')}\`\`\`\n**📤| Saída:** \`\`\`js\n${error}\`\`\``)
  }
    
message.channel.send({embeds: [embed]})
  
}
 
