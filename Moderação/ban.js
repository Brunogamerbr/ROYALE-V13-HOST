const Discord = require("discord.js");
const { Permissions } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {
 try{
if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply(`<:erro:858615784771551252>| ${message.author} Você precisa da permissão BANIR MEMBROS para utilizar este comando!`);
var doggo = message.guild.members.cache.get(client.user.id);
if(!doggo.permissions.has(Permissions.FLAGS.BAN_MEMBERS)){
 return message.reply(`<:erro:858615784771551252>| Eu não tenho a permissão \`Banir membros\` nesse servidor!`)
}

let usu = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let reason = args.slice(1).join(" ");
if (!reason) reason = "Não definido";

if (!args[0]) return message.reply(`<:erro:858615784771551252>| ${message.author} Mencione alguém ou utilize o ID de alguém para banir!`);

 if(!usu) return message.reply(`<:erro:858615784771551252>| ${message.author} Você não mencionou e nem utilizou um ID válido!`);

if(!usu.bannable) return message.inlineReply(`<:erro:858615784771551252>| ${message.author} Ops! Eu não tenho permissão para banir este membro!`);

 let dm = new Discord.MessageEmbed()
 .setTitle(`**<:Legal:870733089083625502>|Banimento!**`)
 .setDescription(`**<:correto:858615705398018078> ${usu.user} foi banido com sucesso
Motivo: \`${reason}\`
banido Por: ${message.author.tag}**`)
 .setColor("#0D02FA")
 .setThumbnail("https://i.imgur.com/P0PyiAj.png")
 .setTimestamp()
 .setFooter(`Banimento realizado com sucesso`)

let embed = new Discord.MessageEmbed()
.setTitle(`<:Legal:870733089083625502>| Banido!`)
.setDescription(`**${usu}, você foi banido do servidor: \`${message.guild.name}\`\nBanido por: \`${message.author.tag}\`\nMotivo: \`${reason}\`**`)
.setColor(`#0D02FA`)
.setThumbnail(`https://i.imgur.com/P0PyiAj.png`)
.setFooter(`Banimento`)
.setTimestamp()          
 await usu.ban({
 reason: reason
 }) 
message.channel.send({embeds: [dm]})
 
} catch(err){
  console.log(err)
}
}