const Discord = require("discord.js");
const request = require('request');


module.exports.conf = {
  aliases: ["bunnie"]
}


module.exports.run = async function(client, message, args, database) {
  let user = message.mentions.users.first();

  request.get('https://api.bunnies.io/v2/loop/random/?media=gif', async (error, resp, body)  => {
    if(error) return;
    body = JSON.parse(body)

    let embed = new Discord.MessageEmbed()
      .setImage(body.media.gif)
      .setColor("#0D02FA")
      .setDescription(`${message.author} Aqui está seu coelho`)
      .setURL(body.media.gif)
    message.channel.send(embed);
  });
}

