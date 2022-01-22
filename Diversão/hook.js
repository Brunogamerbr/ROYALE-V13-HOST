const Discord = require("discord.js");

exports.run = async (client, message, args, database) => {

let user = message.author.username
                          
 try {
 let name = (`${user}`);

 let avatar = {avatar: message.author.displayAvatarURL()}
 
let arg = args.join(' ')

 message.channel.createWebhook(name, avatar).then(w => { 
 w.send(arg).then((
 ) => w.delete())
   message.delete()

 });

 } catch (err) {
 message.reply('**Poxa ele ta dormindo agora :/**')
 }

  }