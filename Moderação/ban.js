const Discord = require("discord.js");
const { MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow } = require("discord.js");
const { Permissions } = require("discord.js")
module.exports.run = async (client, message, args, database, prefix) => {
 try{
if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply(`<:erro:858615784771551252>| ${message.author} Você precisa da permissão BANIR MEMBROS para utilizar este comando!`);
var doggo = message.guild.members.cache.get(client.user.id);
if(!doggo.permissions.has(Permissions.FLAGS.BAN_MEMBERS)){
 return message.reply(`<:erro:858615784771551252>| Eu não tenho a permissão \`Banir membros\` nesse servidor!`)
}

let usu = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let reason = args.slice(1).join(" ");
if (!reason) reason = "Não definido";
if (!args[0]) return message.reply(`<:erro:858615784771551252>| ${message.author} Mencione alguém ou utilize o ID de alguém para banir!`);
if(!usu) return message.reply(`<:erro:858615784771551252>| ${message.author} Você não mencionou e nem utilizou um ID válido!`);
if(!usu.bannable) return message.reply(`<:erro:858615784771551252>| ${message.author} Ops! Eu não tenho permissão para banir este membro!`);

const button = new MessageButton()
	.setCustomId('primary')
	.setLabel('Banir')
	.setStyle('SUCCESS')
	
	const button1 = new MessageButton()
	button1.setCustomId('primary1')
	button1.setLabel('Cancelar')
	button1.setStyle(`DANGER`)
	
	
  const row = new MessageActionRow().addComponents([button], [button1])
  let msg = await message.reply({
  content: `Você realmente deseja realizar essa ação?`,
  components: [row]
})
  const filter = i => i.customId === 'primary' && i.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 90000 });

  collector.on('collect', async i => {
	if (i.customId === 'primary') {
 	
    let embed = new Discord.MessageEmbed()
    .setColor("#0D02FA")
   .setTitle(`**<:Legal:870733089083625502>|Banimento!**`)
   .setDescription(`**<:correto:858615705398018078> ${usu.user} foi banido com sucesso
  Motivo: \`${reason}\`
  banido Por: ${message.author.tag}**`)
   .setThumbnail('https://i.imgur.com/P0PyiAj.png')
  
   .setTimestamp()
   .setFooter(`Banimento realizado com sucesso`);
   await usu.ban({
   reason: reason
   }) 
  msg.delete()
  message.channel.send({embeds: [embed]})
	}
});
collector.on('end', collected => {
  return;
})
    const filter1 = i => i.customId === 'primary1' && i.user.id === message.author.id;
    const collector1 = msg.createMessageComponentCollector({ filter: filter1, time: 90000 });

    collector1.on('collect', async i => {
    if (i.customId === 'primary1') {
    message.delete()
    message.reply(`Cancelado com sucesso!`)
	}
});
collector1.on('end', collected => {
  return;
})
} catch(err){
  console.log(err)
}
}