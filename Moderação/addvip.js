const Discord = require('discord.js');
const { Permissions } = require('discord.js');
module.exports.run = async (client, message, args, database, prefix) => {
  
 if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))return message.reply("<:erro:858615784771551252>| Voce Não tem permissão para Usar esse comando!");
   var unperm = message.guild.members.cache.get(client.user.id);
 
  if(!unperm.permissions.has(Permissions.FLAGS.MANAGE_ROLES))return message.reply("<:erro:858615784771551252>| Eu estou sem permissão de \`Gerenciar cargos\` nesse servidor!");

 let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
 if (!member) return message.reply('<:erro:858615784771551252>| Para poder executar o comando, tem que mencionar um membro!');

    let db = await database.ref(`Vips/${message.guild.id}`).once('value');
    let role = db.val() != null ? message.guild.roles.cache.get(db.val().cargoId) : null;

    if(!role) return message.reply(`Desculpe, mas o cargo de VIP não está definido ou está inválido! Para definir um cargo de VIP use \`${prefix}setvip\``);

    let vipmessage = new Discord.MessageEmbed()
      .setTitle("☑️ | Vip adicionado")
      .setDescription(`Vip Adicionado Por: \`${message.author.username}\`\n${member} recebeu o ${role}`)
      .setColor('#0D02FA')
      .setTimestamp();

    try {
      member.roles.add(role)
      message.channel.send({embeds: [vipmessage]});
    } catch(err) {
      return message.channel.send(`${err}`);
    }
};
