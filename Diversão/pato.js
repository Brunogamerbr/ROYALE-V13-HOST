const Discord = require("discord.js");
const request = require('request');


module.exports.conf = {
  aliases: ["duck"]
}


module.exports.run = async function(client, message, args, database) {
  let user = message.mentions.users.first();

  request.get('https://random-d.uk/api/v1/random', async (error, resp, body)  => {
    if(error) return;
    body = JSON.parse(body)
    let embed = new Discord.MessageEmbed()
      .setImage(body.url)
      .setColor("#0D02FA")
      .setDescription(`${message.author} Aqui está seu patinho`)
      .setURL(body.url)
    message.channel.send(embed);
  });
}

