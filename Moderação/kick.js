const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {

  if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply(`<:erro:858615784771551252> | ${message.author} Você precisa da permissão **EXPULSAR MEMBROS** para utilizar este comando!`)

        const usu = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "sem motivo";



        if (!args[0]) return message.reply(`<:erro:858615784771551252>| ${message.author} Menciona alguém ou utilize o ID de  alguém para expulsar!`);

        if(!usu) return message.reply(`<:erro:858615784771551252> | ${message.author} Você não mencionou e nem utilizou um ID válido!`);

        /*if(!usu.kickable) return message.reply(`<:erro:858615784771551252> | ${message.author} Ops! Eu não tenho permissão para expulsar este membro!`);*/

        const embed = new Discord.MessageEmbed()
        .setAuthor(usu.user.tag,usu.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(usu.user.displayAvatarURL())
        .setDescription(`**<:blacklisted:873563669559144448>| Expulso: ${usu.user}
<:file:873563451665055754>| Motivo: \`${reason}\`
<:firewall:873563469302091807>| Por: ${message.author}**`)
        .setColor("#0D02FA")
        .setTimestamp()
        .setFooter(usu.user.tag, usu.user.displayAvatarURL());

        
        /*await usu.kick({
            reason: reason
        });*/
        
        
        message.channel.send({embeds: [embed]});

    }



 