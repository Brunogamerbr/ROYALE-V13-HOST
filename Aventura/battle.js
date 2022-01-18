const Discord = require("discord.js");
const ms = require("parse-ms");
exports.run = async (client, message, args, database, prefix) => {
  
let db = await client.db.get(`InventarioRPG_${message.author.id}`);    
  
let start = await client.db.get(`StartRPG_${message.author.id}`);

let dbd = await client.db.get(`Economia_${message.author.id}`);

if (start == null) {
return message.reply(`<:erro:858615784771551252>| Parece que você ainda não criou seu avatar, utilize \`${prefix}create-avatar\``)
}

if (db.battle_delay == null) db.battle_dalay = 0;
	
let timeout = 600000;

if(db.battle_delay - (Date.now() - timeout) > 0) {
let tempo = ms(db.battle_delay - (Date.now() - timeout));
return message.reply(`<:erro:858615784771551252> Espere **${tempo.minutes}m ${tempo.seconds}s** Para batalhar novamente!`);
}

if (db.katana == null) db.katana = 0;
if (db.kat == null) db.kat = 0;
if (db.katana == 0) {
message.reply(`<:erro:858615784771551252>| Para poder batalhar é nescessário uma **katana**! compre uma na loja RPG utilizando \`${prefix}shop\``)
return;
}
  
if (db.kat == 5) {
await client.db.set(`InventarioRPG/${message.author.id}`, {kat: 0})
await client.db.set(`InventarioRPG/${message.author.id}`, {katana: db.katana - 1})
message.reply(`Sua katana quebrou! Se você não possuir outra compre uma nova na loja utilizando \`${prefix}shop\``);
return;
}
  
  let din = Math.floor(Math.random() * 2000) + 500;  
  let hp = ['3','2','4']
  let vida = hp[Math.floor(Math.random() * hp.length)]
  let cara = ['1','2','1','1','2','4','1','1','2']
  let caiu = cara[Math.floor(Math.random() * cara.length)]
    
await client.db.set(`StartRPG_${message.author.id}`,{ hp: start.hp - vida});

await client.db.set(`Economia_${message.author.id}`,{ dinheiro: dbd.dinheiro + din});

await client.db.set(`InventarioRPG_${message.author.id}`, {kat: db.kat + parseInt(1)})
	
  if (vida == 8) vida = '❤️❤️❤️❤️❤️❤️❤️❤️';
  if (vida == 7) vida = '❤️❤️❤️❤️❤️❤️❤️';
  if (vida == 6) vida = '❤️❤️❤️❤️❤️❤️';
  if (vida == 5) vida = '❤️❤️❤️❤️❤️';
  if (vida == 4) vida = '❤️❤️❤️❤️';
  if (vida == 3) vida = '❤️❤️❤️';
  if (vida == 2) vida = '❤️❤️';
  if (vida == 1) vida = '❤️';
    
message.reply(`Você acaba de lutar e derrotar <:sla:918479562147516446> **${caiu}** Monstros... Você ganhou **R$${din}**, mas perdeu **${vida}** de Vida`);

await client.db.set(`InventarioRPG_${message.author.id}`, { battle_delay: Date.now() });
} 