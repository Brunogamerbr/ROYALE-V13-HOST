const Discord = require('discord.js');
const { Permissions } = require('discord.js');
module.exports.run = async (client, message, args, database) => {

if(!message.member.permissions(Permissions.FLAGS.BAN_MEMBERS)) return message.reply(`<:erro:858615784771551252>| ${message.author} Você precisa da permissão **BANIR MEMBROS** para utilizar este comando!`);

var doggo = message.guild.members.cache.get(client.user.id);

if(!doggo.permissions.has(Permissions.FLAGS.BAN_MEMBERS)){
 return message.reply(`<:erro:858615784771551252>| Eu não tenho a permissão \`Banir membros\` nesse servidor!`)
}

let usu = args[0];
if (!usu) return message.reply(`**<:erro:858615784771551252> | ${message.author} Utilize o ID de alguém para desbanir!**`);
message.guild.members.unban(usu);
message.channel.send(`☑️| ${message.author}, o usuário foi desbanido com sucesso!`)
 }
