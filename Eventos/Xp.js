const Discord = require("discord.js");
module.exports = async(client, message, database) => {

let dbE = await client.db.get(`Economia/${message.author.id}`)
let dbN = await client.db.get(`Nivel/${message.author.id}`)
if(dbN == null) {
client.db.set(`Nivel/${message.author.id}`, {xp: 0}, {nivel: 1});
  }else {
client.db.set(`Nivel/${message.author.id}`, {xp: dbN.xp + Math.floor(Math.random() * (15 - 3)) + 3});
if(dbN.level * 340 <= dbN.xp) {
client.db.set(`Nivel/${message.author.id}`, {xp: 0}, {nivel: dbN.nivel + 1});
}}
}
