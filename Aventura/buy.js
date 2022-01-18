const Discord = require("discord.js");
exports.run = async (client, message, args, database, prefix) => {

let dbb = await client.db.get(`Economia_${message.author.id}`)    

if (dbb == null) {
return message.reply(`<:erro:858615784771551252>| Você não foi encontrado em minha Economia! entre nela utilizando \`.start\``)
}
	
let db = await client.db.get(`InventarioRPG_${message.author.id}`)

let db1 = await client.db.get(`StartRPG_${message.author.id}`)
if (db1 == null) { return message.reply(`<:erro:858615784771551252>| Antes de comprar qualquer coisa, você deve criar seu avatar \`${prefix}create-avatar\``)
}    

  
if (args[0] == 'machado') {
if (dbb.dinheiro <10000){ return message.reply(`<:erro:858615784771551252>| Você não tem saldo na Carteira suficiente!`)
}
  
message.reply(`Vocé comprou 1 machado no valor de R$10000`)
client.db.set(`Economia_${message.author.id}`, {dinheiro: dbb.dinheiro - 10000} )    
if (db.machado == null) db.machado = 0;
client.db.set(`InventarioRPG_${message.author.id}`, {machado: db.machado + 1})}
        
    
if (args[0] == 'katana') {
if (dbb.dinheiro <10000){ return message.reply(`<:erro:858615784771551252>| Você não tem saldo na Carteira suficiente!`)
}    
message.reply(`Você comprou **1** katana no valor de **R$10000**`)
    
client.db.set(`Economia_${message.author.id}`, {dinheiro: dbb.dinheiro - 10000} )    
if (db.katana == null) db.katana = 0;
client.db.set(`InventarioRPG_${message.author.id}`, {katana: db.katana + 1})}
    
        
if (args[0] == 'sopa') {
if (dbb.dinheiro <5000){ return message.reply(`<:erro:858615784771551252>| Você não tem saldo na carteira suficiente!`)
}
  
client.db.set(`Economia_${message.author.id}`, {dinheiro: dbb.dinheiro - 5000} )    
if (db.sopa == null) db.sopa = 0;
client.db.set(`InventarioRPG_${message.author.id}`, {sopa: db.sopa + 1})
message.reply(`Você comprou 1 sopa no valor de R$5000`)
}
    
    
if (args[0] == 'gogumelo') {
if (dbb.dinheiro <5000){ return message.reply(`<:erro:858615784771551252>| Você não tem saldo na carteira suficiente!`)
}
client.db.set(`Economia_${message.author.id}`, {dinheiro: dbb.dinheiro - 5000} )    
if (db.gogumelo == null) db.gogumelo = 0;
client.db.set(`InventarioRPG_${message.author.id}`, {gogumelo: db.gogumelo + 1})
message.reply(`Você comprou 1 gogumelo no valor de R$5000`)
}
    
    
if (args[0] == 'poção-xp') {
if (dbb.dinheiro <50000){ return message.reply(`<:erro:858615784771551252>| Você não tem saldo na carteira suficiente!`)
}
client.db.set(`Economia_${message.author.id}`, {dinheiro: dbb.dinheiro - 50000} )    
if (db.poção_de_xp == null) db.poção_de_xp = 0;
client.db.set(`InventarioRPG_${message.author.id}`, {poção_de_xp: db.poção_de_xp + 1})
message.reply(`Você comprou 1 poção de xp no valor de R$50000`)
}
    
    
if (args[0] == 'poção-cura') {
if (dbb.dinheiro <10000){ return message.reply(`<:erro:858615784771551252>| Você não tem saldo na carteira suficiente!`)
}
client.db.set(`Economia_${message.author.id}`, {dinheiro: dbb.dinheiro - 10000} )    
if (db.poção_de_cura == null) db.poção_de_cura = 0;
client.db.set(`InventarioRPG_${message.author.id}`, {poção_de_cura: db.poção_de_cura + 1})
message.reply(`Você comprou 1 poção de cura no valor de R$10000`)
}

if (args[0] == 'lootbox') {
if (dbb.dinheiro <1000){ return message.reply(`<:erro:858615784771551252>| Você não tem saldo na carteira suficiente!`)
}
client.db.set(`Economia_${message.author.id}`, {dinheiro: dbb.dinheiro - 1000} )    
if (db.lootbox == null) db.lootbox = 0;
client.db.set(`InventarioRPG_${message.author.id}`, {lootbox: db.lootbox + 1})
message.reply(`Você comprou **1 lootbox** no valor de **R$1000**, para abrir a lootbox utilize \`${prefix}open lootbox\``)
}


if (args[0] == 'bussola' || args[0] == 'Bussola') {
if (dbb.dinheiro <5000){ return message.reply(`<:erro:858615784771551252>| Você não tem saldo na carteira suficiente!`)
}
await client.db.set(`Economia_${message.author.id}`, {dinheiro: dbb.dinheiro - 5000} )    
if (db.bussola == null) db.bussola = 0;
await client.db.set(`InventarioRPG_${message.author.id}`, {bussola: db.bussola + 1})
message.reply(`Você comprou **1 bússola** no valor de **R$5000**`)
}
}