const Discord = require('discord.js');

exports.run = async (client, message, args, database) => {

  
      

        let user = message.mentions.members.first() 
        const perms = ["MANAGE_ROLES" || "ADMINSTRATOR"];
        var doggo = message.guild.members.cache.get(client.user.id);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`-`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if(!message.member.hasPermission(perms)) 
        return message.inlineReply(`**❌| Você não tem permissão tente pedir a um Admin por que você não tem permissão de ** **\`MANAGE_ROLES\`** ou **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        
        if(!doggo.hasPermission(perms))
        return message.inlineReply(`**❌| Eu não tenho permissão de dar cargo então me dê permissão de ** **\`MANAGE_ROLES\`** ou **\`ADMINSTRATOR\`** !`)

        if (!user)
        return message.inlineReply(`**❌| Por Favor diga a pessoa que você quer dar o cargo!!** **\`.addcargo [Usuário] [Menção do Cargo ou ID do Cargo]\`**`)

        if (!role)
        return message.inlineReply(`**❌| Mencione um cargo ou um ID válido de um cargo!**`);

        else if (user.roles.cache.has(role.id))
        return message.inlineReply(`**❌| O Usuário ja tem esse Cargo**`);

        else {
            try {

                await user.roles.add(role);

                const embed = new Discord.MessageEmbed()
                .setTitle('**Cargo Adicionado!!**')
                .setColor('#0D02FA')
                .setDescription(` ✅| ${role} foi dado com sucesso para <@${user.id}>
               `)
                
                .addField('Dado por:', `<@${message.member.id}>`, true)
                .addField('Para:', `<@${user.id}>`, true)
                .addField('Cargo:', `${role}`, true)
                .addField('Motivo:', reason)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);

                await message.channel.send(embed);
      
            } catch (err) {
            return message.inlineReply(`**❌| A posição do cargo é Superior ao Meu Cargo**`, err.message);
            }
        }
    
    }      
        

exports.conf = {
  aliases: ["giverole", "addcargo", ]
}