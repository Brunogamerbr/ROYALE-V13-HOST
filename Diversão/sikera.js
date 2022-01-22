const Discord = require("discord.js");

exports.run = async (client, message, args, database) => {


var doggo = message.guild.members.cache.get(client.user.id);

if(!doggo.hasPermission('MANAGE_WEBHOOKS'))
return message.inlineReply(`**❌| Estou sem permissão de criar webhook nesse servidor** !`)


	
 try {
 let name = ('Sikera Junior');

 let avatar = {avatar: 'https://i.imgur.com/jo3jF7l.jpg'}

 let batatinha = [
    'CPF cancelado!',
    'Queima ou não queima?',
    'Vou te pegar!',
    'The maconha dead!',
    'Ele tomou?.... NA JACA!!...... no olho da jaca!',
    'Tem certeza? vai se apaixonar!',
    'Hmmmmmm, tu queima né?',
    'Tu fumo hoje né?',
    'The maconha dead!',
    'Acunha Renato!',
    'Soletrando comm...',
    'Hummm, to sabendo',

];
let arg = batatinha[Math.floor(Math.random() * batatinha.length)]

 message.channel.createWebhook(name, avatar).then(w => { 
 w.send(arg).then((
 ) => w.delete())

 });

 } catch (err) {
 message.reply('**Poxa ele ta dormindo agora :/**')
 }


}