const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args, database, prefix) => {
 let user1 = message.author
  
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

  
if (db1.val().versão !== db2.val().build) {
message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}


  
 let user = message.author
 let db = await database.ref(`Banco/${user.id}`).once('value');
 let dbref = database.ref(`Banco/${user.id}`);
 let dbn = await database.ref(`Economia/${user.id}`).once('value');
 let dbnref = database.ref(`Economia/${user.id}`);


    if (!args[0]) {
    return message.reply(`<:erro:858615784771551252> **|** Coloque o valor do saque!`);
    };
   
  
  

    if (db.val().bank < args[0]) {
      message.reply(`<:erro:858615784771551252> **|** Você não Dinheiro no Banco o suficiente para realizar o saque!`);
    return;
    }
    
    if(args[0] < 0) {
    return message.reply(`<:erro:858615784771551252> **|** Você tem que colocar um valor maior que **0** para realizar o saque!`);
    };
    

    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))   
   .setDescription(`Você sacou um valor de **R$${db.val().bank}** De sua conta **bancária**. Tome cuidado com **Roubos**.`)
    .setFooter(`Saque realizado`)
    .setThumbnail(`https://i.imgur.com/2xiAhFf.png`)
    .setColor(`0D02FA`)
    .setTimestamp()   


if (db.val().bank == 0) {
  message.reply(`Você não tem saldo disponível na sua **Carteira**!`)
return;
}

  
if(args[0] == 'all') {
 dbnref.update({dinheiro: dbn.val().dinheiro + db.val().bank}) 
 await dbref.update({bank: db.val().bank - db.val().bank})
await message.reply({embeds: [embed]})
return;

}


if (isNaN(args[0])){
        return message.reply(`<:erro:858615784771551252> **|** Você tem que colocar um valor numerico para realizar o saque!`);
    };
        let embed6 = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))   
       .setDescription(`Você sacou um valor de **R$${args[0]}** De sua conta **Bancária**. Tome cuidado com **Roubos**.`)

       .setFooter(`Saque realizado`)
       .setThumbnail(`https://i.imgur.com/2xiAhFf.png`)
       .setColor(`#0D02FA`)
       .setTimestamp()   
    message.reply({embeds: [embed6]});

await dbnref.update({dinheiro: dbn.val().dinheiro + parseInt(args[0])})
await dbref.update({bank: db.val().bank - parseInt(args[0])})
}