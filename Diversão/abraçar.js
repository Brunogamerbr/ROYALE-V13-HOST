const Discord = require("discord.js");
const request = require('request');
module.exports.run = async (client, message, args, database) => {
  const user = message.mentions.users.first();
  if(!user) return message.channel.send(`<:erro:858615784771551252>| Mencione alguém para abraçar!`);
  request.get('https://nekos.life/api/v2/img/hug', async (error, resp, body)  => {
    if(error) return;
    body = JSON.parse(body)
  const embed = new Discord.MessageEmbed()
      .setImage(body.url)
      .setColor("#0D02FA")
      .setDescription(`${message.author} Abraçou ${user}`)
      .setURL(body.url)
    const msg = await message.channel.send({embeds: [embed]});
  })
  const filter = (reaction, user) => {
	return reaction.emoji.name === '💻' && user.id};
  const collector = msg.createReactionCollector({ filter, time: 15000 });
collector.on('collect', (reaction, user) => {
  request.get('https://nekos.life/api/v2/img/hug', async (error, resp, body)  => {
    if(error) return;
    body = JSON.parse(body)
  let embed = new Discord.MessageEmbed()
            .setImage(body.url)
            .setColor("#0D02FA")
            .setDescription(`${user} Abraçou ${message.author} também`)
            .setURL(body.url)
          message.channel.send({embeds: [embed]});
})
})
}
module.exports.conf = {
  aliases: ["hug", "abraçar", "abracar"]
}
