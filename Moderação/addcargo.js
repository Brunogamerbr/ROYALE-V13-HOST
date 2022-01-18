const Discord = require('discord.js');
const { Permissions } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {

        let user = message.mentions.members.first() 
        const perms = ["MANAGE_ROLES"];
        var doggo = message.guild.members.cache.get(client.user.id);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`-`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if(!message.member.permissions.has.Permissions(perms)) 
        return message.reply(`<:erro:858615784771551252>| Você não tem permissão  de \`Gerenciar cargos\` nesse servidor!`)
   
        
        if(!doggo.permissions.has.Permissions(perms)){
        return message.reply(`<:erro:858615784771551252>| Eu não tenho permissão de  \`Gerenciar cargos\` nesse Servidor!`);
        }
        
        if (!user){
        return message.reply(`<:erro:858615784771551252>| Mencione um membro para adicionar o cargo\nExemplo:\`${prefix}addcargo (@user) (id do cargo)\``);
}
        if (!role)
        return message.reply(`<:erro:858615784771551252>| Mencione um cargo ou um ID válido de um cargo!`);

        else if (user.roles.cache.has(role.id))
        return message.reply(`<:erro:858615784771551252>| O usuário mencionado já possuí esse cargo!`);

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

                await message.reply({embeds: [embed]});
      
            } catch (err) {
            return message.reply(`<:erro:858615784771551252>| Meu cargo é inferior ao cargo do Membro mencionado!`, err.message);
            }
        }
    
    }      
        

exports.conf = {
  aliases: ["giverole", "addcargo", ]
}