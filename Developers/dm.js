const Discord = require('discord.js');
module.exports.run = async (client, message, args, database) => {
    let user = message.mentions.users.first() ||
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

