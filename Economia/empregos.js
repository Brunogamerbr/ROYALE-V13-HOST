const Discord = require("discord.js") // Puxando a livraria Discord.js

module.exports.run = async (client, message, args, database, prefix) => {

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
return message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
}
  
  let user = message.author
  let db = await database.ref(`Empregos/${user.id}`).once('value');
  let dbref = database.ref(`Empregos/${user.id}`);
  

  if (db.val().emprego == 1) return message.reply(`Você ja possui um empredo de: \`💻 Programador\`, Você deve pedir demissão para visitar a Agência!`)
  
  if (db.val().emprego == 2) return message.reply(`**Você ja possui um empredo de: \`⛏️ Minerador\`, Você deve pedir demissão Para visitar a Agência!`)

  let embed = new Discord.MessageEmbed() 
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`
   **Olá ${user} sejá bem-vindo(a) a Nossa agencia de Empregos, veja abaixo todos os Empregos disponíveis:**\n**
💻<a:seta:882102474264154215> Programador**\n**⛏️<a:seta:882102474264154215> Minerador**\n`)
    .setThumbnail(`https://i.imgur.com/HkIASTr.png`)
    .setFooter("Reaja com o emoji referente ao Emprego desejado")
    .setColor(`0D02FA`)
  
  const m = await message.reply({embeds: [embed]})
     m.react('⛏️'); m.react("💻")
let filter1 = (reaction1, user1) => {
	return reaction.emoji.name === '⛏️' && user.id === message.author.id;
};
let collector1 = m.createReactionCollector({ filter1, time: 15000 });
collector1.on('collect', (reaction1, user1) => {
          dbref.update({emprego: 1})
        message.channel.send('**☑️| Parabéns! Agora você trabalhará como um 💻 Programador**');
})

let filter = (reaction, user) => {
	return reaction.emoji.name === '💻' && user.id === message.author.id;
};
let collector = m.createReactionCollector({ filter, time: 15000 });
collector.on('collect', (reaction, user) => {
        dbref.update({emprego: 2})
       message.channel.send('**☑️| Parabéns! Agora você trabalhará como um ⛏️ Minerador**')
})
}

exports.conf = {

  aliases: ['empregos']
}