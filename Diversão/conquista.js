const Discord = require("discord.js");


module.exports.conf = {
  aliases: ["mcconquista", "achievement"]
}


module.exports.run = async function(client, message, args, database) {
  let [title, contents] = args.join(" ").split("|");
  if (!contents) [title, contents] = ["Conquista desbloqueada!", title];
  let rnd = Math.floor((Math.random() * 39) + 1);
  if (!args.join(" ")) return message.inlineReply(":x: **| Por favor insira uma conquista.**")
  if (title.length > 24 || contents.length > 22) return message.channel.send("Você inseriu mais de 22 caracteres.");

  let embed = new Discord.MessageEmbed()
    .setImage(`https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`)
    .setColor("#0D02FA")
      
  message.channel.send(embed).catch(err => {return})
}

