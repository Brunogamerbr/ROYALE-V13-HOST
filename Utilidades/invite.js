const Discord = require("discord.js")


exports.run = async (client, message, args, database) => {


  

 let user = message.author
 let embed = new Discord.MessageEmbed()   
   .setTitle(`**<:enviar:873563606262890546>| Invite/ Servidor de Suporte**`)
.setDescription(`**Olá ${user} Para entrar em meu Servidor de Suporte Clique [Aqui](https://discord.gg/u65cgdFHSN)\nPara me adicionar em seu Servidor clique [Aqui](https://discord.com/api/oauth2/authorize?client_id=844227895819894794&permissions=287636319703&scope=bot)**`)  .setThumbnail(`https://i.imgur.com/pGnUz4p.png`)
  .setColor(`#0D02FA`)
  .setFooter(message.author.tag, message.author.displayAvatarURL());  
  message.inlineReply(embed)
}