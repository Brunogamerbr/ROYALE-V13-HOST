const Discord = require("discord.js");
const request = require('request');

module.exports.conf = {
  aliases: ["bird", "passarinho"]
}



module.exports.run = async function(client, message, args, database) {
  let user = message.mentions.users.first();

  request.get('https://shibe.online/api/birds?count=1&urls=true&httpUrls=true', async (error, resp, body)  => {
    if(error) return;
    body = JSON.parse(body)
    let embed = new Discord.MessageEmbed()
      .setImage(body[0])
      .setColor("#0D02FA")
      .setDescription(`${message.author} Aqui está seu passarinho`)
      .setURL(body[0])
    message.channel.send(embed);
  });
}

