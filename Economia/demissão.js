const Discord = require("discord.js")
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args,database, prefix) => {

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
  let db = await database.ref(`Economia/${user.id}`).once('value');
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
     const pro = await message.reply(`**Você realmente deseja largar a vida de Programador? Saiba: Você pagará R$3500**`)
   await pro.react("👍")
   const filter = m => m.content.includes('sim');
const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

collector.on('collect', m => {
	pro.edit(`;-;`)
});

}
}
     
   /*message.reply('**☑️| Você pediu demissão com sucesso!**'); 
          dbEref.update({emprego: 0 }) 
          dbref.update({ dinheiro: db.val().dinheiro - 3500 })
        } else { 
         message.reply('**☑️| Cancelado com sucesso!**')
         
      
        }*/
  
  
  

exports.conf = {
  aliases: ["demissao"]
}