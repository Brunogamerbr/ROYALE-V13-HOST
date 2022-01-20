const Discord = require("discord.js");

module.exports.run = async function(client, message, args, database, prefix) {

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


  

	

  let dbref = await database.ref(`Economia/${message.author.id}`)
  let db = await dbref.once('value')
  let money;
  if(db.val() === null) money = 0
  else money = db.val().dinheiro

  let limitParticipants = args[1]
  if(limitParticipants) {
   if(limitParticipants > 20) limitParticipants = 20
    else if(limitParticipants < 2) limitParticipants = 2
    else limitParticipants = limitParticipants
  } else limitParticipants = 20
  if(isNaN(limitParticipants)) limitParticipants = 20
  
  let amount = args[0]
  if(!amount || amount < 10) return message.inlineReply(`**<:erro:858615784771551252>| Informe uma quantia após o comando!**`)
  if(isNaN(amount)) return message.inlineReply(`**<:erro:858615784771551252>| Informe uma quantia válida**`)

  if(amount > money) return message.inlineReply(`**<:erro:858615784771551252>| Você não não possui essa quantia na sua Carteira!**`)

  let arrayUsers = [message.author.id]
  let desc = `${message.author} Iniciou uma rinha!\nQuantia para participar: **R$${amount.toLocaleString()}**\nPremiação: **R$${(amount * arrayUsers.length).toLocaleString()}**\nParticipantes **(${arrayUsers.length}) \`Limite(${limitParticipants} Participantes)\`**\n${arrayUsers.map(u => `<@${u}>`)}\nO ganhador irá sair quando ${message.author} clicar no ☑️`
	let fot = `Reaja com ☠️ para entrar na batalha!`

  let embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
              
  .setDescription(desc)
.setFooter(fot)
	.setColor("#0D02FA")
  let msg = await message.inlineReply(embed)

  msg.react('☠')
  msg.react("☑️")

  let filter = (r, u) => u.id !== client.user.id
  
  let collector = await msg.createReactionCollector(filter, { time: 60000 })

  collector.on('collect', async (r, u) => {

    if(r.emoji.name === '☠') {
        let ref2 = await database.ref(`Economia/${u.id}`)
        let db2 = await ref2.once('value')
        let Money;
        if(db2.val() === null) Money = 0
        else Money = db2.val().dinheiro

        if(Money < amount) return;
        if(arrayUsers.includes(u.id)) return;

        if(arrayUsers.length < limitParticipants) arrayUsers.push(u.id)
        else return collector.stop()
        let newEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))              
        .setDescription(desc)
	    .setFooter(fot)
	    .setCoolor("#0D02FA")

        msg.edit(newEmbed)
    }
        
    if(r.emoji.name === "☑️" && u.id === message.author.id) return collector.stop()

  })


  collector.on('end', async () => {
    let newArray = []
    for(let i = 0; i < arrayUsers.length; i++) {
      let user = arrayUsers[i]
      let dbref3 = await database.ref(`Economia/${user}`)
      let db3 = await dbref3.once('value')
      let finalMoney;
      if(db3.val().dinheiro >= amount) newArray.push(user)
    }
    
    if(newArray.length < 2) {
      return message.channel.send(`${message.author}, Como não tinha participantes o suficiente a rinha foi cancelada.`)
    } else {
      let rand = Math.floor(Math.random() * newArray.length)
      let winner = newArray[rand]

      for(let i = 0; i < newArray.length; i++) {
        if(newArray[i] === winner) {
          let refWinner = await database.ref(`Economia/${winner}`)
        let dbWinner = await refWinner.once('value')
        refWinner.update({
          dinheiro: dbWinner.val().dinheiro + ((newArray.length * amount) - amount)
        })
        } else {
          let refLosers = await database.ref(`Economia/${newArray[i]}`)
          let dbLosers = await refLosers.once('value')
          refLosers.update({
            dinheiro: dbLosers.val().dinheiro - amount
          })
        }
      }

      message.channel.send(`<@${winner}> Ganhou uma quantia de **R$${(amount * arrayUsers.length).toLocaleString()}** da rinha do usuário ${message.author}, e os demais perderam **R$${amount}**`)
    }

  })


}
exports.conf = {
	aliases: ["fight"]
}


/*function timeout(ms) {
  return new Promise(resolve => setTimeout(() => {resolve()},ms));
}*/
