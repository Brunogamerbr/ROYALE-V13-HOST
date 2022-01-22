const Discord = require("discord.js")
const { Permissions } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {
 
var doggo = message.guild.members.cache.get(client.user.id);
let servi = message.guild.id
let db = await database.ref(`Canais/${message.guild.id}`).once('value')
let dbref = database.ref(`Canais/${message.guild.id}`);

if(!doggo.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)){
  return message.reply(`Eu estou sem permissão de \`Gerenciar canais\``)
}

 if(db.val() == null) {
message.reply(`Esse servidor não possuí um canal de sugestões configurado!`)
return;
}
let embed = new Discord.MessageEmbed()
.setTitle(`❕Nova sugestão`)
.setDescription(`**Sugestão do membro:** ${message.author.tag}\n**Conteudo da sugestão:** \`\`\`${args.join(" ")}\`\`\``)
.setColor(`BLUE`)
.setThumbnail(`https://i.imgur.com/k7T4U2C.png`)
.setFooter(`Faça sua sugestão usando ${prefix}sugest!`)
let canal = message.guild.channels.cache.get(`${db.val().canal}`)
message.reply(`Sua sugestão foi enviada para <#${db.val().canal}> com sucesso!`)
canal.send({embeds: [embed]})
}
        
