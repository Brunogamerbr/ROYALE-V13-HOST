const Discord = require("discord.js")
module.exports.run = async (client, message, args, database) => {

  let user = message.author
  let db = await database.ref(`Start/${user.id}`).once('value');
  let dbref = database.ref(`Start/${user.id}`);
  let db1 = await database.ref(`VersaoBuild`).once('value');
  let db1ref = database.ref(`VersaoBuild`);
  let db2 = await database.ref(`Economia/${user.id}`).once('value');
  let db2ref = database.ref(`Economia/${user.id}`);
  let db3 = await database.ref(`Banco/${user.id}`).once('value');
  let db3ref = database.ref(`Banco/${user.id}`);
  let dbL = await database.ref(`Loja/${user.id}`).once('value');
  let dbLref = database.ref(`Loja/${user.id}`);
  let db4 = await database.ref(`Empregos/${user.id}`).once('value');
  let db4ref = database.ref(`Empregos/${user.id}`);
  let db6 = await database.ref(`Work/${user.id}`).once('value');
  let db6ref = database.ref(`Work/${user.id}`);
  let db5 = await database.ref(`Versao/${user.id}`).once('value');
  let db5ref = database.ref(`Versao/${user.id}`);

if(db.val() == null) {
  const ayy = client.emojis.cache.find(emoji => emoji.name === "load");
  const msg = await message.reply(`${ayy} Trazendo suas informações aguarde..`)
setTimeout(() => {
  msg.edit(`${ayy} Adicionando usuario na Economia..`)
}, 1000)
  setTimeout(() => {
  dbLref.set({escolta: 0})
  dbLref.set({porte: 0})
  dbLref.set({roll: 0})
  dbLref.set({pistola: 0})  
  db2ref.set({dinheiro: 0})
  db3ref.set({bank: 0})
  db4ref.set({emprego: 0})
  db5ref.set({versão: db1.val().build})
  dbref.set({start: 0})
  db6ref.set({work: 0})
  client.db.set(`InventarioRPG/${message.author.id}`, {buss: 0});
  client.db.set(`InventarioRPG/${message.author.id}`, {kat: 0});
  client.db.set(`InventarioRPG/${message.author.id}`, {mach: 0});
  msg.edit(`☑️| Sucesso, agora minha Economia estará disponível para você!`)
}, 15000)
} 
else {
return;
}
}