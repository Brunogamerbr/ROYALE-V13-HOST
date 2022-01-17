const Discord = require("discord.js")
module.exports.run = async (client, message, args, database, prefix) => {
let pingu = await message.reply(`🏓 Pong!`);
pingu.edit(`<:network:932433659502403624> Ping do servidor: **\`${pingu.createdTimestamp -
      message.createdTimestamp}ms\`**\n<:config:932433956710776914> Ping da API **\`${Math.round(
      client.ws.ping)}ms\`**`);
}
