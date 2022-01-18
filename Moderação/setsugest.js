const Discord = require("discord.js")
exports.run = async (client, message, args, database, prefix) => {

if (!message.member.hasPermission(['MANAGE_CHANNELS'])) { return message.inlineReply('**<:erro:858615784771551252>| Você não tem permissão para usar esse comando!**') }

let user = message.author
let servi = message.guild.id

let canal = message.mentions.channels.first() 

let db = await database.ref(`Canais/${message.guild.id}`).once('value');
let dbref = database.ref(`Canais/${message.guild.id}`);

if (!canal) {
message.inlineReply(`<:erro:858615784771551252> Mencione algum canal do Servidor!`)
return;
}

if(db.val() == null) {
dbref.set({Canais: servi})
return message.inlineReply(`**Seu servidor foi colocado em meu banco de dados, Por Favor Repida o comando!**`)
}

if(db.val().canal == canal.id) {
message.inlineReply(`**Este canal já está ativo como canal de sugestões!**`)
return;
}

message.inlineReply(`**☑️| O canal ${canal} foi Setado para o canal de Sugestão! Para fazer uma Sugestão Use\n\`${prefix}sugest [Sua sugestão]\`**`)
await dbref.set({canal: canal.id })
}
