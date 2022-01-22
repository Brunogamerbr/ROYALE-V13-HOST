const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args, database) => {
const status = new db.table("AFKs");
let afk = await status.fetch(message.author.id);

status.set(message.author.id, args.join(" ") || `AFK`);

  if (!afk)  {
    message.inlineReply(`${message.author} modo AFK ativado\n Motivo: **\`${args.join(" ") ? args.join(" ") : "não definido"}\`**`);
  } else {
    status.delete(message.author.id);
  }
}