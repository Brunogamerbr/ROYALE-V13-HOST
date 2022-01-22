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

  const msg = await message.inlineReply(`${ayy} Fazendo dowload dos novos recursos..`)
 setTimeout(() => {
}, 3000)

setTimeout(() => {
msg.edit(`${ayy} Adicionando novos itens na sua conta aguarde..`);
}, 3000)
 setTimeout(() => {


db0ref.set({versão: db.val().build})
msg.edit(`Você recebeu a atualização: **${db.val().build}**\n<a:verifild:931074474038657024> A maioria dos bugs foram resolvidos!\n\n**<:noticia:931074620013031424> Novo comando:** \`\`block\`\`\n\n**<:info:931074572898410527> Função:** Bloqueia os comandos do bot no canal em que foi usado o comando!\n\n**<:adicionado:931074522734559282> Servidor suporte:** Usuários que entrarem no servidor de Suporte através dessa mensagem ganhará R$20k money no bot, use \`.invite\` Para entrar!`)
}, 3000)

}
