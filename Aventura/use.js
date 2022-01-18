const Discord = require("discord.js");

exports.run = async (client, message, args, database, prefix) => {

let db = await client.db.get(`InventarioRPG/${message.author.id}`);

const dbn = await client.db.get(`Nivel_${message.author.id}`)

const dbnref = database.ref(`Nivel/${message.author.id}`)


let dbs = await client.db.get(`StartRPG/${message.author.id}`);

if (dbs == null) {
return message.reply(`<:erro:858615784771551252>| Parece que você ainda não criou seu avatar, utilize \`${prefix}create-avatar\``)
}
  
let limite = 3;

if(!args[0] || !['poção-xp', 'potion-xp', 'potion-cura', 'poção-cura'].includes(args[0].toLowerCase())) return message.reply("Informe entre `poção-cura` ou `poção-xp` para utilizar")

let quantia = parseInt(args[1])

  /*========= POÇÃO DE XP =======*/


if (['poção xp', 'potion exp', 'poção-xp', 'potion-xp'].includes(args[0].toLowerCase())) {

if (!quantia) {
return message.reply(`<:erro:858615784771551252>| Você precisa dizer a quantia de <:xxp:918402912928010292> poções de xp que deseja usar!`)
}

if (quantia > limite) {
return message.reply(`<:erro:858615784771551252>| Você só pode usar até ${limite} <:xxp:918402912928010292> poções de xp!`)
}
if (db.poção_de_xp == null) db.poção_de_xp = 0;
if (db.poção_de_xp < parseInt(quantia)) {
return message.reply(`<:erro:858615784771551252>| Você não possui essa quantidade de <:xxp:918402912928010292> poções de xp!`)
}

let xpWinned = parseInt(quantia * 5000)

message.reply(`Voce usou **${args[1]}** <:xxp:918402912928010292> poções de xp e ganhou **${parseInt(quantia * 5000)}** de xp!`)

await client.db.set(`InventarioRPG_${message.author.id}`, { poção_de_xp: db.poção_de_xp - parseInt(args[1]) })
client.db.set(`Nivel_${message.author.id}`, { xp: dbn.xp + xpWinned })
}



  /*========= POÇÃO DE CURA =======*/

if (['potion-cura', 'poção-cura'].includes(args[0].toLowerCase())) {

if (!parseInt(quantia)) {
return message.reply(`<:erro:858615784771551252>| Você precisa dizer a quantia de <:poocura:918402681645723660> poções de cura que deseja usar!`)
}

if (parseInt(quantia) > parseInt(limite)) {
return message.reply(`<:erro:858615784771551252>| Você só pode usar até ${limite} <:poocura:918402681645723660> poções de cura`)
}

if (db.poção_de_cura < parseInt(quantia)) {
return message.reply(`<:erro:858615784771551252>| Você não possui essa quantidade de  <:poocura:918402681645723660> poções de cura!`)
}
    if (quantia == '1') quantia = '❤️❤️';
    if (quantia == '2') quantia = '❤️❤️❤️';
    if (quantia == '3') quantia = '❤️❤️❤️❤️';

message.reply(`Voce usou **${args[1]}** <:poocura:918402681645723660> poções de cura e ganhou **${quantia}** de vida!`)
await client.db.set(`InventarioRPG/${message.author.id}`, { poção_de_cura: db.poção_de_cura - parseInt(args[1]) })

await client.db.set(`StartRPG/${message.author.id}`, { hp: dbs.hp + parseInt(args[1]) + parseInt(1) })
}
}