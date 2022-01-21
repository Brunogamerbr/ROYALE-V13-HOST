const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
module.exports.run = async(client, message, args, database, prefix) => {

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
return message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
}

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author 

  let dbu = await database.ref(`Start/${user.id}`).once('value');
  let dburef = database.ref(`Start/${user.id}`);
  
  if (dbu.val() == null) {
 return message.reply(`**O usuário(a) ${user} não está em meu banco de dados**`)}
  
  let db = await database.ref(`Economia/${user.id}`).once('value');
  let dbref = database.ref(`Economia/${user.id}`);
  let dbc = await database.ref(`Banco/${user.id}`).once('value');
  let dbcref = database.ref(`Banco/${user.id}`);

  if(db.val().dinheiro == null) db.val().dinheiro = 0;
  if(dbc.val().bank == null) db.val().bank = 0;
  
  let embed = new Discord.MessageEmbed()
    .setColor("#0D02FA")
    .setTitle("<:royalecoin:882701325438156801>**|** Balanço Monetário")
    .setDescription(`**Mostrando Informações da Carteira de **${user}**` +
      `\n\n<:royalecoin:882701325438156801> Carteira: R$ ${db.val().dinheiro}`+
      `\n💳 Banco: R$ ${dbc.val().bank}**`)
    .setFooter("Informações da sua carteira!")
    .setThumbnail('https://i.imgur.com/K33aRIu.png')
    .setTimestamp()
  message.reply({embeds: [embed]})
}
  
exports.conf = {
  aliases: ["coins", "bal", "money", "atm", "balance", "dinheiro"]
}