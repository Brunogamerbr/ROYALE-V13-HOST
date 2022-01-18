const Discord = require("discord.js");
const { Permissions } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {
  
let dbPref = database.ref(`Servidores/${message.guild.id}`);
let dbP = await database.ref(`Servidores/${message.guild.id}`).once('value');
if (dbP.val() == null) {
dbref.set({ prefix: config.prefix})}

let dbref = database.ref(`Vips/${message.guild.id}`);
if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
return message.reply('<:erro:858615784771551252>| Você não pode usar esse comando!')}

let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
if(!role) return message.reply(`<:erro:858615784771551252>| Você precisa mencionar ou usar o id de um cargo invalido!`);

dbref.set({cargoId: role.id})

message.reply(`☑️| Cargo setado com sucesso! Use \`${prefix}addvip [@mencão]\` para adicionar o VIP Em algum membro!`)
}
