const Discord = require("discord.js");
const { Permissions } = require('discord.js');
module.exports = async (client, message, database, config) => {

  let dbPref = await database.ref(`Servidores/${message.guild.id}`).once('value');
  let prefix = dbPref.val() ? dbPref.val().prefix ? dbPref.val().prefix : config.prefix.toLowerCase() : config.prefix.toLowerCase();

  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let eco = args.shift();
  let comando = client.economia.get(eco);
  if(!comando) return;
	
  let embed1 = new Discord.MessageEmbed()
.setDescription(`**Novo Comando Utilizado Por:** \`${message.author.tag} | ${message.author.id}\`\n\n**Comando Utilizado:** \`${prefix}${eco}\`\n**Depois do Comando:** \`${args.length ? args.join(' ') : " "}\`\n\n**Servidor:** \`${message.guild.name} | ${message.guild.id}\`\n**Canal:** \`${message.channel.name} | ${message.channel.id}\`\n**ID da Mensagem:** \`${message.id}\`\n\n**Informações do servidor:**\n>  Usuários: \`${message.guild.members.cache.filter(u => !u.user.bot).size} Membros\` e \`${message.guild.members.cache.filter(u => u.user.bot).size} Bots\`\n>  Canais: \`${message.guild.channels.cache.size}\`\n>  Cargos: \`${message.guild.roles.cache.size}\``)
    .setColor(`#0D02FA`)
    .setTimestamp()
  .setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic: true}))
  let channel = client.channels.cache.get("916823908613771264")

if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
  let block = await client.db.get(`Servidores_${message.guild.id}`)
  if (message.channel.id == block.canal1 || message.channel.id == block.canal2 || message.channel.id == block.canal3 || message.channel.id == block.canal4 || message.channel.id == block.canal5) {
  let canalblock = await message.channel.send(`<:erro:858615784771551252>| Meus comandos não estão disponíveis nesse chat!`)
  setTimeout(function() {
  message.delete()
  canalblock.delete()
}, 3000);
return;
}
}
  let user1 = message.author
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let db1 = await database.ref(`Versao/${user1.id}`).once('value');
  let db1ref = database.ref(`Versao/${user1.id}`);
  let db2 = await database.ref(`VersaoBuild`).once('value');
  let d2ref = database.ref(`VersaoBuild`);
  
  if(eco == 'start'){
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
  let dbNiv = database.ref(`Versao/${user.id}`);

if(db.val() == null) {
  const ayy = client.emojis.cache.find(emoji => emoji.name === "load");
  const msg = await message.reply(`${ayy} Trazendo suas informações aguarde..`)

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
  db1ref.set({versão: db1.val().build})
  dbref.set({start: 0})
  db6ref.set({work: 0})
  dbNiv.set({xp: 0})
  dbNiv.set({level: 0})
  client.db.set(`InventarioRPG/${message.author.id}`, {buss: 0});
  client.db.set(`InventarioRPG/${message.author.id}`, {kat: 0});
  client.db.set(`InventarioRPG/${message.author.id}`, {mach: 0});
  msg.edit(`☑️| Sucesso, agora minha Economia estará disponível para você!`)

} 
else {
return;
}
return;
}

  
	 if (dbs.val() == null) {
   return message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)}
	
   let db = await database.ref(`Banidos/${message.author.id}`).once('value');
   let dbref = database.ref(`Banidos/${message.author.id}`);
   let banned = false;

  if (db.val() && db.val().banido) {
    banned = true;
    }
  if(banned) return message.reply(`**<:erro:858615784771551252>| Você foi banido de usar meus comandos! Para mais informações entre em contato com meus desenvolvedores!**`)
channel.send({embeds: [embed1]})
require("../Xp.js")(client, message, database)
require("../Eventos/ItensRPG.js")(client, message, database)
try {
comando.run(client, message, args, database, prefix);
} catch (err) {console.log(err)}
}