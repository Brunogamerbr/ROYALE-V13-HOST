const Discord = require("discord.js");
exports.run = async (client, message, args, database, prefix) => {

let start = await client.db.get(`StartRPG/${message.author.id}`);

if (start == null) {
return message.reply(`<:erro:858615784771551252>| Você ainda não criou seu avatar! Para criar utilize \`${prefix}create-avatar\``);
}

if (args[0] == 'lootbox' || args[0] == 'Lootbox'){
let db = await client.db.get(`Economia/${message.author.id}`)
let xp = await client.db.get(`Nivel/${message.author.id}`)


let din = Math.floor(Math.random() * 800) + 200;  
let exp = Math.floor(Math.random() * 80) + 20;  

let cara1 = ['3','2','1']
let caiu1 = cara1[Math.floor(Math.random() * cara1.length)]

let cara2 = ['3','2','1']
let caiu2 = cara2[Math.floor(Math.random() * cara2.length)]

let cara3 = ['1','0','1','1','0','0']
let caiu3 = cara3[Math.floor(Math.random() * cara3.length)]

	
let caixa = await client.db.get(`InventarioRPG/${message.author.id}`);
if (caixa.lootbox == null) caixa.lootbox = 0;
if (caixa.lootbox == 0){
return message.reply(`<:erro:858615784771551252>| Você não possuí nenhuma **<:bau:925656155055865887> lootbox** no momento! compre uma na loja utilizando o comando **\`${prefix}shop\`**`);
}else{
message.reply(`Você abriu uma **<:bau:925656155055865887> Lootbox**, dentro dela havia:\n\n**${caiu1} 🍎 maçãs**, **${caiu2} <:madera:918422650198564917> madeiras**, **${caiu3} <:poocura:918402681645723660> poções de cura**, **R$${din}** e **${exp} de XP**`);

await client.db.set(`InventarioRPG/${message.author.id}`, {maçã: caixa.maçã + parseInt(caiu1)})
  
await client.db.set(`InventarioRPG/${message.author.id}`, {madeira: caixa.madeira + parseInt(caiu2)})
  
await client.db.set(`InventarioRPG/${message.author.id}`, {poção_de_cura: caixa.poção_de_cura + parseInt(caiu3)})

  
await client.db.set(`Economia/${message.author.id}`, {dinheiro: db.dinheiro + parseInt(din)})
  
await client.db.set(`Economia/${message.author.id}`, {dinheiro: db.dinheiro + parseInt(din)})
  
await client.db.set(`Nivel/${message.author.id}`, {xp: xp.xp + parseInt(exp)})
  
await client.db.set(`InventarioRPG/${message.author.id}`, {lootbox: caixa.lootbox - parseInt(1)})
}
}
}