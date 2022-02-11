const Discord = require("discord.js");
module.exports.run = async(client, message, args, database, prefix) => {
  try{
  
  let db = await client.db.get(`Versao/${message.author.id}`);
  let dbb = await client.db.get(`VersaoBuild`)
  
  if (db.versão == dbb.build) return;
  const ayy = client.emojis.cache.find(emoji => emoji.name === "load");

  const msg = await message.reply(`${ayy} Fazendo dowload dos novos recursos..`)

msg.edit(`Você recebeu a atualização: **${db.val().build}**\n<a:verifild:931074474038657024> A maioria dos bugs foram resolvidos!\n\n<a:setaFRS:928016217602654208> Categoria "Diversão" foi removida por não ser muito usada!\n<a:z_fixar:927995349254156338> Novos design em alguns comandos!!`)
client.db.set(`Versao/${message.author.id}`, {versão: dbb.build})
}catch(err){
  message.reply(`${err}`)
}
}
