const Discord = require("discord.js");
const request = require('request');
module.exports.conf = {
  aliases: ["cat", "gatinho"]
}

module.exports.run = async function(client, message, args, database) {
  let user = message.mentions.users.first();
  request.get('https://api.thecatapi.com/v1/images/search?mime_types=png&limit=1', async (error, resp, body)  => {
    if(error) return;
    body = JSON.parse(body)
    let embed = new Discord.MessageEmbed()
      .setImage(body[0].url)
      .setColor("#0D02FA")
      .setDescription(`${message.author} Aqui está seu gatinho`)
      .setURL(body[0].url)
    message.channel.send({embeds: [embed]});
  });
}
