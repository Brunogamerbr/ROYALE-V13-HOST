const Discord = require("discord.js")
exports.run = async (client, message, args, database) => {
  
var doggo = message.guild.members.cache.get(client.user.id);

if(!doggo.hasPermission('MANAGE_MESSAGES')){
return message.inlineReply(`<:erro:858615784771551252>| Está me faltando permissão de \`gerenciar mensagens\` nesse servidor!`)}

let content = args.join(` `)
let user = message.author

if (!args[0]) {
return message.inlineReply(`<:erro:858615784771551252>| Escreva seu problema após o comando!`)
}

let canal = client.channels.cache.get("916823927853051955");

let embed = new Discord.MessageEmbed()  
.setTitle(`**Um novo bug foi Reportado**`)
.setDescription(`**Bug reportado por: \`${message.author.tag}\`\nID: \`${user.id}\`\nBUG: \`${content}\`**`)
  .setColor(`#0D02FA`)
canal.send(embed)
message.delete()
await message.reply(`**☑️| Sua Reportagem de Bug foi enviada para a Minha equipe Analisar!**`)
}
exports.conf = {
  aliases: ["report", "reportar"]
}