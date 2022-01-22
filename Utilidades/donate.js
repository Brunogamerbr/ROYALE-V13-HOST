const Discord = require("discord.js")
module.exports.run = async (client, message, args, database, prefix) => {
   let embed = new Discord.MessageEmbed()
  .setTitle(`🤑| donate`)
  .setDescription(`**Faça uma doação para ajudar o bot a ficar sempre online trazendo entretenimento e diversão para todos vocês, qualquer quantia e bem vinda. e também terá recompensas para o doador veja algumas recompensas a baixo:\n\n > 1 R$ = 5 Mil de Saldo no Bot\n > 2 R$ = 10 Mil de Saldo no Bot\n > 3 R$ = 15 Mil de Saldo no Bot\n> 4 R$ = 20 Mil de Saldo no Bot\n> 5 R$ = 50 Mil de Saldo no Bot\n\nSó aceitamos doações de até 5 reais no Momento!\n\nFormas de pagamento:\n<:mercadopago:882065221781422100> Mercado pago\n<:picpay:895087317528756264> PicPay\n<:pix:895084328558686268> Pix\n\nNão tem essas plataformas de pagamento? Use nosso código do <:kwai:882068396844396584> kwai clicando [aqui](https://s.kwai.app/s/uEmdhhNY) Você também receberá recompensas como:\n\n> 30 Mil de Saldo no Bot\n\nTem enterese em Doar? Pegue o privado do meu dono com \`${prefix}dono\`**`)
.setFooter(`Doar para ganhar recompensas.`)
.setColor(`#0D02FA`)
.setThumbnail(`https://i.imgur.com/aXQu6aC.png`)
.setTimestamp()
message.reply({embeds: [embed])
}
exports.conf = {
  aliases: ["doar", "doação"]
}
