const Discord = require("discord.js");
const request = require('request');


exports.run = async (client, message, args, database) => {
  let user = message.mentions.users.first();
  let user2 = message.mentions.users.last();
  if(!user || !user2) return message.channel.send(`:x: **| Mencione 2 pessoas para shippar.**`);

  request.get('https://nekos.life/api/v2/img/kiss', async (error, resp, body)  => {
 body = JSON.parse(body)
    let embed = new Discord.MessageEmbed()
      .setImage(body.url)
      .setColor("#0D02FA")
      .setDescription(`${user} Tem ${Math.floor(Math.random() * 100)}% de chance de ficar com ${user2}`)
      .setURL(body.url)
    
    message.channel.send(embed)
  });
}

