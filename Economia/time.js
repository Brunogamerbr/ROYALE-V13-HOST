const Discord = require("discord.js");
const pixapi = require("pixapi");

exports.run = async (client, message, args, database ) => {
  let user = message.author;

  let embed = new Discord.MessageEmbed()
    .setColor("#0D02FA")
    .setTimestamp()
    .setTitle("Tempo de espera para comandos")
    .setFooter(`Comandos marcados como disponível quer dizer que seu tempo de espera já passou...`)
    .setThumbnail("https://i.imgur.com/iNLK5ee.png")
    .setAuthor(message.author.tag, message.author.avatarURL());

  let sorteDelay = await client.db.get(`Sorte_${user.id}_delay`) || 0;
  let dailyDelay = await client.db.get(`Economia_${user.id}_daily`) || 0;
  let crimeDelay = await client.db.get(`Economia_${user.id}_crimetime`) || 0;
  let rouboDelay = await client.db.get(`Economia_${user.id}_roubotime`) || 0;
  let workDelay = await client.db.get(`Work_${user.id}_work`) || 0;

  let sorte = pixapi.formatTimer(sorteDelay - (Date.now() - (8.64e+7)))
  let daily = pixapi.formatTimer(dailyDelay - (Date.now() - 86400000));
  let crime = pixapi.formatTimer(crimeDelay - (Date.now() - 3630000));
  let roubo = pixapi.formatTimer(rouboDelay - (Date.now() - 600000));
  let work = pixapi.formatTimer(workDelay - (Date.now() - (3.6e+6)));

  let desc =`====[ECONOMIA]====\n**Sorte:** \` ${sorteDelay - (Date.now() - (8.64e+7)) > 0 ? `${sorte.hours}h ${sorte.minutes}m ${sorte.seconds}s` : "Disponível"} \`\n`;

  desc+=`**Daily:** \` ${dailyDelay - (Date.now() - (8.64e+7)) > 0 ? `${daily.hours}h ${daily.minutes}m ${daily.seconds}s` : "Disponível"} \`\n`;

  desc+=`**Crime:** \` ${crimeDelay - (Date.now() - (3630000)) > 0 ? `${crime.hours}h ${crime.minutes}m ${crime.seconds}s` : "Disponível"} \`\n`;

  desc+=`**Roubo:** \` ${rouboDelay - (Date.now() - (600000)) > 0 ? `${roubo.hours}h ${roubo.minutes}m ${roubo.seconds}s` : "Disponível"} \`\n`;

  desc+=`**Trabalho:** \` ${workDelay - (Date.now() - (3.6e+6)) > 0 ? `${work.hours}h ${work.minutes}m ${work.seconds}s` : "Disponível"} \`\n\n`;


  desc+=`\n====AVENTURA====\n`

  let RPG = await client.db.get(`InventarioRPG_${message.author.id}`) || {
    battle_delay: 0,
    chop_delay: 0,
    explorer_delay: 0
  };

  let battle = pixapi.formatTimer(RPG.battle_delay - (Date.now() - (600000)))
  let explorar = pixapi.formatTimer(RPG.explorer_delay - (Date.now() - (900000)))
  let chop = pixapi.formatTimer(RPG.chop_delay - (Date.now() - (600000)))

  desc+=`**Battle:** \` ${RPG.battle_delay - (Date.now() - (600000)) > 0 ? `${battle.hours}h ${battle.minutes}m ${battle.seconds}s` : "Disponível"} \`\n`;

  desc+=`**Explorar:** \` ${RPG.explorer_delay - (Date.now() - (900000)) > 0 ? `${explorar.hours}h ${explorar.minutes}m ${explorar.seconds}s` : "Disponível"} \`\n`;

  desc+=`**Chop:** \` ${RPG.chop_delay - (Date.now() - (600000)) > 0 ? `${chop.hours}h ${chop.minutes}m ${chop.seconds}s` : "Disponível"} \``;
  
  embed.description = desc;

  message.inlineReply(embed);
}

module.exports.conf ={
  aliases: ["tempo", "delay"]
}
