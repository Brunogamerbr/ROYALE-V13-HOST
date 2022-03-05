const Discord = require("discord.js");
const { Permissions } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {

if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) { return message.reply('<:erro:858615784771551252>| Você não tem permissão para usar esse comando!') }

let canal = message.channel.id;
let block = await client.db.get(`Servidores_${message.guild.id}`);

if (block == null) {
message.reply(`Seu servidor foi adicionado em meu banco de dados, repita o comando!`)
await client.db.set(`Servidores_${message.guild.id}`, {canal1: 0})
return;
}

if (!block.canal1) {
await client.db.set(`Servidores_${message.guild.id}`, {canal1: canal})
message.channel.send(`☑️| Meus comandos foram proibidos nesse canal, somente pessoas com permissão de \`Gerenciar canais\` terão acesso!`);
return;
}

if (!block.canal2) {
client.db.set(`Servidores_${message.guild.id}`, {canal2: canal})
message.channel.send(`☑️| Meus comandos foram proibidos nesse canal, somente pessoas com permissão de \`Gerenciar canais\` terão acesso!`);
return;
}

if (!block.canal3) {
client.db.set(`Servidores_${message.guild.id}`, {canal3: canal})
message.channel.send(`☑️| Meus comandos foram proibidos nesse canal, somente pessoas com permissão de \`Gerenciar canais\` terão acesso!`);
return;
}

if (!block.canal4) {
client.db.set(`Servidores_${message.guild.id}`, {canal4: canal})
message.channel.send(`☑️| Meus comandos foram proibidos nesse canal, somente pessoas com permissão de \`Gerenciar canais\` terão acesso!`);
return;
}

if (!block.canal5) {
client.db.set(`Servidores_${message.guild.id}`, {canal5: canal})
message.channel.send(`☑️| Meus comandos foram proibidos nesse canal, somente pessoas com permissão de \`Gerenciar canais\` terão acesso!`);
return;
}
if (!block.canal6) {
message.channel.send(`☑️| Meus comandos foram proibidos nesse canal, somente pessoas com permissão de \`Gerenciar canais\` terão acesso!`);
return;
}
}
