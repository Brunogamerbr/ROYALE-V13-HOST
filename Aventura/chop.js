const Discord = require("discord.js");
const ms = require("parse-ms")
exports.run = async (client, message, args, database, prefix) => {
message.channel.sendTyping()

let dbb = await client.db.get(`Economia_${message.author.id}`)    

if (dbb == null) {
return message.reply(`<:erro:858615784771551252>| Você não foi encontrado em minha Economia! entre nela utilizando \`.start\``)
}

let db = await client.db.get(`StartRPG_${message.author.id}`); 

if (db == null) {
message.reply(`**<:erro:858615784771551252>| Vocé aínda não iniciou sua jornada! Para começar uma nova aventura utilize \`${prefix}create-avatar\`**`)
return;
}

let db1 = await client.db.get(`InventarioRPG_${message.author.id}`);
if (db1.machado == null) db1.machado = 0;
if (db1.mach == null) db1.mach = 0;


if (db1.machado == 0) { message.reply(`**<:erro:858615784771551252>| Você ainda não possui um Machado! tente comprar um em nossa loja \`${prefix}shop\`**`)
return;
}
	
let timeout = 600000;
if (db1.chop_delay == null) db1.chop_delay = 0;

if (db1.chop_delay - (Date.now() - timeout) > 0) {
let tempo = ms(db1.chop_delay - (Date.now() - timeout));
return message.reply(`<:erro:858615784771551252> Esperê ${tempo.minutes}m ${tempo.seconds}s Para lenhar novamente!`);
}

if (db1.mach == 5) {
message.reply(`Seu machado quebrou! Se você não possuir outro compre um novo machado na loja utilizando \`${prefix}shop\``)
await client.db.set(`InventarioRPG/${message.author.id}`, {mach: 0})
await client.db.set(`InventarioRPG/${message.author.id}`, {machado: db1.machado - 1})
return;
}
	
let db1m = await client.db.get(`InventarioRPG_${message.author.id}_maçã`);

if (db1.madeira == null) db1.madeira = 0;
    
let ma = ['0', '0', '1', '0', '0', '1']

let made = ['0','2','0','0','3','0','1','1','2']

let caiu = ma[Math.floor(Math.random() * ma.length)]

let caiu1 = made[Math.floor(Math.random() * made.length)]

message.reply(`Você lenhou **${caiu1}** <:madera:918422650198564917> Madeiras e caíram ${caiu} 🍎 maçãs`)
await client.db.set(`InventarioRPG_${message.author.id}`, {maçã: parseInt(db1m) + parseInt(caiu)})
await client.db.set(`InventarioRPG_${message.author.id}`, {madeira: parseInt(db1.madeira) + parseInt(caiu1)});
await client.db.set(`InventarioRPG_${message.author.id}`, {chop_delay: Date.now()})
await client.db.set(`InventarioRPG/${message.author.id}`, {mach: db1.mach + 1})
}