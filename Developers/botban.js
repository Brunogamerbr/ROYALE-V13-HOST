const Discord = require("discord.js")
const config = require("../config.json");
module.exports.run = async (client, message, args, database) => {
  console.log(config.owners);
if (!config.owners.includes(message.author.id)) {
        return;
}
  let user = message.mentions.users.first() || client.users.cache.get(args[0]);
  if(!user) return message.reply("Meliante não encontrado!");
  let db = database.ref(`Banidos/${user.id}`).once('value');
  let dbref = database.ref(`Banidos/${user.id}`)
  
dbref.set({banido: user})
message.channel.send(`**☑️| Esse usuário(a) não poderá usar meus comandos até o banimento seja removido!**`)

  user.send(`**Você foi proibido de usar meus comandos por tempo indeterminado!\n\nmotivo: \`${args.slice(1).join(' ')}\`**`)

}