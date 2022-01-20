const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {
    
let db = await client.db.get(`InventarioRPG_${message.author.id}`);
if (db == null) {
return message.reply(`<:erro:858615784771551252>| Parece que você ainda não criou seu avatar, utilize \`${prefix}create-avatar\``)
}	
    if (db.maçã == null) db.maçã = 0;
    if (db.sopa == null) db.sopa = 0;
    if (db.madeira == null) db.madeira = 0;
    if (db.gogumelo == null) db.gogumelo = 0;
    if (db.poção_de_cura == null) db.poção_de_cura = 0;
    if (db.poção_de_xp == null) db.poção_de_xp = 0;
    if (db.katana == null) db.katana = 0;
    if (db.machado == null) db.machado = 0;
    if (db.lootbox == null) db.lootbox = 0;
    if (db.bussola == null) db.bussola = 0;
  
let embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`**${message.author} aqui está a mochila com todos os itens que você conseguiu em sua jornada histórica!\n\n ------[CONSUMÍVEIS]------\n🍎 Maçãs: \`${db.maçã}\`\n🥘 Sopas: \`${db.sopa}\`\n🍄 Gogumelos: \`${db.gogumelo}\`\n<:xxp:918402912928010292> Poção de xp: \`${db.poção_de_xp}\`\n<:poocura:918402681645723660> Poção de cura: \`${db.poção_de_cura}\`\n\n------[EQUIPAMENTOS]-------\n🗡️ Katana: \`${db.katana}\`\n🪓 Machado: \`${db.machado}\`\n<:bussola:925691597323116554> Bússola: \`${db.bussola}\`\n\n------[RECURSOS]------\n<:madera:918422650198564917> Madeira: \`${db.madeira}\`\n\n------[LOOTBOX]-----\n<:bau:925656155055865887> Lootbox: \`${db.lootbox}\`**`)
.setColor(`#1380E2`)
.setFooter(`Monstrando o inventário de ${message.author.username}`)
.setTimestamp()
message.reply({embeds: [embed]})
}