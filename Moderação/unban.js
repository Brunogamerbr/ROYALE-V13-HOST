const Discord = require('discord.js')



exports.run = async (client, message, args, database) => {

  

 if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:x: | ${message.author} Você precisa da permissão **BANIR MEMBROS** para utilizar este comando!`);       
        let usu = args[0];

         if (!usu) return message.inlineReply(`**<:erro:858615784771551252> | ${message.author} Utilize o ID de alguém para desbanir!**`);

        message.guild.members.unban(usu);

        message.channel.send(`✅ | ${message.author}, o usuário <@${usu}> (\`${usu}\`) foi desbanido com sucesso!`)
    }
