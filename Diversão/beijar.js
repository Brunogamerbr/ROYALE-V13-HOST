const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args, database) => {

   var list = [
     'https://i.imgur.com/sGVgr74.gif',
     'https://i.imgur.com/8LKPbOf.gif',
     'https://i.imgur.com/TItLfqh.gif',
     'https://i.imgur.com/wQjUdnZ.gif',
     'https://i.imgur.com/lmY5soG.gif',
     'https://i.imgur.com/YbNv10F.gif',
     'https://i.imgur.com/KLVAl0T.gif',
     'https://i.imgur.com/IgGumrf.gif',
     'https://i.imgur.com/KKAMPju.gif',
     'https://i.imgur.com/e0ep0v3.gif'
]
    var list1 = [
     'https://i.imgur.com/mNEHfJ0.gif',
     'https://i.imgur.com/0WWWvat.gif',
     'https://i.imgur.com/MGdlYsj.gif',
     'https://i.imgur.com/f86DzYb.gif',
     'https://i.imgur.com/4h7uBat.gif',
     'https://i.imgur.com/YOQgZqY.gif',
     'https://i.imgur.com/s3DggdT.gif',
     'https://i.imgur.com/KWM6eIB.gif',
     'https://i.imgur.com/709chb9.gif',
     'https://i.imgur.com/YkrEkbF.gif'
]
   var rand = list[Math.floor(Math.random() * list.length)]
   var rand1 = list1[Math.floor(Math.random() * list1.length)]
   let user = message.mentions.users.first()

    
    if(!user) {
        return message.inlineReply(`${message.author} você tem que mencionar um membro para beijar!`)
    }

   let avatar = message.author.displayAvatarURL({ format: 'png' })
   let avatar1 = user.displayAvatarURL({ format: 'png' })
   const embed = new Discord.MessageEmbed()
      .setColor('#0D02FA')
      
      .setDescription(`${message.author} beijou ${user}`)
      .setImage(rand)      
      .setFooter('Clique em 🔁 para retribuir!')
      

   const embed2 = new Discord.MessageEmbed()
      .setColor('#0D02FA')
      .setDescription(`${user} retribuiu o beijo de ${message.author}`)
      .setImage(rand1)
      
      .setFooter(`Beijo retribuido`)
.setTimestamp()

   message.inlineReply(embed).then(msg => {
      msg.react('🔁')
      msg.awaitReactions((reaction, user) => {
         if (message.mentions.users.first().id !== user.id) return

         if (reaction.emoji.name === '🔁') {
            return message.inlineReply(embed2)
         }
      })
   })
} 

exports.conf = {
  aliases: ["kiss",]
}