const Discord = require("discord.js") // Puxando a livraria Discord.js

exports.run = async (client, message, args, database, prefix) => {

 
  
  


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
  message.inlineReply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
    }

  
if (db1.val().versão !== db2.val().build) {
message.inlineReply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}
  
  
  
  let user = message.author




  let db = await database.ref(`Empregos/${user.id}`).once('value');
  let dbref = database.ref(`Empregos/${user.id}`);
  




  if (db.val().emprego == 1) return message.inlineReply(`**Você ja possui um empredo de: \`💻 Programador\`, Você deve pedir demissão para visitar a Agência.**`) // Se o usuario tiver 1 na db no caso emprego de programador ele retornara esta mensagem.
  if (db.val().emprego == 2) return message.inlineReply(`**Você ja possui um empredo de: \`⛏️ Minerador\`, Você deve pedir demissão Para visitar a Agência.**`) // Se o usuario tiver 1 na db no caso emprego de minerador ele retornara esta mensagem.

  let embed = new Discord.MessageEmbed() // Criando uma embed
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`
   **Olá ${user} sejá bem-vindo(a) a Nossa agencia de Empregos, veja abaixo todos os Empregos disponíveis:**\n**
💻<a:seta:882102474264154215> Programador**\n**⛏️<a:seta:882102474264154215> Minerador**\n`)
.setThumbnail(`https://i.imgur.com/HkIASTr.png`)
.setFooter("Reaja com o emoji referente ao Emprego desejado")
.setColor(`0D02FA`)
  
  let m = await message.inlineReply(embed).then(async (m) => {
    m.react('💻').then(() => m.react('⛏️'));

    let c1 = await m.createReactionCollector((r, u) => u.id === user.id, {max: 1, time: 60000}).on('collect', async (reaction, user) => {
      if(reaction.emoji.name == '💻') { // Caso o usuário clique no emoji referente à Programador
          dbref.update({ emprego: db.val().emprego + 1 })
        return message.channel.send('**☑️| Parabéns! Agora você trabalhará como um 💻 Programador**');

          // iremos adicionar 1 (um) na DB, que iremos usar como Programador
      } else if(reaction.emoji.name == '⛏️') {
        dbref.update({ emprego: db.val().emprego + 2 })
        return message.channel.send('**☑️| Parabéns! Agora você trabalhará como um ⛏️ Minerador**')
      } else return message.reply('**O tempo acabou. Utilize o comando novamente para poder escolher um emprego.**');
    })
  })
}

exports.conf = {

  aliases: ['empregos']
}