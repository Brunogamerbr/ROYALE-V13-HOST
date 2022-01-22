const Discord = require("discord.js")
module.exports.run = async (client, message, args, database, prefix) => {

let servi = message.guild.id
let db = await database.ref(`Canais/${message.guild.id}`).once('value')
let dbref = database.ref(`Canais/${message.guild.id}`);
  
 if(db.val() == null) {
message.reply(`Esse servidor não possuí um canal de sugestões configurado!`)
return;
}
let embed = new Discord.Message.Embed()
.setTitle(`❕Nova sugestão`)
.setDescription(`**Sugestão do membro:** ${message.author.tag}\nConteudo da sugestão: \`${args.join(" ")}\``)
.setColor(`BLUE`)
.setThumbnail(`https://i.imgur.com/k7T4U2C.png`)
.setFooter(`Faça sua sugestão usando ${prefix}sugest!`)
let canal = message.guild.channels.cache.get(`${db.val().canal}`)
message.reply(`Sua sugestão foi enviada para <#${db.val().canal}> com sucesso!`)
canal.send({embeds: [embed]})
}
        
