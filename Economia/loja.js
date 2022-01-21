const Discord = require("discord.js")
module.exports.run = async (client, message, args, database, prefix) => {

  let user1 = message.author;
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let db1 = await database.ref(`Versao/${user1.id}`).once('value');
  let db1ref = database.ref(`Versao/${user1.id}`);
  let db2 = await database.ref(`VersaoBuild`).once('value');
  let d2ref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
  message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
  return;
    }

  let db = await database.ref(`Economia/${user1.id}`).once("value")
  let dbref = database.ref(`Economia/${user1.id}`)

  
  if (db1.val().versão !== db2.val().build) {
message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}


   let dbL = await database.ref(`Loja/${user1.id}`).once("value")
   let dbLref = database.ref(`Loja/${user1.id}`)
   let caiu = Math.floor(Math.random() * (500 - 100)) + 100;
   let embed = new Discord.MessageEmbed()

.setTitle(`**Loja de itens e Ferramentas**`)
.setDescription(`**${message.author} Seja bem vindo a minha loja! abaixo estará uma pequena lista de itens a venda.\n\n<:porte:910846323463422003>  Porte de Armas\nPreço: R$7000\n\n<:escl:910849586858434600> Escolta\nPreço: R$500\n\n<:pistola:910848201672773642> Pistola\nPreço: R$5000\n\n<:caixa:910843230273282058> MisteryBox\nPreço: R$300\n\n<:roll:910846793749758012> Roll\nPreço: R$500**`)
.setThumbnail(`https://cdn.glitch.com/b98b4389-f89f-445c-b6db-65281520d07b%2Ficons8-online-store-64.png?v=1591924550503`)
.setColor(`#0D02FA`)
let msg = await message.reply({embeds: [embed]}) 

msg.react(`<:porte:910846323463422003>`);
msg.react("<:escl:910849586858434600>");
msg.react("<:pistola:910848201672773642>");
msg.react("<:caixa:910843230273282058>");
msg.react("<:roll:910846793749758012>");

let c1 = await msg.createReactionCollector((reaction, u) => u.id === message.author.id, {time: 60000});

c1.on("collect", async (m, u) => {
  c1.stop();
  switch(m.emoji.id) {
    case `910846323463422003`:
      if(db.val().dinheiro < 7000) return message.reply(`<:erro:858615784771551252>**|** Você não tem dinheiro suficiente para comprar um **Porte de Armas`);

message.reply(`Você comprou um porte de armas!`);

      dbref.update({
        dinheiro: db.val().dinheiro - 7000
      })
      dbLref.update({porte: 1})
      
    break;
    case "910849586858434600":
      /*if(db.val().dinheiro < 500) return message.inlineReply(`:x: **|** Você não tem dinheiro suficiente para comprar uma **Escolta**`);
      message.inlineReply(`Você comprou 30 minutos de escolta!`);
      
      dbref.update({
        dinheiro: db.val().dinheiro-500
      })
      dbLref.set({escolta: 1 })*/
    message.reply(`Escolta em manutenção!`)
      return;
      break;
    case "910848201672773642":
    
    
      if(db.val().dinheiro < 5000) return message.reply(`<:erro:858615784771551252>**|** Você não tem dinheiro suficiente para comprar uma **Pistola**`);
      message.reply(`Você comprou uma pistola!`);

      dbref.update({
        dinheiro: db.val().dinheiro-5000
      })
      dbLref.update({pistola: 1})
    break;
    case "910843230273282058":
      /*if(db.val().dinheiro < 300) {
        message.inlineReply(`:x: **|** Você não tem dinheiro suficiente para comprar uma **MisteryBox**`);
        return;         
      } else {
        let emb = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setDescription(`Você comprou uma **MisteryBox** e abriu.. Dentro dela havia: **R$${caiu}** + **60** de **XP**`)
          .setFooter(`Mistery Box aberta`)
          .setColor("#0D02FA")
          .setTimestamp();
      

        dbref.update({
          dinheiro: (db.val().dinheiro - 300) + caiu
        })
        

        message.inlineReply(emb)
      }*/
      message.reply(`MisteryBox em manutenção!`)
    break;
  case "910846793749758012":
      if (db.val().dinheiro <500) {
message.reply(`**<:erro:858615784771551252>|** Você não tem dinheiro na carteira suficiente para comprar um Roll!`)
return;       
}
      message.reply(`Você comprou **1** Roll no valor de **R$500**!`)
      dbref.update({dinheiro: db.val().dinheiro - 500})
      dbLref.update({roll: (dbL.val().roll || 0) + 1})
      break;
  }
})

}