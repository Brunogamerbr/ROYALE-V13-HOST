const Discord = require("discord.js");
const { MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow } = require("discord.js");
const ms = require("parse-ms");
module.exports.run = async (client, message, args, database, prefix) => {
 let binomo = ["Baixo", "Baixo", "Cima", "Cima", "Baixo", "Baixo", "Cima"]
 let prc = Math.floor(Math.random() * 2000) + 500;
 let caiu = binomo[Math.floor(Math.random() * binomo.length)]
 let db = await database.ref(`Economia/${message.author.id}`).once('value')
 let dbref = await database.ref(`Economia/${message.author.id}`)
 let aposta = parseInt(args[0])
 if(!aposta){
   return message.reply(`<:erro:858615784771551252>| Você não definiu um valor para o investimento!`)
 }
 if(aposta >db.val().dinheiro){
   return message.reply(`<:erro:858615784771551252>| Você não possuí essa quantia para fazer um investimento!`)
 }else{
   const button = new MessageButton()
	.setCustomId('primary')
	.setLabel('Para Cima')
	.setStyle('SUCCESS')
	
	const button1 = new MessageButton()
	button1.setCustomId('primary1')
	button1.setLabel('Para Baixo')
	button1.setStyle(`DANGER`)
	
	
   const row = new MessageActionRow().addComponents([button], [button1])
   let embed = new Discord.MessageEmbed()
   .setTitle(`Trade de investimentos`)
   .setDescription(`Verifique se o gráfico vai subir ou descer, se caso sua previsão for correta você terá um lucro de **R$${parseInt(aposta)+parseInt(1700)}** em sua carteira, caso ao contrário terá um prejuízo de **R$${parseInt(prc)}**, então avalie bem antes de investir!`)
   .setImage(`https://i.imgur.com/snRSskI.png`)
   .setColor(`#0D02FA`)
   const m = await message.reply({
     embeds: [embed],
     components: [row]
   })
   
  const filter = i => i.customId === 'primary' && i.user.id === message.author.id;
  const collector = m.createMessageComponentCollector({ filter, time: 15000 });

  collector.on('collect', async i => {
	if (i.customId === 'primary') {
	 m.delete()
if (caiu == "Cima") {
  let ganhou = parseInt(aposta)+parseInt(1700);
  dbref.update({dinheiro: db.val().dinheiro + parseInt(ganhou)})
  return message.reply(`<:correto:858615705398018078>| Sua trade de sucesso rendeu um lucro de **R$${ganhou}**!`)
} else{
  let perdeu = parseInt(prc)+1700;
  dbref.update({dinheiro: db.val().dinheiro-parseInt(prc)})
  return message.reply(`<:erro:858615784771551252>| Sua trade falhou, e você teve um prejuízo de **R$${parseInt(prc)}**!`)
}
}
});
collector.on('end', collected => {
  return;
})
 
 
  const filter1 = i => i.customId === 'primary1' && i.user.id === message.author.id;
  const collector1 = m.createMessageComponentCollector({ filter: filter1, time: 15000 });

  collector1.on('collect', async i => {
	if (i.customId === 'primary1') {
	 m.delete()
  if (caiu == "Baixo") {
  let ganhou = parseInt(aposta)+parseInt(1700);
  dbref.update({dinheiro: db.val().dinheiro + parseInt(ganhou)})
  return message.reply(`<:correto:858615705398018078>| Sua trade de sucesso rendeu um lucro de **R$${ganhou}**!`)
} else{
  let perdeu = parseInt(prc)+1700;
  dbref.update({dinheiro: db.val().dinheiro-parseInt(prc)})
  return message.reply(`<:erro:858615784771551252>| Sua trade falhou, e você teve um prejuízo de **R$${parseInt(prc)}**!`)
}
}
});
collector.on('end', collected => {
  return;
})
   
 }
}
module.exports.conf = {
  aliases: ["trade"]
}