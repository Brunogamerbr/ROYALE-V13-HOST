const Discord = require("discord.js")
const config = require("../config.json");
const pixapi = require("pixapi");
const jimp = require("jimp");
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, database, prefix ) => {

  let user = client.users.cache.find(u => u.tag === args[0]) || message.mentions.users.first() || client.users.cache.get(args[0]); 

  if(!user) {
  return message.reply("<:erro:858615784771551252>| Você precisa informar o usuário que deseja enviar o pagamento!");
 }
  if(user.id == message.author.id) {
 return message.reply(`<:erro:858615784771551252>| Você não pode enviar dinheiro para a sua conta!`)}

  let dbu = await database.ref(`Start/${user.id}`).once('value');
  let dburef = database.ref(`Start/${user.id}`);
  
  if (dbu.val() == null) {
  message.reply(`<:erro:858615784771551252>| O usuário(a) ${user} Não está em meu banco de dados`)
  return;
  }
  let money = parseInt(args[1]);

  if(!args[1] || !money || money <= 0) return message.reply("<:erro:858615784771551252>| Por favor, Informe uma quantia de dinheiro válida!");

  let db = await database.ref(`Economia/${message.author.id}`).once('value');
  let dbref = database.ref(`Economia/${message.author.id}`);
  let db2 = await database.ref(`Economia/${user.id}`).once('value');
  let db2ref = database.ref(`Economia/${user.id}`);
  let tb = await database.ref(`Transacoes/${message.author.id}`).once("value")
  let tbref = database.ref(`Transacoes/${message.author.id}`)
  let tb2 = await database.ref(`Transacoes/${user.id}`).once("value")
  let tbref2 = database.ref(`Transacoes/${user.id}`)

  if(!db2.val()) return message.reply(`:x: **| Esse usuário(a) não está em minha Economia!**`);
  if(!db.val() || db.val().dinheiro < money) return message.inlineReply(":x: **| Você não possui dinheiro suficiente para isso!**");

  let msg = await message.channel.send(`${message.author} Para você poder enviar dinheiro para ${user} os dois devem clicar em ☑️`);
  await msg.react("☑️");
  let filter = (r, u) => r.emoji.name == '☑️'
  let c1 = msg.createReactionCollector(filter, {time: 30000});

  c1.on("collect", async (reaction, u) => {
    let arr = msg.reactions.cache.get('☑️').users.cache.map(x => x.id)
    if(arr.includes(message.author.id) && arr.includes(user.id)) {
    let grana = await client.db.get(`Economia_${message.author.id}_dinheiro`);
    if(parseInt(grana) >= money) {
      c1.stop()
    
    db2ref.update({
      dinheiro: parseInt(db2.val().dinheiro) + parseInt(args[1])
    });
   await dbref.update({
      dinheiro: parseInt(db.val().dinheiro) - parseInt(args[1])
    });

    let t1 = tb.val() ? tb.val().t : [];
    let t2 = tb2.val() ? tb2.val().t : [];

    t1.push({type: "pay", action: 1, date: Date.now(), quantia: money, to: user.id});
    t2.push({type: "pay", action: 0, date: Date.now(), quantia: money, by: message.author.id});

    tbref.set({t: t1})
    tbref2.set({t: t2})
    message.reply(`☑️| Transações realizada com sucesso, ${user} recebeu **R$${parseInt(args[1])}**!`)
}
}
})
}


module.exports.config = {
  aliases: ["pagar"]
}
