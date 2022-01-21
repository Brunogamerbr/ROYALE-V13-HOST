const Discord = require("discord.js");
const config = require("../config.json");
exports.run = async (client, message, args) => {
  

  if(!config.owners.includes(message.author.id)) {
  message.inlineReply('Apenas os desenvolvedores do Bot podem usar!')
return;
}

  if(!args || args.length < 1) return message.inlineReply(`**Recarregar qual arquivo?**`);
  reload(args[0].toLowerCase());

 function reload(command) {
   return new Promise((resolve, reject) => {
    try {
      if(client.aliases.has(command)) {
        command = client.aliases.get(command)
        delete require.cache[require.resolve(`./${command}.js`)];
      } else {
        delete require.cache[require.resolve(`./${command}.js`)];
      }
      let cmd = require(`../Economia/${command}.js`);
      client.aliases.forEach((com, alias) => {
        if(client.aliases.get(alias) === command) {
          client.aliases.delete(alias);
        }
      });
      if(cmd.conf == null) return message.reply(`**O arquivo \`${args[0]}\` foi recarregado com sucesso.**`);
      
      console.log(`O arquivo ${args[0]} foi recarregado`)
      
      if(cmd.conf.aliases == null) return message.channel.send(`O arquivo** \`${args[0]}\`** foi recarregado com sucesso.**`);
        
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, command);
      });
      message.reply(`**O arquivo** \`${args[0]}\`** foi recarregado com sucesso.**`);
    } catch (e) {
      if(e.code !== "MODULE_NOT_FOUND") console.error(e);
      
    }
  })
 }
} 
