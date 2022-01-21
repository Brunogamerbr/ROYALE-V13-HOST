const Discord = require("discord.js")
const { MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow } = require("discord.js");
const ms = require("parse-ms");
module.exports.run = async (client, message, args, database, prefix) => {
  const timeout = (3600000)
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
       let button1 = new MessageButton();
        button1.setCustomId("PRIMARY1");
        button1.setEmoji('910846323463422003')
        button1.setStyle("PRIMARY");

        let button2 = new MessageButton();
        button2.setCustomId("PRIMARY2");
        button2.setEmoji('910849586858434600')
        button2.setStyle("PRIMARY");
      
        let button3 = new MessageButton();
        button3.setCustomId("PRIMARY3");
        button3.setEmoji('910848201672773642')
        button3.setStyle("PRIMARY");
        
        let button4 = new MessageButton();
        button4.setCustomId("PRIMARY4");
        button4.setEmoji('910843230273282058')
        button4.setStyle("PRIMARY");
       
        let button5 = new MessageButton();
        button5.setCustomId("PRIMARY5");
        button5.setEmoji('910846793749758012')
        button5.setStyle("PRIMARY");
        const row = new MessageActionRow().addComponents([button1, button2, button3, button4, button5]);

     

        


   let dbL = await database.ref(`Loja/${user1.id}`).once("value")
   let dbLref = database.ref(`Loja/${user1.id}`)
   let caiu = Math.floor(Math.random() * (500 - 100)) + 100;
   let embed = new Discord.MessageEmbed()

.setTitle(`**Loja de itens e Ferramentas**`)
.setDescription(`**${message.author} Seja bem vindo a minha loja! abaixo estará uma pequena lista de itens a venda.\n\n<:porte:910846323463422003>  Porte de Armas\nPreço: R$7000\n\n<:escl:910849586858434600> Escolta\nPreço: R$500\n\n<:pistola:910848201672773642> Pistola\nPreço: R$5000\n\n<:caixa:910843230273282058> MisteryBox\nPreço: R$300\n\n<:roll:910846793749758012> Roll\nPreço: R$500**`)
.setThumbnail(`https://cdn.glitch.com/b98b4389-f89f-445c-b6db-65281520d07b%2Ficons8-online-store-64.png?v=1591924550503`)
.setColor(`#0D02FA`)
let m = await message.channel.send({ embeds: [embed], components: [row] });
    
/*msg.react(`<:porte:910846323463422003>`);
msg.react("<:escl:910849586858434600>");
msg.react("<:pistola:910848201672773642>");
msg.react("<:caixa:910843230273282058>");
msg.react("<:roll:910846793749758012>");*/


const filter = i => i.customId === 'PRIMARY1' && i.user.id === message.author.id;
const collector = m.createMessageComponentCollector({ filter, time: 15000 });
collector.on('collect', async i => {
if (i.customId === 'PRIMARY1') {
if(db.val().dinheiro < 7000){
setTimeout(function() {m.delete()
message.delete()}, 100);
return message.channel.send({content:`<:erro:858615784771551252>**|** ${message.author} Você não tem dinheiro suficiente para comprar um **Porte de Armas**`})
}
message.channel.send(`Você comprou um **Porte de armas** no valor de **R$7000**!`);
dbref.update({dinheiro: db.val().dinheiro - 7000})
dbLref.update({porte: 1})	
m.delete()
message.delete()
}
});
collector.on('end', collected => {
  return;
})





const filter2 = i => i.customId === 'PRIMARY2' && i.user.id === message.author.id;
const collector2 = m.createMessageComponentCollector({ filter: filter2, time: 15000 });
collector2.on('collect', async i => {
if (i.customId === 'PRIMARY2') {
if(db.val().dinheiro < 500){
setTimeout(function() {m.delete()
message.delete()}, 100);
return message.channel.send(`<:erro:858615784771551252>| Você não possui dinheiro suficiente em sua carteira!`)
}
   
if(dbL.val().escolta_time != 0 && timeout - (Date.now() - dbL.val().escolta_time) > 0) {
  setTimeout(function() {m.delete()
  message.delete()}, 100);
   let time = ms(timeout - (Date.now() - dbL.val().escolta_time));
  return message.channel.send(`<:erro:858615784771551252>| Você ainda tem **${time.minutes}m ${time.seconds}** de **Escolta**, aguarde esse tempo acabar para comprar outra!`)
   }
setTimeout(function() {m.delete()
message.delete()}, 100);
}
message.channel.send(`Você comprou um **1 hora de Escolta** no valor de **R$500**!`);
dbref.update({dinheiro: db.val().dinheiro - 500})
dbLref.update({escolta_time: Date.now()})	
});
collector2.on('end', collected => {
  return;
})



const filter3 = i => i.customId === 'PRIMARY3' && i.user.id === message.author.id;
const collector = m.createMessageComponentCollector({ filter: filter3, time: 15000 });
collector3.on('collect', async i => {
if (i.customId === 'PRIMARY3') {
if(db.val().dinheiro < 5000){
setTimeout(function() { m.delete() message.delete() }, 100);
return message.channel.send({content:`<:erro:858615784771551252>**|** ${message.author} Você não tem dinheiro suficiente para comprar uma **Pistola**`})
}
setTimeout(function() { m.delete() message.delete() }, 100);
}
message.channel.send(`Você comprou uma **Pistola** no valor de **R$7000**!`);
dbref.update({dinheiro: db.val().dinheiro - 5000})
dbLref.update({pistola: 1})
}
});
collector3.on('end', collected => {
  return;
})



}