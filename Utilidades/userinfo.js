const { MessageEmbed, GuildMember } = require('discord.js');

module.exports.run = async (client, message, args, database) => { 



    

                let baliza_user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (baliza_user.presence.status) {
            case "online":
                status = "Online";
                break;
            case "dnd":
                status = "AFK";
                break;
            case "idle":
                status = "Soneca";
                break;
            case "offline":
                status = "Offline";
                break;
        }

        let baliza_info_user = new MessageEmbed()
            .setTitle(`${baliza_user.user.tag}`)
            .setColor("DARK BLUE")
            .setThumbnail(baliza_user.user.displayAvatarURL({dynamic : true}))
            .setColor("DARK BLUE")
            .addField(`โ | Nick:`, `> ${baliza_user.user.username}`, true)
            .addField(`๐ฅ | Nick Mention:`, `> ${baliza_user.user}`, true)
            .addField(`#๏ธโฃ | Member Tag:`, `> \`${baliza_user.user.discriminator}\``, true)
            .addField(`๐ | Member ID:`, `> \`${baliza_user.id}\``, true)
            .addField(`๐ | Conta Criada Em:`, `> ${baliza_user.user.createdAt.toLocaleDateString("pt-BR")}`, true)
            .addField(`๐ | Entrou No Server Dia:`, `> ${baliza_user.joinedAt.toLocaleDateString("pt-BR")}`, true)
            .addField(`๐ค | Status:`, `> ${status}`)
            .addField(`๐ฎ | Atividade:`, `> ${baliza_user.presence.activities[0] ? baliza_user.presence.activities[0].name : `O ${baliza_user} nรฃo estรก fazendo nada!`}`)
            .addField(`โ | Cargos Do Usuario:`, `> ${baliza_user.roles.cache.map(role => role.toString()).join(" | ")}`)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp(new Date())
    message.reply({embeds: [baliza_info_user]})
}