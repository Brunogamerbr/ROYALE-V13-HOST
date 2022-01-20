const Discord = require("discord.js")
const { Permissions } = require('discord.js');
module.exports.run = async(client, message, args, database, prefix) => {
	    let dbref = database.ref(`Servidores/${message.guild.id}`);
	    let db = await database.ref(`Servidores/${message.guild.id}`).once('value');
      
    let prefix1 = args[0]
      if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply(`<:erro:858615784771551252>**|** Você precisa da permissão \` GERENCIAR SERVIDOR \` para poder usar esse comando!`);

      if(!prefix) return message.reply(`<:erro:858615784771551252>**|** Não é possível deixar o prefixo em branco!`);

      if(!db.val()) {
        dbref.set({
          prefix: ".", welcome: 0, goodbye: 0
        })
      } else {
        dbref.update({
          prefix: prefix1.toLowerCase()
        })
      }
message.reply(`☑️**|** Prefixo alterado com sucesso para \` ${args[0]} \`!`)
}
