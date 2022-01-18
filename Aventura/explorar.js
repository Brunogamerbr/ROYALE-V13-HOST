const Discord = require("discord.js");
const ms = require("parse-ms");
exports.run = async (client, message, args, database, prefix) => {

let start = client.db.get(`StartRPG/${message.author.id}`);
if (start == null) {
return message.reply(`<:erro:858615784771551252>| Parecê que você ainda não criou seu avatar! crie ele utilizando o comando \`${prefix}create-avatar\``);
}

let db = await client.db.get(`InventarioRPG/${message.author.id}`);
let dbu = await client.db.get(`InventarioRPG/${message.author.id}/buss`);
  
if (dbu == null)  dbu = 0;
if(db.bussola == null) db.bussola = 0;
	
if (db.bussola == 0){
return message.reply(`<:erro:858615784771551252>| Você não possui uma bússola! compre um na loja utilizando \`${prefix}shop\``)
}

if (dbu == 5) {
message.reply(`Sua bussola quebrou! Se você não possuir outra tente comprar uma na loja utilizando \`${prefix}shop\``)
client.db.set(`InventarioRPG/${message.author.id}`, {buss: 0})
client.db.set(`InventarioRPG/${message.author.id}`, {bussola: db.bussola - 1})
return;
}

let timeout = 900000;
let db1 = await client.db.get(`Economia/${message.author.id}`)
let db3 = await client.db.get(`Nivel/${message.author.id}`)
	
if(db.explorer_delay - (Date.now() - timeout) > 0) {
let tempo = ms(db.explorer_delay - (Date.now() - timeout));
return message.reply(`<:erro:858615784771551252> Espere **${tempo.minutes}m ${tempo.seconds}s** Para explorar novamente!`);
}

if (db.buss == 5) {
await client.db.set(`InventarioRPG/${message.author.id}`, {buss: 0})
await client.db.set(`InventarioRPG/${message.author.id}`, {bussola: 0})
return;}

let mapa = ['Montanha albina', 'Floresta assombrada', 'Ilha no deserto', 'Fazenda']

let lugar = mapa[Math.floor(Math.random() * mapa.length)]
let din = Math.floor(Math.random() * 800) + 200;
let xp = Math.floor(Math.random() * 80) + 20;

message.reply(`<:bussola:925691597323116554> Você explorou uma **${lugar}**, no meio do caminho você encontrou **R$${din}** + **${xp}** de XP`)
await client.db.set(`Economia/${message.author.id}`, {dinheiro: db1.dinheiro + parseInt(din)})
await client.db.set(`InventarioRPG/${message.author.id}`, {explorer_delay: Date.now()})
await client.db.set(`Nivel/${message.author.id}`, {xp: db3.xp + parseInt(xp)})
await client.db.set(`InventarioRPG/${message.author.id}`, {buss: db.buss + 1})
}