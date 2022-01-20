const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
const ms = require("parse-ms");
exports.run = async (client, message, args, database, prefix) => {

  let user = message.author
  let dbs = await   
database.ref(`Start/${user.id}`).once('value');
  let dbsref = database.ref(`Start/${user.id}`);

  let db1 = await   
database.ref(`Versao/${user.id}`).once('value');
  let db1ref = database.ref(`Versao/${user.id}`);

  let db2 = await   
database.ref(`VersaoBuild`).once('value');
  let d2ref = database.ref(`VersaoBuild`);

  let tb = await database.ref(`Transacoes/${message.author.id}`).once("value")
  let tbref = database.ref(`Transacoes/${message.author.id}`)

  let t1 = tb.val() ? tb.val().t : [];
    

  if (dbs.val() == null) {
  message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
}
  
  if (db1.val().versão !== db2.val().build) {
message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}

  
  let user1 = message.author
  let dbX = await database.ref(`Nivel/${user1.id}`).once('value');
  let dbXref = database.ref(`Nivel/${user1.id}`);
  let timeout = 3630000;
  let amount = Math.floor(Math.random() * 2000) + 100;
  let amount2 = Math.floor(Math.random() * 3000) + 100;
  
  
  let roubo = ["Roubou um Restaurante", "Explodiu um Banco", "Matou um Idoso", "Hackeou o Discord", "Preso", "Preso", "Preso", "Preso"]
  let caiu = roubo[Math.floor(Math.random() * roubo.length)]
  let db = await database.ref(`Economia/${user.id}`).once('value');
  let dbref = database.ref(`Economia/${user.id}`); 
  

  if(db.val().crimetime !== null && timeout - (Date.now() - db.val().crimetime) > 0) {
  let time = ms(timeout - (Date.now() - db.val().crimetime));
  return message.reply(`**<:erro:858615784771551252>| Espere ${time.hours}h ${time.minutes}m ${time.seconds}s Para realizar um Crime novamente!**`);}

  let embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`A polícia descobriu seus planos Maliciosos, Você foi **${caiu}**. e perdeu uma quantia de **R$${amount2}**. Tente novamente mais Tarde.`)
.setThumbnail(`https://i.imgur.com/zSO6sKz.png`)
.setFooter(`Crime mal sucedido`)
.setTimestamp()
.setColor(`#0D02FA`)

if(caiu == 'Preso') { message.reply({embeds: [embed]})
t1.push({type: "crime", action: 1, date: Date.now(), quantia: amount2});
    tbref.set({
      t: t1
    })
dbref.update({ dinheiro: db.val().dinheiro - amount2 })
dbref.update({crimetime: Date.now()})return}

t1.push({type: "crime", action: 0, date: Date.now(), quantia: amount});
    tbref.set({
      t: t1
    })

  let embed2 = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`Você **${caiu}**. E como Recompensa por Crime bem sucedido você ganhou **R$${amount}** + **60** de **XP**`)
.setThumbnail(`https://i.imgur.com/pQvqQ54.png`)
.setFooter(`Crime bem sucedido`)
.setTimestamp()
.setColor(`#0D02FA`)
message.channel.send({embeds: [embed2]})

dbXref.update({ xp: dbX.val().xp + 60 })
dbref.update({dinheiro: db.val().dinheiro + amount, crimetime: Date.now()})

}

exports.conf = {
  aliases: ["crimé"]
}