const Discord = require("discord.js")
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, database) => {
  let db = await client.db.get(`VersaoBuild`)
  let usuarios = client.users.cache.size
  let dono = client.users.cache.get(`782434262636822588`).tag
  let servidores = client.guilds.cache.size
  let economia = await database.ref(`Economia`).once('value');
  let embed = new Discord.MessageEmbed()
  .setTitle(`**Informações Sobre o Bot**`)
  .setDescription(`Olá ${message.author} aqui você vê algumas informações sobre mim, Espero ter ajudado.\n\n🏡| Servidores: **${servidores}**\n👤| Usuarios: **${usuarios}**\n<:firebase1:897353859259842580>| Firebase: **${economia.numChildren()}**\n\nEu fui desenvolvido em: <:nodejs:873563240599257149> **[Discord.js](https://discord.js.org/#/)**\nEu estou Hospedado na: <:discloud:931394628161261658> **[Discloud](https://discloudbot.com)**\nFui criado pelo Usuário: **\`${dono}\`**.\nDia: **\`8 de maio de 2021, as 12:00\`**

Crédito aos que Ajudam em meu Desenvolvimento:\n\n**Dev:** **\`${client.users.cache.get(`880292567202291743`).tag}\`**\n**Dev:** **\`${client.users.cache.get(`841392424617377815`).tag}\`**`)
.setFooter(`Minhas informações`)    
.setThumbnail(`https://i.imgur.com/UdWqIF9.png`)
.setColor(`#0D02FA`)
.setTimestamp()

let button = new MessageButton();
        button.setCustomId("PRIMARY");
        button.setLabel('Setup')
        button.setEmoji('934930387736621117')
        button.setStyle("PRIMARY");
        const row = new MessageActionRow().addComponents([button])
let msg = await message.reply({embeds: [embed], components: [row]})


const filter = i => i.customId === 'PRIMARY' && i.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 15000 });
collector.on('collect', async i => {
if (i.customId === 'PRIMARY') {
  setTimeout(function() {
    msg.delete()
  }, 200);
}
message.channel.send(`**<:noticia:931074620013031424>| Versão do bot**: ${db.build}\n**<:nodejs:873563240599257149>| Versão do NodeJs: **${process.env.NODE_VERSION}\n**<:js:897358846459256843>| Versão do Discord.js:** 13.6.0\n**<:memoryram:934940031502680075>| Memória RAM alocada: 512MB**\n**<:memoryram:934940031502680075>| Memória RAM usada:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/512MB`)
});
collector.on('end', collected => {
  return;
})




}
exports.conf = {
  aliases: ["infobot", "info"]
}