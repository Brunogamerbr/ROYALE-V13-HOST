const Discord = require("discord.js");

module.exports.run = async (client, message, args, database, prefix) => {

  let user = message.author
  let dbs = await database.ref(`Start/${user.id}`).once('value');
  let dbsref = database.ref(`Start/${user.id}`);

  if (dbs.val() == null) {
  message.reply(`Antes de votar em mim você deve estar em minha Economia, Execute \`${prefix}start\` para entrar em minha Economia!`)
  return;
  }
  
  let embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`**Olá ${user} Está interessado em Votar em mim? Se sim clique [aqui](https://top.gg/bot/844227895819894794) Saiba quê você receberá Recompensas após seu Voto!**`)
  .setThumbnail(`https://i.imgur.com/clAlxuo.png`)
.setFooter(`Votar para receber recompensas.`)
  .setColor(`#0D02FA`)
  .setTimestamp()

message.channel.send({embeds: [embed]})

}
