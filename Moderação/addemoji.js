const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require('discord.js');
module.exports.run = async(client, message, args, database, prefix) => {
  
      if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)){
      return message.reply(`<:erro:858615784771551252>| Você não tem permissão de \`Gerenciar emojis\`!`)}
      
      var doggo = message.guild.members.cache.get(client.user.id);
      
      if(!goggo.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)){
      return message.reply(`<:erro:858615784771551252>| Eu não tenho permissão de \`Gerenciar emojis\` nesse servidor!`)}
      
      
      const emoji = args[0];
      if (!emoji) return message.reply(`<:erro:858615784771551252>| Por favor, me envie a menção de algun emoji após o comando!`);

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
    
       message.reply(`☑️| Sucesso, o emoji ${link} foi adicionado ao servidor!`)
       
    }else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.reply(`<:erro:858615784771551252>| Por favor, envie um emoji valido!`);
      message.reply(
        `Você pode usar o emoji normal sem adicionar no servidor!`
      );
    }
  }

