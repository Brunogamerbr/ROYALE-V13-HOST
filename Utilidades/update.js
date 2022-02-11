const Discord = require("discord.js");
module.exports.run = async(client, message, args, database, prefix) => {
  let user = message.author;
  let dbS = await database.ref(`Sorte/${user.id}`).once("value");
  let dbSref = database.ref(`Sorte/${user.id}`);
  let db0 = await database.ref(`Versao/${user.id}`).once("value");
  let db0ref = database.ref(`Versao/${user.id}`);
  let db = await database.ref(`VersaoBuild`).once("value");
  let dbref = database.ref(`VersaoBuild`);

  if (db0.val().versão == db.val().build) return;
  const ayy = client.emojis.cache.find(emoji => emoji.name === "load");

  const msg = await message.reply(`${ayy} Fazendo dowload dos novos recursos..`)
 

setTimeout(() => {
msg.edit(`${ayy} Adicionando novos itens na sua conta aguarde..`);
}, 3000)

 setTimeout(() => {
db0ref.set({versão: db.val().build})
msg.edit(`Você recebeu a atualização: **${db.val().build}**\n<a:verifild:931074474038657024> A maioria dos bugs foram resolvidos!\n\n<a:setaFRS:928016217602654208> Categoria "Diversão" foi removida por não ser muito usada!\n<a:z_fixar:927995349254156338> Novos design em alguns comandos!!`)
}, 3000)

}
