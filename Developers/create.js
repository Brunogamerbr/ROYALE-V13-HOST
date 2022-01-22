const Discord = require("discord.js")
const config = require("../config.json");
module.exports.run = async (client, message, args, database) => {
  if(!config.owners.includes(message.author.id)) return;
  let server = client.guilds.cache.get(args[0]);
  if(!server) return message.reply("Ei, Servidor inválido!");
  let chx = server.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
  let invite = await chx.createInvite({
    maxAge: 0,
    maxUses: 0
  });
  message.channel.send(`${invite}`);
}