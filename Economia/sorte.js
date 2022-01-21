const pixapi = require("pixapi");
const Discord = require("discord.js");
module.module.exports.run = async(client, message, args, database, prefix) => {
  
}
  let user1 = message.author
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let tb = await database.ref(`Transacoes/${message.author.id}`).once("value")
  let tbref = database.ref(`Transacoes/${message.author.id}`)
  let db1V = await database.ref(`Versao/${user1.id}`).once('value');
  let db1Vref = database.ref(`Versao/${user1.id}`);
  let db2B = await database.ref(`VersaoBuild`).once('value');
  let d2Bref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
   message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
}

if (db1V.val().versão !== db2B.val().build) {
message.inlineReply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}



  let db = await database.ref(`Sorte/${message.author.id}`).once('value');
  let dbref = database.ref(`Sorte/${message.author.id}`);
  let db2 = await database.ref(`Economia/${message.author.id}`).once('value');
  let db2ref = database.ref(`Economia/${message.author.id}`);
  let dbN = await database.ref(`Nivel/${message.author.id}`).once('value');
  let dbNref = database.ref(`Nivel/${message.author.id}`);
  let timeout = (8.64e+7);

  if(db.val() && db.val().delay - (Date.now() - timeout) > 0) {
    let ms = pixapi.formatTimer(db.val().delay - (Date.now() - timeout))
    return message.inlineReply(`**<:erro:858615784771551252>| Você ja testou sua Sorte! Aguarde ${ms.hours}h ${ms.minutes}m ${ms.seconds}s para tentar novamente**`)
  }

  let percent = Math.random() < 0.5; // 50% de chance de vir verdadeiro ou falso;

  let rand = Math.floor(Math.random() * (2230 - 1000))+1000;
  let rand2 = Math.floor(Math.random() * (1200 - 800))+800;
  let randXP = Math.floor(Math.random() * (80 - 60))+60;
  let t1 = tb.val() ? tb.val().t : [];
  
  if(percent) {
    t1.push({type: "lucky", action: 0, date: Date.now(), quantia: rand});

    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`Minha rede de **Especialistas Sobrenaturais** disseram que hoje você está com muita **Sorte**. Você ganhou: **R$${rand}** + **${randXP}** de **XP**`)
    .setFooter(`Hoje foi seu dia de sorte!`)
    .setThumbnail(`https://i.imgur.com/D9eiJhq.png`)
    .setColor(`#0D02FA`)
    message.reply({embeds: [embed]})

    db2ref.update({
      dinheiro: db2.val().dinheiro + rand
    })

    dbNref.update({
      xp: dbN.val().xp + randXP
    })
  } else {
    t1.push({type: "lucky", action: 1, date: Date.now(), quantia: rand2});
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`Minha rede de **Especialistas Sobrenaturais** disseram que você está com muito **Azar**. Você perdeu: **R$${rand2}**`)
    .setFooter(`Hoje você não está com muita sorte...`)
    .setThumbnail(`https://i.imgur.com/6lQfRTE.png`)
    .setColor(`#0D02FA`)
    message.reply({embeds: [embed]})

    db2ref.update({
      dinheiro: db2.val().dinheiro - rand2
    })
  }

  tbref.set({
    t: t1
  })
  dbref.set({
    delay: Date.now()
  })

}

