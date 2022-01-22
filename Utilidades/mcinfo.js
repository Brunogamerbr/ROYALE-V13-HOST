const Discord = require("discord.js");
const request = require("request");
module.exports.run = async(client, message, args, database) => {
  if(!args.length) return message.reply(`:x: **| Por favor, insira o nick de algum jogador de minecraft!**`);
  
  let playername = args[0];
  let uuid = "";
  let nicks = [];

  request.get(`https://api.mojang.com/users/profiles/minecraft/${playername}`, (err, res, body) => {

    if(res.statusCode == 400) return message.reply(`:x: **| O nome é inválido, tem mais de 16 caracteres ou contém caracteres diferentes de (a-zA-Z0-9_)**`);

    if(res.statusCode == 429) return message.reply(`:x: **| Muitos pedidos enviados**`);

    if(res.statusCode == 500) return message.reply(`:x: **| Tempo limite esgotado (API atrasou e não pôde responder)**`);

    if(res.statusCode != 200 || !body) return message.reply(`:x: **| Não foi possível localizar o jogador (Verifique se o nome está correto)**`);

    

    uuid = JSON.parse(body).id;
    request.get(`https://api.mojang.com/user/profiles/${JSON.parse(body).id}/names`, (err, res, bod) => {
      nicks = JSON.parse(bod)
      playername = JSON.parse(bod)[JSON.parse(bod).length - 1];
      finish();
    })
  })


  function finish() {
    let embed = new Discord.MessageEmbed()
      .setColor("#0D02FA")
      .setDescription(`Informações da conta de **${playername.name}**\n\n**Histórico de nicks: 
      \`\`\` ${nicks.map(n => n.name).join(" | ")} \`\`\`**`)
      .setImage(`https://mc-heads.net/head/${playername.name}`)
      .setAuthor(playername.name, `https://mc-heads.net/avatar/${playername.name}`);
    message.reply({embeds: [embed]});
  }
}

