const Discord = require("discord.js")
const { MessageActionRow, MessageButton, MessageEmbed, MessageColletor } = require('discord.js');
module.exports.run = async(client, message, args,database, prefix) => {

  let user1 = message.author
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let db1 = await database.ref(`Versao/${user1.id}`).once('value');
  let db1ref = database.ref(`Versao/${user1.id}`);
  let db2 = await database.ref(`VersaoBuild`).once('value');
  let d2ref = database.ref(`VersaoBuild`);

  if(dbs.val() == null) {
  return message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)}

  
  if(db1.val().versão !== db2.val().build) {
  return message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)}


  let user = message.author;
  const db = await database.ref(`Economia/${user.id}`).once('value');
  let dbref = database.ref(`Economia/${user.id}`);
  let dbE = await database.ref(`Empregos/${user.id}`).once('value');
  let dbEref = database.ref(`Empregos/${user.id}`);


  if(dbE.val().emprego == 0) {
  return message.reply(`<:erro:858615784771551252>| Você não possui um emprego para demissão. Utilize \`${prefix}empregos\` Para obter um emprego!`)}


  if(db.val() == null || db.val().dinheiro < 3500) return message.reply('**Para pedir demissão você necessita de R$3500 na sua Carteira!**') 
  
  
  /*if (dbE.val().emprego == 1) {
  let pro = await message.channel.send({content: `Você realmente deseja largar a vida de programador? essa ação custará R$3500 de sua carteira!`, fetchReply: true});
  pro.react('☑️');
  let filter = (reaction, user) => {
	return reaction.emoji.name === '☑️' && user.id === message.author.id;
}
  let collector = pro.createReactionCollector({ filter, time: 15000 });
   collector.on('collect', (reaction, user) => {
   dbEref.update({emprego: 0})
	 dbref.update({dinheiro: db.val().dinheiro - 3500})
	 return message.reply(`☑️| Você pediu demissão do emprego de programador!`)
});
}*/

if(dbE.val().emprego == 2) {
   let mine = await message.channel.send({content: `Você realmente deseja largar a vida de Minerador? essa ação custará R$3500 de sua carteira!`, fetchReply: true});
    mine.react('☑️');

 const filter = (reaction, user) => {
	return reaction.emoji.name === '👍' && user.id === message.author.id;
};

const collector = mine.createReactionCollector({ filter, time: 15000 });

collector.on('collect', (reaction, user) => {
	 dbEref.update({emprego: 0})
	 dbref.update({dinheiro: db.val().dinheiro - 3500})
	 return message.reply(`☑️| Você pediu demissão do emprego de minerador!`)
})
}
   
}
exports.conf = {
  aliases: ["demissao"]
}