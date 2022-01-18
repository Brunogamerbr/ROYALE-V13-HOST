const Discord = require("discord.js");
module.exports = async (client, message, database, config) => {

  let dbPref = await database.ref(`Servidores/${message.guild.id}`).once('value');
	
  let prefix = dbPref.val() ? dbPref.val().prefix ? dbPref.val().prefix : config.prefix.toLowerCase() : config.prefix.toLowerCase();

  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let ave = args.shift();
  let comando = client.commands.get(ave);
  if(!comando) return;
	
  

/*let active = await client.db.get(`ModoDev`);
if (active.active != 0) {*/
/*if(!config.owners.includes(message.author.id)) {
    
message.reply(`**Nesse momento minha versão **RPG** está sendo atualizada! Para mais informações entre em meu Servidor de Suporte usando \`${prefix}invite\`**`)
return;}*/

  let user1 = message.author
  
  let dbs = await   
database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);

  let db1 = await   
database.ref(`Versao/${user1.id}`).once('value');
  let db1ref = database.ref(`Versao/${user1.id}`);

  let db2 = await   
database.ref(`VersaoBuild`).once('value');
  let d2ref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
  message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
    }

  
if (db1.val().versão !== db2.val().build) {
message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}
	
   let db = await database.ref(`Banidos/${message.author.id}`).once('value');
  let dbref = database.ref(`Banidos/${message.author.id}`);
  let banned = false;

  if (db.val() && db.val().banido) {
    banned = true;
    }
  if(banned) return message.reply(`**<:erro:858615784771551252>| Você foi banido de usar meus comandos! Para mais informações entre em contato com meus desenvolvedores!**`)

  
let block = await client.db.get(`Servidores_${message.guild.id}`)
if (message.channel.id == block.canal1 || message.channel.id == block.canal2 || message.channel.id == block.canal3 || message.channel.id == block.canal4 || message.channel.id == block.canal5) {

let canalblock = await message.channel.send(`<:erro:858615784771551252>| Meus comandos não estão disponíveis nesse chat!`)

setTimeout(function() {
  canalblock.delete()
}, 3000);
return;
}
	
 /*require("./Xp.js")(client, message )
 require("./ItensRPG.js")(client, message)
 require("./QuestRPG.js")(client, message, args, database)*/
	
try {
comando.run(client, message, args, database, prefix);
} catch (err) {console.log(err)}


	
}
