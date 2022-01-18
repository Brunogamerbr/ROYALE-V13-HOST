const Discord = require("discord.js");
module.exports.run = async (client, message, args, database, prefix) => {
let db = await client.db.get(`StartRPG/${message.author.id}`)
   
if (db !== null) {
return;
}
	
let db1 = await client.db.get(`InventarioRPG/${message.author.id}`)
  
let nome = args[0];
let idade = parseInt(args[1]);
let sexo = args[2];    
let abl = ['Ninja', 'Pescador', 'Arqueiro', 'Lenhador', 'Caçador']

if (!nome && !idade && !sexo) {	message.reply(`<:erro:858615784771551252>| Para criar seu avatar utilize o comando dessa forma: \`${prefix}create-avatar [nome] [idade] [genero use m ou f]\``)
return;
}
    
let ablb = abl[Math.floor(Math.random() * abl.length)]
    
    
if (!nome) {
return message.reply(`<:erro:858615784771551252> Nome inválido!`)
}
if (!idade) {
return message.reply(`<:erro:858615784771551252> Idade invalida!`)
}
if (!sexo) {
return message.reply(`<:erro:858615784771551252> Gênero inválido! use "m" para masculino e "f" para feminino`)
}
	
if (sexo == 'm') sexo = 'Masculino';
if (sexo == 'f') sexo = 'Feminino';
if (sexo == 'M') sexo = 'Masculino';
if (sexo == 'F') sexo = 'Feminino';
	
await client.db.set(`StartRPG_${message.author.id}`, {nome: nome}); 
	
await client.db.set(`StartRPG_${message.author.id}`, {idade: parseInt(idade)}); 
	
await client.db.set(`StartRPG_${message.author.id}`, {genero: sexo}); 
	
await client.db.set(`StartRPG_${message.author.id}`, {habilidade: ablb}); 
	
await client.db.set(`StartRPG_${message.author.id}`, {hp: 8}); 
    
message.reply(`${message.author} Seu avatar foi criado com sucesso! para vizualiza-lo utilize \`${prefix}av\``);
    
await client.db.set(`InventarioRPG_${message.author.id}`,{maçã: 0})
    
}