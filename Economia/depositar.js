const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {

  let user1 = message.author
  let db = await database.ref(`Banco/${user1.id}`).once('value');
  let dbref = database.ref(`Banco/${user1.id}`);
  let dbE = await database.ref(`Economia/${user1.id}`).once('value');
  let dbEref = database.ref(`Economia/${user1.id}`)
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let db1 = await database.ref(`Versao/${user1.id}`).once('value');
  let db1ref = database.ref(`Versao/${user1.id}`);
  let db2 = await database.ref(`VersaoBuild`).once('value');
  let d2ref = database.ref(`VersaoBuild`);

  if(dbs.val() == null) {
  return message.reply(`Antes de começar usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos Economia`)}
  
  if(db1.val().versão !== db2.val().build) {
  return message.reply(`Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\``)}

   
  if(!args[0]) {
  return message.reply(`**<:erro:858615784771551252> | Coloque o valor do depósito, ou use \` all \` para depoistar tudo!**`)}

  let money = (args[0].toLowerCase() == "all") ? dbE.val().dinheiro : parseInt(args[0]);

  if(dbE.val().dinheiro < 1) {
  return message.reply(`**<:erro:858615784771551252> | Você não tem dinheiro em sua carteira para fazer um deposito!**`)}

  if(!money || money < 0) {
  return message.inlineReply(`<:erro:858615784771551252> **| Insira uma quantia válida para depositar!**`)}
  
  if(dbE.val().dinheiro < 1 || money > dbE.val().dinheiro) {
  return message.inlineReply(`**<:erro:858615784771551252> | Você não possui toda essa quantia em sua carteira!**`)}

  let embed9 = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
   .setDescription(`Você depositou um valor de **R$${cacheAbb(money)}** Em sua conta **Bancária** Agora seu dinheiro está em **Segurança**.`)
  .setFooter(`Deposito realizado`)
  .setThumbnail(`https://i.imgur.com/2xiAhFf.png`)
  .setColor(`0D02FA`)
  .setTimestamp()
       
  dbref.update({bank: db.val().bank + money})
  dbEref.update({dinheiro: dbE.val().dinheiro - money})
  message.reply({embeds: [embed]});
}
exports.conf = {
  aliases: ["dep"]
}

function cacheAbb(number = 0, confs = { precision: null, suffs: null}) {
	if (!number) {
		throw new TypeError('Erro! Você não colocou o número a ser convertido');
    return null
	}
    const suffsFromZeros = confs.suffs || { 0:'', 3:'k', 6:'kk', 9:'b', 12:'t', 15: 'q' }
    const { length } = number.toString()
    const lengthThird = length%3
    const divDigits = length-(lengthThird || lengthThird+3)
    const calc = ''+(number/(10**divDigits)).toFixed(confs.precision || 2)
  
    return number < 1000 ? ''+number : (calc.indexOf('.') === calc.length-3 ? calc.replace(/\.00/, '') : calc)+suffsFromZeros[divDigits]
}
