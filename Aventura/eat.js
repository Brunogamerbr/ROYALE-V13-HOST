const Discord = require("discord.js");
exports.run = async (client, message, args, database, prefix) => {

let db = await client.db.get(`InventarioRPG_${message.author.id}`)
let start = await client.db.get(`StartRPG_${message.author.id}`)

if (start == null) {
return message.reply(`<:erro:858615784771551252>| Você ainda não criou seu avatar! crie um usando \`${prefix}create-avatar\``)
}
  
let tanto = parseInt(args[1])
let limite = 3;
if (args[0] == 'maçã') {
if (start.hp >= 8) {
return message.reply(`<:erro:858615784771551252>| Sua vida está cheia!`)
}

if (!tanto) {
return message.reply(`<:erro:858615784771551252>| Você precisa colocar a quantidade de maçãs que deseja comer!`)
}

if (tanto > 3) {
message.reply(`<:erro:858615784771551252>| Você só pode comer até ${limite} maçãs`)
return;
}
    
if (db.maçã < parseInt(tanto)) {
message.reply(`<:erro:858615784771551252>| Você não possui essa quantidade de maçãs!`)
return;
}

let vida = parseInt(args[1]) + 1; client.db.set(`StartRPG_${message.author.id}`, { hp: start.hp + parseInt(vida) });

    if (vida == 2) vida = '❤️❤️';
    if (vida == 3) vida = '❤️❤️❤️';
    if (vida == 4) vida = '❤️❤️❤️❤️';

message.reply(`Você comeu ${args[1]} maçãs e recuperou ${vida} de vida!`)
client.db.set(`InventarioRPG_${message.author.id}`, { maçã: db.maçã - parseInt(args[1]) })
return;
}


if (args[0] == 'sopa') {

if (start.hp >= 8) {
return message.reply(`<:erro:858615784771551252>| Sua vida está cheia!`)
}

if (!tanto) {
return message.reply(`<:erro:858615784771551252>| Você precisa colocar a quantidade de sopas que deseja comer!`)
}

if (tanto > 3) {
message.reply(`<:erro:858615784771551252>| Você só pode comer até ${limite} sopas`)
return;
}
    
if (db.sopa < parseInt(tanto)) {
message.reply(`<:erro:858615784771551252>| Você não possui essa quantidade de sopas!`)
return;
}
let vida = parseInt(args[1]) + 2;

await client.db.set(`StartRPG_${message.author.id}`, { hp: start.hp + parseInt(vida) });
    if (vida == 3) vida = '❤️❤️❤️'
    if (vida == 4) vida = '❤️❤️❤️❤️'
    if (vida == 5) vida = '❤️❤️❤️❤️❤️';

message.reply(`Você comeu ${args[1]} sopas e recuperou ${vida} de vida!`)
await client.db.set(`InventarioRPG_${message.author.id}`, { sopa: db.sopa - parseInt(args[1]) })
}
}
