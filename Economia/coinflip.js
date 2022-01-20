const Discord = require('discord.js');


module.exports.conf = {
  aliases: ["caraoucoroa", "coc", "flipcoin"]
}


module.exports.run = async function(client, message, args, database, prefix) {

  let user1 = message.author
 
  
  let dbS = await   
database.ref(`Start/${user1.id}`).once('value');
  let dbSref = database.ref(`Start/${user1.id}`);

  let dbv = await   
database.ref(`Versao/${user1.id}`).once('value');
  let dbvref = database.ref(`Versao/${user1.id}`);

  let dbB = await   
database.ref(`VersaoBuild`).once('value');
  let dbBref = database.ref(`VersaoBuild`);

  if (dbS.val() == null) {
  message.inlineReply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
    }

  
if (dbv.val().versão !== dbB.val().build) {
message.inlineReply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
  }

  
  
  
  
  
  
  
  
  
  
  let user = message.mentions.members.first();
  if(!user) return message.channel.send(`:x: **| Você precisa mencionar um usuário para realizar a aposta!**`);

let dbU = await   
database.ref(`Start/${user.id}`).once('value');
  let dbUref = database.ref(`Start/${user.id}`);


if (dbU.val() == null) {
message.inlineReply(`**<:erro:858615784771551252>| O usuário mencionado não está em minha Economia**`)
return;
}



  
  if(user == message.member) return message.channel.send("Você não pode apostar consigo mesmo!");
  
  let rand = Math.random()
  let coc = Boolean(rand > 0.5);
  let aposta = args[1];

  if(!aposta || parseInt(aposta) < 1 || !parseInt(aposta)) return message.channel.send(`:x: **| Aposta inválida! use \`.coinflip @user valor\` **`);

  aposta = parseInt(aposta);

  let db = await database.ref(`Economia/${message.author.id}`).once('value');
  let dbref = database.ref(`Economia/${message.author.id}`);
  let db2 = await database.ref(`Economia/${user.id}`).once('value');
  let db2ref = database.ref(`Economia/${user.id}`);

  if(!db.val() || db.val().dinheiro < aposta) return message.channel.send(`:x: **| Você não tem dinheiro suficiente para apostar!**`);

  if(!db2.val() || db2.val().dinheiro < aposta) return message.channel.send(`:x: **| ${user} Não tem dinheiro suficiente para apostar!**`);

  let msg = await message.channel.send(`:x: **| ${user} Você está sendo desafiado para uma partida de \` CARA \` ou \` COROA \`**\n\n**Clique em > 🌑 < para escolher \` COROA \` _ou_**\n**Clique em > 🌕 < para escolher \` CARA \`**`);

  await msg.react("🌑");
  await msg.react("🌕");

  let c1 = await msg.createReactionCollector((b, a) => a.id === user.id, {time: 30000});

  c1.on("collect", (reaction, user) => {
    if((db2.val().dinheiro < aposta) || (db.val().dinheiro < aposta)) return message.channel.send(`Jogo cancelado! Jogadores sem dinheiro suficiente!`)
    switch(reaction.emoji.name) {
      case '🌑':
        run(false)
      break;
      case '🌕':
        run(true)
      break;
    }
  })

  async function run(choice) {
    msg.delete();
    let m = await message.channel.send(`**A moeda é atirada para cima...**`);

    await timeout(3000); 
    
    if((db2.val().dinheiro < aposta) || (db.val().dinheiro < aposta)) return message.channel.send(`Jogo cancelado! Jogadores sem dinheiro suficiente!`)

    // ${user} Perdeu ${aposta} e ${message.author} Ganhou ${aposta}


    let m1 = `${user} Ganhou uma quantia de R$${aposta} do usuário ${message.author}!`;
    let m2 = `${message.author} Ganhou uma quantia de R$${aposta} do usuário ${user}!`;
    let caiu = coc ? "CARA" : "COROA";
    let winner = coc == choice ? m1 : m2;

    message.channel.send(`A moeda caiu \` ${caiu} \` ${winner}`)

    
    if(coc == choice) {
      dbref.update({
        dinheiro: db.val().dinheiro - aposta
      })
      db2ref.update({
        dinheiro: db2.val().dinheiro + aposta
      })
    } else {
      dbref.update({
        dinheiro: db.val().dinheiro + aposta
      })
      db2ref.update({
        dinheiro: db2.val().dinheiro - aposta
      })
    }
  }
}
function timeout(ms) {
  return new Promise(r => {setTimeout(() => {r();}, ms)});
}
