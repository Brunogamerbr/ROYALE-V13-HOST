const Discord = require("discord.js");
const config = require("./config.json");
const reqEvent = event => require(`./Events/${event}.js`);
module.exports = async(client, message, database) => {

  
let dbPref = await client.db.get(`Servidores/${message.guild.id}`)
  let prefix = dbPref ? dbPref.prefix ? dbPref.prefix : config.prefix.toLowerCase() : config.prefix.toLowerCase();

	if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift();
  let comando = client.commands.get(cmd);
  if(!comando) return;
	
  let embed1 = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`**Novo Comando Utilizado Por:** \`${message.author.tag} | ${message.author.id}\`\n\n**Comando Utilizado:** \`${prefix}${cmd}\`\n**Depois do Comando:** \`${args.length ? args.join(' ') : " "}\`\n\n**Servidor:** \`${message.guild.name} | ${message.guild.id}\`\n**Canal:** \`${message.channel.name} | ${message.channel.id}\`\n**ID da Mensagem:** \`${message.id}\`\n\n**Informações do servidor:**\n>  Usuários: \`${message.guild.members.cache.filter(u => !u.user.bot).size} Membros\` e \`${message.guild.members.cache.filter(u => u.user.bot).size} Bots\`\n>  Canais: \`${message.guild.channels.cache.size}\`\n>  Cargos: \`${message.guild.roles.cache.size}\``)
    .setColor(`#0D02FA`)
    .setTimestamp();

  let channel = client.channels.cache.get("916823908613771264")

	/*if(!config.owners.includes(message.author.id)) 
    
message.reply(`**Nesse momento Eu estou sendo atualizado, Você não poderá usar meus comandos até a atualização acabar. Para mais informações entre em meu Servidor de Suporte usando \`.invite\`**`)
return;
}*/

  let user1 = message.author;
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
	
   
 /*channel.send({embeds: [embed1]})
 reqEvent("xp")(client, message )
 reqEvent("ItensRPG")(client, message)
 reqEvent("QuestRPG")(client, message, args, database)*/
try {
    comando.run(client, message, args, database, prefix);
  } catch(err) {
    console.log(err);
  }

}