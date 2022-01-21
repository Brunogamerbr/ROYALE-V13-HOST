const Discord = require("discord.js")
module.exports.run = async (client, message, args, database, prefix) => {
  
  let user1 = message.author
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let db1V = await database.ref(`Versao/${user1.id}`).once('value');
  let db1Vref = database.ref(`Versao/${user1.id}`);
  let db2B = await database.ref(`VersaoBuild`).once('value');
  let d2Bref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
  message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
  return;}

  if (db1V.val().versão !== db2B.val().build) {
  message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`) 
  return;}

  let db = await database.ref(`Economia/${user1.id}`).once('value');
  let dbref = database.ref(`Economia/${user1.id}`);
  let dbl = await database.ref(`Loja/${user1.id}`).once('value');
  let dblref = database.ref(`Loja/${user1.id}`);
  
  if (!dbl.val() || !dbl.val().roll) {
    message.reply(`**<:erro:858615784771551252>|** Você não possuí nenhum **Ticket roll** disponível! Para poder rolar o dado compre um **Ticket roll** na loja. \`.loja\``) 
    return;}

  if (!parseInt(args[0]) || parseInt(args[0]) < 1 || parseInt(args[0]) > 10) {
  message.reply(`**<:erro:858615784771551252>| Digite um número de 1 a 10 após o comando!**`);return;} 

  
  let xp = Math.floor(Math.random() * 60) + 30;
  let quantia = Math.floor(Math.random() * 500) + 500;
  let roll = Math.floor(Math.random() * 9) + 1;

  if (parseInt(args[0]) == roll) {
  let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`Vocé apostou no número **${parseInt(args[0])}**, e caiu **${roll}** e você ganhou uma quantia de **R$${quantia}** + **${xp}** de **XP**` ) 
      .setFooter(`Roll bem sucedido`)
      .setColor("#0D02FA")                    
      .setThumbnail(`https://i.imgur.com/gEB7bBZ.png`)
      .setTimestamp()              
    message.reply({embeds: [embed]})
    dbref.update({dinheiro: db.val().dinheiro + quantia})
    dblref.update({roll: dbl.val().roll - 1})
  } else {    
    message.reply(`Você apostou no **${parseInt(args[0])}** mas caiu **${roll}**, **Você perdeu!**`);
   dblref.update({roll: dbl.val().roll - 1})
  }
}