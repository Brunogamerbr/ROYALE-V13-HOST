const Discord = require("discord.js")
module.exports.run = async (client, message, args, database, prefix) => {
  
	 
  let user1 = message.author
  let dbs = await database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  let db1V = await database.ref(`Versao/${user1.id}`).once('value');
  let db1Vref = database.ref(`Versao/${user1.id}`);
  let db2B = await database.ref(`VersaoBuild`).once('value');
  let d2Bref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
  message.reply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
    }

  
if (db1V.val().versão !== db2B.val().build) {
message.reply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}
	
	let rank = [];
  async function getRank() {
    return new Promise(async (resolve, reject) => {
      let l = 0;
      let base = await database.ref(`Banco`).once("value");
      database.ref(`Banco`).orderByChild('bank').on('child_added', async (id) => {
        let idMembro = id.key;
        let infoMembro = {
          id: `${idMembro}`, 
          bank: id.val().bank        }
        rank.push(infoMembro);
        l++;

        if(l == base.numChildren()) resolve();
      })
    })
  }
  let msg = await message.channel.send("> Carregando Rank de dinheiro Global...");
  await getRank();

  let xy = rank.sort(function(a, b) {
    if (a.bank < b.bank) {
      return 1;
    }
    if (a.bank > b.bank) {
      return -1;
    }
    return 0;
  });

  let x = [];

  const embed = new Discord.MessageEmbed()
    .setTitle('Ranking global')
    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
    .setDescription(`${x}`)
    .setThumbnail("https://i.imgur.com/Xueb5Sj.png")
    .setColor("#0D02FA")

  if (xy.length >= 10) {
    for (y = 0; y < 10; y++) {
      let bank = xy.slice(y, y + 1).map(a => a.bank);
      let id = String(xy.slice(y, y + 1).map(a => a.id));

      if(client.users.cache.get(id)) {
        embed.addField(`${y + 1} - ${client.users.cache.get(id).tag}`,                      `Dinheiro: **R$${cacheAbb(bank)}**`, true);
      }
    }
  } else {
    for (y = 0; y < xy.length; y++) {
      let bank = xy.slice(y, y + 1).map(a => a.bank);
      let id = String(xy.slice(y, y + 1).map(a => a.id));
      if(client.users.cache.get(id)) {
        embed.addField(`${y + 1} - ${client.users.cache.get(id).tag}`, `Dinheiro: **R$${cacheAbb(bank)}**`, true);
      }
    }
  }
  await msg.delete();
  message.reply({embeds: [embed]});

  rank = [];
}

function cacheAbb(number = 0, confs = { precision: null, suffs: null}) {
	if (!number) {
		throw new TypeError('Erro! Você não colocou o número a ser convertido');
	}
    const suffsFromZeros = confs.suffs || { 0:'', 3:'k', 6:'kk', 9:'b', 12:'t', 15: 'q' }
    const { length } = number.toString()
    const lengthThird = length%3
    const divDigits = length-(lengthThird || lengthThird+3)
    const calc = ''+(number/(10**divDigits)).toFixed(confs.precision || 2)
  
    return number < 1000 ? ''+number : (calc.indexOf('.') === calc.length-3 ? calc.replace(/\.00/, '') : calc)+suffsFromZeros[divDigits]
}