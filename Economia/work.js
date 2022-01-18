const Discord = require("discord.js");
const ms = require('parse-ms'); // 
exports.run = async (client, message, args, database, prefix) => {
  let user1 = message.author
  
  let dbs = await   
database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  
  let db1V = await   
database.ref(`Versao/${user1.id}`).once('value');
  let db1Vref = database.ref(`Versao/${user1.id}`);

  let db2B = await   
database.ref(`VersaoBuild`).once('value');
  let d2Bref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
}
  
  if (db1V.val().versão !== db2B.val().build) {
message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}
    let user = message.author
    let dbX = await database.ref(`Nivel/${user.id}`).once('value');
    let dbXref = database.ref(`Nivel/${user.id}`);{}
    let db = await database.ref(`Work/${user.id}`).once('value');
    let dbref = database.ref(`Work/${user.id}`);
    let db1 = await database.ref(`Economia/${user.id}`).once('value');
    let db1ref = database.ref(`Economia/${user.id}`);
    let db2 = await database.ref(`Empregos/${user.id}`).once('value');
    let db2ref = database.ref(`Empregos/${user.id}`);
  

  // Lista funções de um Programador irá fazer
   let programmer = ['BOT para Discord', 'Aplicativo para celular','Site profissional para seu Bot', 'Comando para seu Bot', 'Aplicativo para ver o Tempo', 'Site para sua Empresa'];
   
  // Lista funções de um miner
   let miner = ['Ouro', 'Diamante', 'Aluminio', 'Rubi', 'Safira', 'Esmeralda', 'Ametista', 'Topázio', 'Turqueza', 'Quartzo'];

   let timeout = (3.6e+6);
   let quantia = Math.floor(Math.random() * 1000) + 400;
 
   if(db.val().work != 0 && timeout - (Date.now() - db.val().work) > 0) {
    let time = ms(timeout - (Date.now() - db.val().work));
    message.reply(`**<:erro:858615784771551252>| Você ja trabalhou recentemente. Você podera trabalhar novamente em: ${time.minutes}m ${time.seconds}s**`)
  } else {

    if (db2.val().emprego == null || db2.val().emprego == 0) {
    return message.reply(`**Para poder trabalhar você deve possuir um emprego \`${prefix}empregos\`.**`)
}

    let tb = await database.ref(`Transacoes/${message.author.id}`).once("value")
    let tbref = database.ref(`Transacoes/${message.author.id}`)
    let t1 = tb.val() ? tb.val().t : [];
    t1.push({type: "work", work: db2.val().emprego == 1 ? "Programador" : "Minerador", action: 0, date: Date.now(), quantia: quantia});
    tbref.set({
      t: t1
    })


    if (db2.val().emprego == 1) {
      let embed = new Discord.MessageEmbed()      
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`Você programou um: **${programmer[Math.floor(Math.random() * programmer.length)]}**. na venda você recebeu: **R$${quantia}** + **60** de **XP**`)     .setThumbnail(`https://i.imgur.com/IzCaEQc.png`)
      .setFooter(`Programação realizada`)
      .setColor(`#0D02FA`)
      .setTimestamp()
       message.reply({embeds: [embed]})
      db1ref.update({ dinheiro: db1.val().dinheiro + quantia })
      dbref.update({ work: Date.now() })  
  dbXref.update({ xp: dbX.val().xp + 60 })
 } 
   
    if (db2.val().emprego == 2) {
    let embed2 = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`Você minerou um: **${miner[Math.floor(Math.random() * miner.length)]}**. você vendeu e faturou um lucro de **R$${quantia}** + **60** de **XP**`)
      .setThumbnail(`https://i.imgur.com/ux7cbLB.png`)
      .setFooter(`Mineraçao realizada`)
.setColor(`#0D02FA`)
      .setTimestamp()
      message.reply({embeds: [embed2]})
      
      dbXref.update({ xp: dbX.val().xp + 60 })
      db1ref.update({ dinheiro: db1.val().dinheiro + quantia })
      dbref.update({ work: Date.now() })
    }
  }
}
exports.conf = {
  aliases: ["trabalhar", "trabalho"]
}
