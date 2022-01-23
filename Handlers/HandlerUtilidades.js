const Discord = require("discord.js");
const { Permissions } = require('discord.js');
module.exports = async (client, message, database, config) => {

  let dbPref = await database.ref(`Servidores/${message.guild.id}`).once('value');
	
  let prefix = dbPref.val() ? dbPref.val().prefix ? dbPref.val().prefix : config.prefix.toLowerCase() : config.prefix.toLowerCase();

  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let uti = args.shift();
  let comando = client.utilidades.get(uti);
  if(!comando) return;
	
  let embed1 = new Discord.MessageEmbed()
.setDescription(`**Novo Comando Utilizado Por:** \`${message.author.tag} | ${message.author.id}\`\n\n**Comando Utilizado:** \`${prefix}${uti}\`\n**Depois do Comando:** \`${args.length ? args.join(' ') : " "}\`\n\n**Servidor:** \`${message.guild.name} | ${message.guild.id}\`\n**Canal:** \`${message.channel.name} | ${message.channel.id}\`\n**ID da Mensagem:** \`${message.id}\`\n\n**Informações do servidor:**\n>  Usuários: \`${message.guild.members.cache.filter(u => !u.user.bot).size} Membros\` e \`${message.guild.members.cache.filter(u => u.user.bot).size} Bots\`\n>  Canais: \`${message.guild.channels.cache.size}\`\n>  Cargos: \`${message.guild.roles.cache.size}\``)
    .setColor(`#0D02FA`)
    .setTimestamp()
  .setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic: true}))
  let canal = client.channels.cache.get("916823908613771264");
  canal.send({embeds: [embed1]})

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
	
   let db = await database.ref(`Banidos/${message.author.id}`).once('value');
   let dbref = database.ref(`Banidos/${message.author.id}`);
   let banned = false;

  if (db.val() && db.val().banido) {
    banned = true;
    }
  if(banned) return message.reply(`**<:erro:858615784771551252>| Você foi banido de usar meus comandos! Para mais informações entre em contato com meus desenvolvedores!**`)
 require("../Xp.js")(client, message)
 require("../Eventos/ItensRPG.js")(client, message, database)
try {
comando.run(client, message, args, database, prefix);
} catch (err) {console.log(err)}
}
