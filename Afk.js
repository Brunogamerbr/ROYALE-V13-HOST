const Discord = require("discord.js")
const db = require("quick.db")
module.exports = async(client, message, database, prefix) => {
  let afk = new db.table("AFKs"),
  authorStatus = await afk.fetch(message.author.id),
  mentioned = message.mentions.users.first();
  if (mentioned && !authorStatus) {
  let status = await afk.fetch(mentioned.id);
  if (status) {
  message.channel.send(`O Usúario **${mentioned.tag}** está AFK!\nMotivo: **\` ${status} \`**`)}}
  if (authorStatus) {   
  message.channel.send(`${message.author.tag} você não está está mais AFK.`);
  afk.delete(message.author.id)
}
}
