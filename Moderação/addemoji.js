const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `#0D02FA`;
exports.run = async (client, message, args, database) => {
  
  if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
      return message.inlineReply(`<:erro:858615784771551252>| Você não pode utilizar este comando!`)}
    
    const emoji = args[0];
    if (!emoji) return message.inlineReply(`<:erro:858615784771551252>| Por favor, me envie o emoji após o comando!`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
    )
    
       message.channel.send(`☑️| Sucesso, o emoji ${link} foi adicionado ao servidor!`)
       
    }else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.inlineReply(`<:erro:858615784771551252>| Por favor, envie um emoji valido!`);
      message.inlineReply(
        `Você pode usar o emoji normal sem adicionar no servidor!`
      );
    }
  }

