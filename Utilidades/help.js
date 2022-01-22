const Discord = require("discord.js")
module.exports.run = async (client, message, args) => {

let embed = new Discord.MessageEmbed()
 .setTitle(`<:file:873563451665055754>| lista de comandos`)  
 .setDescription(`Veja abaixo uma lista detalhada com todos os meus comandos disponíveis:\n\n**<a:seta:882102474264154215>| ECONOMIA
\`daily rank work time crime roll rinha rifa coinflip roubar sorte loja empregos depositar sacar pay saldo demissão transacoes\`**\n\n**<a:seta:882102474264154215>| UTILIDADES
\`donate sugest banner bug invite userinfo afk ping avatar uptime clima\`**\n\n**<a:seta:882102474264154215>| MODERAÇÃO
\`ban unban kick block setprefix anuncio sorteio setsugest addemoji addvip addcargo say clear\`**\n\n**<a:seta:882102474264154215>| AVENTURA:
\`create-avatar open battle explorar chop eat buy shop bag av use\`**\n\nGostou de mim? então me adicione em seu servidor clicando **[aqui](https://discord.com/api/oauth2/authorize?client_id=844227895819894794&permissions=287636319703&scope=bot)**`)
.setImage('https://i.imgur.com/Pg9AXWG.gif')
.setThumbnail(`https://i.imgur.com/y3I6uCc.png`)
.setFooter(`Mostrando meu Menu de Comandos`)
.setColor(`#0D02FA`)
.setTimestamp()
message.reply({embeds: [embed]});
}
exports.conf = {
  aliases: ["ajuda", "comandos"]
}
