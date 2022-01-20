const Discord = require("discord.js")
const { MessageActionRow, MessageButton, MessageEmbed, MessageColletor } = require('discord.js');

module.exports.run = async function(client, message, args,database, prefix) {

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


  let user = message.author
  const db = await database.ref(`Economia/${user.id}`).once('value');
  let dbref = database.ref(`Economia/${user.id}`);
  let dbE = await database.ref(`Empregos/${user.id}`).once('value');
  let dbEref = database.ref(`Empregos/${user.id}`);


  if(dbE.val().emprego == 0) {
  return message.reply(`**Você não possui um emprego para demissão. Utilize \`${prefix}empregos\` Para obter um emprego!**`)}


  if(db.val() == null || db.val().dinheiro < 3500) return message.reply('**Para pedir demissão você necessita de R$3500 na sua Carteira!**') 
  const button = new MessageButton()
	.setLabel('demissao')
	.setStyle('PRIMARY')
	.setDisabled(true);
  
  if (dbE.val().emprego == 1) {
  let pro = message.reply(`Você realmente deseja largar a vida de programador? essa ação custará R$3500 de sua carteira!`)
   pro.react("👍")
	
	message.reply(`☑️| Você pediu demissão do emprego de programador!`)
   dbEref.update({emprego: 0})
	 dbref.update{dinheiro: db.val().dinheiro - 3500})
}

 if(dbE.val().emprego == 2) {
   let mine = message.reply(`Você realmente deseja largar a vida de Minerador? essa ação custará R$3500 de sua carteira!`)
   mine.react("👍")

	message.reply(`☑️| Você pediu demissão do emprego de minerador!`)
	 dbEref.update({emprego: 0})
	 dbref.update{dinheiro: db.val().dinheiro - 3500})
 }
}
     
exports.conf = {
  aliases: ["demissao"]
}