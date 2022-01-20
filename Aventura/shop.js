const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {
let db = await client.db.get(`StartRPG_${message.author.id}`);
let db1 = await client.db.get(`InventarioRPG_${message.author.id}`);
let db2 = await client.db.get(`Economia_${message.author.id}`);

if (db == null) {
return message.reply(`**<:erro:858615784771551252>| Você aínda não está registrado em meu mundo RPG! Crie seu avatar utilizando \`${prefix}create-avatar\``)
}

let embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setDescription(`**Olá ${message.author}, parece que você está precisando de ítens né? bom... aqui na minha lojinha você vai encontrar:\n\n======[COMIDAS]======\n🍄 Gogumelo == \`R$5000\`\n🥘 Sopa == \`R$5000\`\n\n======[POÇÕES]======\n<:xxp:918402912928010292> Poção-xp == \`R$30000\`\n<:poocura:918402681645723660> Poção-cura == \`R$10000\`\n\n======[EQUIPAMENTOS]======\n🗡️ Katana == \`R$10000\`\n🪓 Machado == \`$10000\`\n<:bussola:925691597323116554> Bússola == \`R$5000\`\n\n====[LOOTBOX]====\n<:bau:925656155055865887> Lootbox == \`R$1000\`**`)
.setFooter(`Para comprar utilize .buy (nome do item) em minúsculo!`)
.setColor(`#1380E2`)
message.reply({ embeds: [embed] })
}