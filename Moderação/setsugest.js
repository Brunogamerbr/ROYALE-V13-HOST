const Discord = require("discord.js")
const { Permissions } = require('discord.js');
exports.run = async (client, message, args, database, prefix) => {

if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) { return message.reply('<:erro:858615784771551252>| Você não tem permissão para usar esse comando!') }

let user = message.author
let servi = message.guild.id
let canal = message.mentions.channels.first() 
let db = await database.ref(`Canais/${message.guild.id}`).once('value');
let dbref = database.ref(`Canais/${message.guild.id}`);

if (!canal) {
message.reply(`<:erro:858615784771551252> Mencione algum canal depois do comando!`)
return;
}

if(db.val() == null) {
dbref.set({Canais: servi})
return message.reply(`Seu servidor foi colocado em meu banco de dados, Por Favor Repida o comando!`)
}

if(db.val().canal == canal.id) {
message.reply(`<:erro:858615784771551252>| Este canal já está ativo como canal de sugestões!`)
return;
}

message.reply(`☑️| O canal ${canal} foi setado para o canal de sugestões! Para fazer uma sugestão use\n\`${prefix}sugest [Sua sugestão]\``)
await dbref.set({canal: canal.id })
}
