const Discord = require("discord.js");
module.exports.run = async (client, message, args, database) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Você não tem permissão de \`Gerenciar servidor\` para usar esse comando!');
  
  var doggo = message.guild.members.cache.get(client.user.id);
  if(!doggo.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)){
      return message.reply(`<:erro:858615784771551252>| Eu não tenho permissão de \`Gerenciar servidor\`!`)}

    message.reply(`Pronto! Agora mencione um canal do servidor..`).then(msg => {
        let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
        .on('collect', c => {
            canal = c.mentions.channels.first()
            if (!canal) {
                message.reply(`<:erro:858615784771551252>| Mencione um canal!`)
      } else {
    message.reply(`🤔| Qual será o título do seu anúncio?`).then(msg3 => {
        let ck = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
        .on('collect', c => {
            title = c.content

    message.reply(`🤔| Qual será a descrição desse anúncio?`).then(msg2 => {
        let cl = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
        .on('collect', c => {
            desc = c.content

    message.channel.send(`☑️| Anúncio enviado ao canal ${canal} com sucesso!`)

    let embed = new Discord.MessageEmbed()
    .setColor(`#0D02FA`)
    .setThumbnail()
    .setTimestamp()
    .setTitle(title)
    .setDescription(desc)

    canal.send({embeds: [embed]})

              })
            })
          })
        })
      }
    })
  })

  }
