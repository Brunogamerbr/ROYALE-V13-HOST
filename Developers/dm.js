const Discord = require('discord.js');

exports.run = async (client, message, args, database) => {

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
  message.inlineReply(`**Antes de começar a me usar você deve usar \`.start\` Para liberar meus comandos**`)
return;
    }

  
if (db1.val().versão !== db2.val().build) {
message.inlineReply(`**Tem uma nova Versão Disponível para sua Conta. Use \`.update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`.invite\`**`)
return;
}

    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send("Você não possui permissão para enviar mensagens no privado das pessoas.");
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]);
    if (!user)
      return message.channel.send("Você não mencionou um usuário ou forneceu uma identificação inválida");
    if (!args.slice(1).join(" "))
      return message.channel.send("Você não especificou sua mensagem");
  
      user.send(args.slice(1).join(" "))
      .catch(() => message.channel.send("Você não pode enviar uma mensagem no privado desse jogador."))
      .then(() => message.channel.send(`${message.author} sua mensagem foi enviada com sucesso para ${user}`));
      message.delete().catch(O_o => {});
}

