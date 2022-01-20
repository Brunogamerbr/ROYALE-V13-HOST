const Discord = require("discord.js");
const ms = require("parse-ms");

module.exports.run = async (client, message, args, database, prefix) => {


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


  
  let db = await database.ref(`Economia/${user.id}`).once('value');
  let dbref = database.ref(`Economia/${user.id}`);
  
  let tb = await database.ref(`Transacoes/${message.author.id}`).once("value")
  let tbref = database.ref(`Transacoes/${message.author.id}`)

if (dbs.val() == null) {
  message.inlineReply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
}

if (db1.val().versão !== db2.val().build) {
message.inlineReply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}
let timeout = 86400000;
if(db.val().daily !== null && timeout - (Date.now() - db.val().daily) > 0) {
    let time = ms(timeout - (Date.now() - db.val().daily));
    message.inlineReply(`**<:erro:858615784771551252>|** Você já recebeu sua recompensa diária! Colete novamente daqui a\n**${time.hours} horas ${time.minutes} minutos ${time.seconds} segundos**`)
  } else {

  let embed = new Discord.MessageEmbed()
    .setDescription(`${user} Colete o seu bônus diário clicando **[aqui](https://royale-bot.tk)**!`)
    .setColor(`#0D02FA`)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter("Você pode pegar seu bônus diário todos os dias!")
    .setThumbnail(`https://i.imgur.com/NmcmpMk.png`);
  message.inlineReply(embed);
}
/*
  let user1 = message.author

  let dbX = await database.ref(`Nivel/${user1.id}`).once('value');
  
  let dbXref = database.ref(`Nivel/${user1.id}`);

  let timeout = 86400000;

  let amount = Math.floor(Math.random() * 5000) + 1000;
    
  if(db.val().daily !== null && timeout - (Date.now() - db.val().daily) > 0) {
    let time = ms(timeout - (Date.now() - db.val().daily));
    message.inlineReply(`**<:erro:858615784771551252>|** Você já recebeu sua recompensa diária! Colete novamente daqui a\n**${time.hours} horas ${time.minutes} minutos ${time.seconds} segundos**`)
  } else {

    dbXref.update({ xp: dbX.val().xp + 60 })

    let t1 = tb.val() ? tb.val().t : [];
    t1.push({type: "daily", action: 0, date: Date.now(), quantia: amount});
    tbref.set({
      t: t1
    })
    
    dbref.update({dinheiro: db.val().dinheiro + amount, daily: Date.now()})
    let moneyEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    
    .setDescription(`Você Recebeu sua recompensa diária! Dinheiro Recebido: **R$${amount}** + **60** de **XP**`)
      
    .setFooter(`Volte amanhã para receber sua recompensa novamente.`)
      .setThumbnail(`https://i.imgur.com/NmcmpMk.png`)
      .setColor(`#0D02FA`)
    
    message.inlineReply(moneyEmbed);
    }*/
}