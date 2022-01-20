const Discord = require("discord.js");
module.exports = async(client, message, database, prefix) => {

  let dbE = await client.db.get(`Economia/${message.author.id}`)
  let dbN = await client.db.get(`Nivel/${message.author.id}`)
  if(dbN == null) {
  client.db.set(`Nivel/${message.author.id}`, {xp: 0}, {nivel: 1}); 
  } else {
      
  client.db.set(`Nivel/${message.author.id}`, {xp: dbN.xp + Math.floor(Math.random() * (15 - 3)) + 3});
if(dbN.level * 340 <= dbN.xp) {
           
  client.db.set(`Nivel/${message.author.id}`, {xp: 0}, {nivel: dbN.nivel + 1});
}}


let db = await client.db.get(`StartRPG/${message.author.id}`)
let db1 = await client.db.get(`InventarioRPG/${message.author.id}`)
if (db == null) return;
if (db.hp == null) db.hp = 8;
if (db.hp <0 || db.hp == 0){
return message.reply(`${message.author} Você acabou perdendo todos os corações de **HP** você morreu... mas tente iníciar uma nova jornada!`)
await client.db.remove(`StartRPG/${message.author.id}`)
await client.db.remove(`InventarioRPG/${message.author.id}`)	
await client.db.set(`StartRPG/${message.author.id}`)
}
}
