const Discord = require("discord.js");
module.exports.run = async (client, message, args, database) => {

  let user1 = message.author
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let db1 = await database.ref(`Versao/${user1.id}`).once('value');
  let db1ref = database.ref(`Versao/${user1.id}`);
  let db2 = await database.ref(`VersaoBuild`).once('value');
  let d2ref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
 return message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)}

  
if (db1.val().versão !== db2.val().build) {
return message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)}


let db = database.ref(`Casamento/${message.author.id}`).once("value");
let dbref = database.ref(`Casamento/${message.author.id}`);
let dbu = database.ref(`Casamento/${user.id}`).once("value");
let dburef = database.ref(`${user.id}`)	


if (db.val().marry == 0) {
return message.reply(`<:erro:858615784771551252>| Você não está casado ainda!`)}

message.reply(`Você pediu divórcio com sucesso!`)
}