const Discord = require("discord.js")
module.exports.run = async (client, message, args, database, prefix) => {

let servi = message.guild.id
let db = await database.ref(`Canais/${message.guild.id}`).once('value')
let dbref = database.ref(`Canais/${message.guild.id}`);
  
 if(db.val() == null) {
message.reply(`Esse servidor não possuí um canal de sugestões configurado!`)
return;
}

let canal2 = message.guild.channels.cache.get(`${db.val().canal}`)
        let ferinha_author = message.author;
        let ferinha_author_tag = message.author.tag;
        let ferinha_author_avatar = message.author.avatarURL({ dynamic: true, format: "png", size: 1024 });
        let ferinha_sugest = args.join(" ");
        let ferinha_args0 = args[0];
        let ferinha_err_sem_msg = "Escreva sua sugestão após o comando.";
        
       if (!ferinha_args0) return message.channel.send(`:x: | ${ferinha_author} ${ferinha_err_sem_msg}`)
        let ferinha_msg_boa = `**☑️ | ${ferinha_author} Sua sugestão foi enviada para <#${db.val().canal}> com sucesso.**`;
  message.delete()

        message.channel.send({embeds: [ferinha_msg_boa]})
        let ferinha_msg_embed = new Discord.MessageEmbed()
        .setColor("#0D02FA")
     .setTitle(`**❕SUGESTÃO**`)  
     
        .setDescription(`**Autor: **${message.author}\n${ferinha_sugest}`)
.setFooter(`Use ${prefix}sugest (sua sugestão)`)
       
  canal2.send({embeds: [ferinha_msg_embed]}).then(msg => {
            let ferinha_emoji_positivo = "☑️";
            let ferinha_emoji_negaivo = "❌";
            msg.react(ferinha_emoji_positivo)
            msg.react(ferinha_emoji_negaivo)
        })

    }
