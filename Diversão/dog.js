const Discord = require("discord.js");
const request = require('request');

module.exports.conf = {
  aliases: ["cão", "cachorro"]
}



module.exports.run = async function(client, message, args, database) {
  let user = message.mentions.users.first();

  request.get('https://dog.ceo/api/breeds/image/random', async (error, resp, body)  => {
    if(error) return;
    body = JSON.parse(body)
    let embed = new Discord.MessageEmbed()
      .setImage(body.message)
      .setColor("#0D02FA")
      .setDescription(`${message.author} Aqui está seu doguinho`)
      .setURL(body.message)
    message.channel.send(embed);
  });
}

