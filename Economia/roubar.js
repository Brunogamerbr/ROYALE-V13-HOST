const Discord = require("discord.js");
const ms = require("parse-ms");

module.exports.run = async (client, message, args, database, prefix) => {
let user = message.author;
let cara = message.mentions.users.first();

let db4 = await database.ref(`Start/${user.id}`).once('value');
let db4ref = await database.ref(`Start/${user.id}`);


if (db4.val() == null) {
message.inlineReply(`**Antes de começar a usar minha Economia. você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`);
 return;
}

let db5 = await database.ref(`Versao/${user.id}`).once('value');  
let db6 = await database.ref(`VersaoBuild`).once('value');

if (db5.val().versão !== db6.val().build){
message.inlineReply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`.invite\`**`)
return;
}
  
if (!cara) {
message.inlineReply(`**<:erro:858615784771551252>| Mencione o usuário que você deseja Roubar.**`);
return; 
}


if (cara == message.author) {
return message.inlineReply(`<:erro:858615784771551252>| Você não pode se roubar!`);
}

let db3 = await database.ref(`Start/${cara.id}`).once('value');        
if (db3.val() == null) {
message.inlineReply(`**<:erro:858615784771551252>| Esse usuário não está em minha Economia!**`)
  return;
}
  
let db7 = await database.ref(`Versao/${user.id}`).once('value');  
let db8 = await database.ref(`VersaoBuild`).once('value');

  
let db9 = await database.ref(`Economia/${cara.id}`).once('value');
let db9ref = database.ref(`Economia/${cara.id}`); 
  
let db1 = await database.ref(`Loja/${user.id}`).once('value')
let db2 = await database.ref(`Loja/${cara.id}`).once('value');
  
if (!db1.val() || !db1.val().porte) {
message.inlineReply(`**<:erro:858615784771551252>| Você não possui um Porte de Armas! compre um na loja usando \`.loja\`**`)
return;
}

if (!db1.val() || !db1.val().pistola) {
message.inlineReply(`**<:erro:858615784771551252>| Você não possui uma Pistola! compre uma na loja utilizando \`.loja\`**`)
return;
}
  
if (db9.val().dinheiro <0) {
message.inlineReply(`**<:erro:858615784771551252>| O usuário mencionado não possui saldo suficiente para ser roubado!**`)
return;
}

 if (db9.val().dinheiro == 0 ){
message.inlineReply(`<:erro:858615784771551252>| O usuário mencionado Não tem saldo na Carteira para ser roubado.`)
return;
 }

let db = await database.ref(`Economia/${user.id}`).once('value');
let dbref = database.ref(`Economia/${user.id}`);

let roubo = ["n", "Preso", "n", "Preso", "Preso"]
let caiu = roubo[Math.floor(Math.random() * roubo.length)] 
  
 
    
let timeout = 600000;

let amount = Math.floor(Math.random() * 4000) + 1000;
  

let tb = await database.ref(`Transacoes/${message.author.id}`).once("value")
let tbref = database.ref(`Transacoes/${message.author.id}`)
let tb2 = await database.ref(`Transacoes/${cara.id}`).once("value")
let tbref2 = database.ref(`Transacoes/${cara.id}`)

  let t1 = tb.val() ? tb.val().t : [];
  let t2 = tb2.val() ? tb2.val().t : [];

  if(db.val().roubotime !== null && timeout - (Date.now() - db.val().roubotime) > 0) {
let time = ms(timeout - (Date.now() - db.val().roubotime));
return message.inlineReply(`**<:erro:858615784771551252>| Espere ${time.hours}h ${time.minutes}m ${time.seconds}s Para realizar um Roubo novamente!**`);
}


if (caiu == 'Preso') {
t1.push({type: "roubo", lost: 1, action: 1, date: Date.now(), quantia: amount});
  tbref.set({
    t: t1
  })

let embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`Você tentou Roubar ${cara} mais Polícia te prendeu. E você perdeu uma quantia de **R$${amount}** Tente novamente mais tarde`)
.setThumbnail(`https://i.imgur.com/zSO6sKz.png`)
.setFooter(`Roubo mal sucedido`)
.setColor(`#0D02FA`)
.setTimestamp()
message.inlineReply(embed)                                  

dbref.update({dinheiro: db.val().dinheiro - amount, roubotime: + Date.now()});
return;
}
else {
t1.push({type: "roubo", lost: 0, action: 1, date: Date.now(), quantia: amount, victim: cara.id});
t2.push({type: "roubo", lost: 0, action: 0, date: Date.now(), quantia: amount, author: message.author.id});

  tbref.set({
    t: t1
  })
  tbref2.set({
    t: t2
  })

let embed2 = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`${user} Você Roubou uma quantia de **R$${amount}** do usuário(a) ${cara}`)
.setThumbnail(`https://i.imgur.com/pQvqQ54.png`)
.setFooter(`Roubo bem sucedido`)
.setTimestamp()
.setColor(`#0D02FA`)
message.channel.send(embed2)

db9ref.update({dinheiro: db9.val().dinheiro - amount })
dbref.update({dinheiro: db.val().dinheiro + amount, roubotime: Date.now()})
}
}
exports.conf = {
  aliases: ["assaltar", "rob"]
}