const Discord = require("discord.js");
module.exports = async(client, message, database) => {
  
  let dbE = await database.ref(`Economia/${message.author.id}`).once('value');
  let dbEref = database.ref(`Economia/${message.author.id}`);
  
  let dbN = await database.ref(`Nivel/${message.author.id}`).once('value');
  let dbNref = database.ref(`Nivel/${message.author.id}`);

  if(dbN.val() == null) {
      dbNref.set({
        xp: 0,
        level: 1
      })
  } else {
    dbNref.update({
      xp: dbN.val().xp + Math.floor(Math.random() * (15 - 3)) + 3
    })

    if(dbN.val().level * 340 <= dbN.val().xp) {
      dbNref.update({
        xp: 0,
        level: dbN.val().level + 1
      });
      let embed4 = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`Parabéns ${message.author} Você avançou para o Nível **${dbN.val().level + 1}**. Como recompensa você ganhou **R$${120*dbN.val().level}**`)
        .setFooter(`Nivel upado!`)
        .setThumbnail(`https://i.imgur.com/Xueb5Sj.png`)
        .setColor(`#0D02FA`)
      .setTimestamp()
      dbEref.update({dinheiro: dbE.val().dinheiro + (1200*dbN.val().level)})
        
      message.channel.send({embeds: [embed4]});
    }
  }

  
}











