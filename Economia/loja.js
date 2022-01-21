const Discord = require("discord.js")
const { MessageEmbed, MessageButton } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {

  let user1 = message.author;
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let db1 = await database.ref(`Versao/${user1.id}`).once('value');
  let db1ref = database.ref(`Versao/${user1.id}`);
  let db2 = await database.ref(`VersaoBuild`).once('value');
  let d2ref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
  message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
  return;
    }
  let db = await database.ref(`Economia/${user1.id}`).once("value")
  let dbref = database.ref(`Economia/${user1.id}`)

  if (db1.val().versão !== db2.val().build) {
  message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}
const button = new MessageButton()
  .setCustomId("PRIMARY");
	.setLabel('Yes')
	.setStyle('PRIMARY')
	.setEmoji('910846323463422003');

const row = new MessageActionRow()
.addComponents([button]);


   let dbL = await database.ref(`Loja/${user1.id}`).once("value")
   let dbLref = database.ref(`Loja/${user1.id}`)
   let caiu = Math.floor(Math.random() * (500 - 100)) + 100;
   let embed = new Discord.MessageEmbed()

.setTitle(`**Loja de itens e Ferramentas**`)
.setDescription(`**${message.author} Seja bem vindo a minha loja! abaixo estará uma pequena lista de itens a venda.\n\n<:porte:910846323463422003>  Porte de Armas\nPreço: R$7000\n\n<:escl:910849586858434600> Escolta\nPreço: R$500\n\n<:pistola:910848201672773642> Pistola\nPreço: R$5000\n\n<:caixa:910843230273282058> MisteryBox\nPreço: R$300\n\n<:roll:910846793749758012> Roll\nPreço: R$500**`)
.setThumbnail(`https://cdn.glitch.com/b98b4389-f89f-445c-b6db-65281520d07b%2Ficons8-online-store-64.png?v=1591924550503`)
.setColor(`#0D02FA`)
let msg = await message.reply({embeds: [embed], components: [button]}) 

/*msg.react(`<:porte:910846323463422003>`);
msg.react("<:escl:910849586858434600>");
msg.react("<:pistola:910848201672773642>");
msg.react("<:caixa:910843230273282058>");
msg.react("<:roll:910846793749758012>");*/


const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
collector.on('collect', i => {
	if (i.user.id === interaction.user.id) {
if(db.val().dinheiro < 7000) return message.reply(`<:erro:858615784771551252>**|** Você não tem dinheiro suficiente para comprar um **Porte de Armas`);
message.reply(`Você comprou um porte de armas!`);
dbref.update({dinheiro: db.val().dinheiro - 7000})
dbLref.update({porte: 1})
} else {
return;
}
})
}