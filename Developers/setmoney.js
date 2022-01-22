const Discord = require("discord.js"); // Puxando a livraria Discord.js
const config = require("../config.json");
exports.run = async (client, message, args, database) => {
  
  if(!config.owners.includes(message.author.id)) {
    message.reply('você não pode usar esse comando! somente o **DONO DO BOT** pode!')
    return;
  }


  let user = message.mentions.users.first() || message.author; // Se não mencionusuario most

  // Ou
  // Seu modo de exportação não ta puxando a database
  let db = await database.ref(`Economia/${user.id}`).once('value');
  let dbref = database.ref(`Economia/${user.id}`);
   let db1 = await database.ref(`Banco/${user.id}`).once('value');
  let db1ref = database.ref(`Banco/${user.id}`);


 if(db.val() == null || db1.val() == null) {
    dbref.set({dinheiro: 0})
    dbref.set({banco: 0})

    return message.inlineReply(`O Usuário(a) ${user} foi adicionado a minha Economia. Utilize o comando Novamente!`)
  }

  
  
  
  
  let quantia = args[0]; // para facilitarmos e não ficar usando args[0]
  
  if (!quantia) return message.channel.send(`Digite uma quantia para ser adicionada!`) // caso o usuário não escreva um número  
  if (isNaN(quantia)) return message.channel.send(`Você não definiu uma quantia.`);  // Se o usuario não colocar um numero ele tornará esta mensagem
  
  await message.react("☑️"); 
 // Removendo na DB a quantia solicitada.


dbref.update({dinheiro: db.val().dinheiro + parseInt(args[0])}) 




}