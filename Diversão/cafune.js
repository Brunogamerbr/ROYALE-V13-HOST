const Discord = require("discord.js");
const request = require('request');


module.exports.conf = {
  aliases: ["pat", "cafuné", "headpat"]
}


module.exports.run = async function(client, message, args, database) {
  let user = message.mentions.users.first();
  if(!user) return message.channel.send(`:x: **| Mencione alguém para fazer um cafuné.**`);

  request.get('https://nekos.life/api/v2/img/pat', async (error, resp, body)  => {
    if(error) return;
    body = JSON.parse(body)
    let embed = new Discord.MessageEmbed()
      .setImage(body.url)
      .setColor("#0D02FA")
      .setDescription(`${message.author} Fez Cafuné em ${user}`)
      .setURL(body.url)
    let msg = await message.channel.send(embed);
    start(msg);
  });


  async function start(msg) {
    await msg.react("🔄");
    let c1 = msg.createReactionCollector((r, u) => u.id === user.id, {time: 60000});

    c1.on("collect", (reaction, user) => {
      if(reaction.emoji.name === "🔄") {
        c1.stop();
        request.get('https://nekos.life/api/v2/img/pat', async (error, resp, body)  => {
          if(error) return;
          body = JSON.parse(body)
          let embed = new Discord.MessageEmbed()
            .setImage(body.url)
            .setColor("#0D02FA")
            .setDescription(`${user} Retribuiu o cafuné de ${message.author}`)
            .setURL(body.url)
          message.channel.send(embed);
        });
      }
    })
  }
}

