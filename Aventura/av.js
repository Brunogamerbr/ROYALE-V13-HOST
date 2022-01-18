const Discord = require("discord.js");
exports.run = async (client, message, args, database, prefix) => {

let start = await client.db.get(`StartRPG_${message.author.id}`);
if (start == null) {
return message.reply(`<:erro:858615784771551252>| Parece que você ainda não criou seu avatar, utilize \`${prefix}create-avatar\``)}	
	
let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.tag === args.join(" ")) || message.author;

  let money = await client.db.get(`Economia_${user.id}`) || 0;
  let bank = await client.db.get(`Banco_${user.id}`) || 0;
  let level_sys = await client.db.get(`Nivel_${user.id}`) || { xp: 0, level: 1 };
  let xp = level_sys.xp, level = level_sys.level, nextLvl = level_sys.level * 340;
  
  let progress_bar = getProgress(xp, level, nextLvl);

function getProgress(xp, level, nextLvl) {
  let percent = parseInt((xp / nextLvl) * 100);
  let p2 = parseInt(percent / 10);
  let txt = ""
  if(percent >= 10) {
    txt += "<:11:913882717140181083>"
    txt += "<:12:913882733686689812>".repeat((p2 - 1) || 0);
    txt += "<:20:913882772857315348>".repeat(9 - p2);
    txt+= "<:30:913882784483901440>";
  } else {
    txt = "<:10:913882754524004352><:20:913882772857315348><:20:913882772857315348><:20:913882772857315348><:20:913882772857315348><:20:913882772857315348><:20:913882772857315348><:20:913882772857315348><:20:913882772857315348><:30:913882784483901440>"
  }
  return txt;
}
    
   let db = await client.db.get(`StartRPG_${user.id}`)

   if (db == null) {
    message.reply(`**<:erro:858615784771551252>| Esse usuário não Foi encontrado no meu mundo RPG!**`)
    return;
}

if (db.hp == null) db.hp = 8;
if (db.sexo == 'm') db.sexo = 'Masculino';
if (db.sexo == 'f') db.sexo = 'Feminino';
if (db.hp == 8) db.hp = '❤️❤️❤️❤️❤️❤️❤️❤️';
if (db.hp == 7) db.hp = '❤️❤️❤️❤️❤️❤️❤️';
if (db.hp == 6) db.hp = '❤️❤️❤️❤️❤️❤️';
if (db.hp == 5) db.hp = '❤️❤️❤️❤️❤️';
if (db.hp == 4) db.hp = '❤️❤️❤️❤️';
if (db.hp == 3) db.hp = '❤️❤️❤️';
if (db.hp == 2) db.hp = '❤️❤️';
if (db.hp == 1) db.hp = '❤️';
if (db.hp == 0) db.hp = ''; 
if (db.hp >8) db.hp = 8;


let embed = new Discord.MessageEmbed()
.setAuthor(user.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`Vejá abaixo informações sobre o avatar de ${user}:\n\n**<:id:873563434824904754>| Nome: \`${db.nome}\`\n<:idade:918386919874895883>| Idade: \`${db.idade}\`\n<:genero:918386210177683456>| Genero: \`${db.genero}\`\n<:cl:918388663572910100>| Habilidade: \`${db.habilidade}\`\n<:hp:918485200483266600>| Vida: ${db.hp}\n<:nivel:918390757449154631> | Level: \`${level}\`\n<a:mine_xp:913889304449781843> | XP: \` ${xp}/${nextLvl} \`\n<:progresso:918386976741261382> | Progresso: ${progress_bar} > \`${parseInt((xp / nextLvl) * 100)}%\`**`)
.setColor(`BLUE`)
.setThumbnail(user.displayAvatarURL())
.setFooter(`Mostrando avatar`)
.setTimestamp();
message.reply({embeds: [embed]})
}
