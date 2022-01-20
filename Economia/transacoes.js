const Discord = require("discord.js");
const pixapi = require("pixapi")

module.exports.conf = {
  aliases: ["transações", "transaçoes", "transacões"]
}

module.exports.run = async function(client, message, args, database) {

  function getUser(id) {
    let usr = client.users.cache.get(id);
    return usr ? usr.tag : id;
  }
  
  let user = client.users.cache.find(u => u.tag === args.join(" ")) || message.mentions.users.first() || message.author;
  let money = parseInt(args[1]);


  let db = await database.ref(`Transacoes/${user.id}`).once("value");
  if(!db.val() && user != message.author) return message.inlineReply(":x: **| Esse usuário ainda fez nenhum tipo de transação!**");
  if(!db.val()) return message.inlineReply(":x: **| Você não fez nenhuma transação ainda!**");
  

  let trans = [];
  let data = db.val().t;
  data.reverse();
  if(data.length > 10) {
    for(let i = 0 ; i < 10 ; i++) {
      trans.push(data[i]);
    }
  } else {
    for(let i = 0 ; i < data.length ; i++) {
      trans.push(data[i]);
    }
  }

  let transations = trans.map(t => {
    let msg = `\`[${pixapi.formatDate("DD/MM/YYYY HH:mm", (t.date - 10800000))}]\` `;

    switch(t.type) {
      case 'pay':
        msg += t.action ? 
          `:outbox_tray: **|** Enviou **R$${cacheAbb(t.quantia)}** para \`${getUser(t.to)}\`` :
          `:inbox_tray: **|** Recebeu **R$${cacheAbb(t.quantia)}** de \`${getUser(t.by)}\``
      break;
      case 'work':
        msg += `:inbox_tray: **|** Recebeu **R$${cacheAbb(t.quantia)}** por trabalhar como \`${t.work}\`.`
      break;
      case 'daily':
        msg += `:inbox_tray: **|** Recebeu **R$${cacheAbb(t.quantia)}** de bônus diário.`
      break;
      case 'lucky':
        msg += t.action ?
          `:outbox_tray: **|** Perdeu **R$${cacheAbb(t.quantia)}** testando a sorte.` :
          `:inbox_tray: **|** Ganhou **R$${cacheAbb(t.quantia)}** testando a sorte.`
      break;
      case 'crime':
        msg += t.action ?
          `:outbox_tray: **|** Perdeu **R$${cacheAbb(t.quantia)}** em um crime.` :
          `:inbox_tray: **|** Ganhou **R$${cacheAbb(t.quantia)}** em um crime.`
      break;
      case 'roubo':
        msg += t.lost ? `:outbox_tray: **|** Fiança **R$${cacheAbb(t.quantia)}** por tentantiva de assalto.` : (t.action ?
          `:inbox_tray: **|** Roubou **R$${cacheAbb(t.quantia)}** de \`${getUser(t.victim)}\`` :
          `:outbox_tray: **|** Roubado **R$${cacheAbb(t.quantia)}** por \`${getUser(t.author)}\``)
      break;
      case 'rifa':
        msg += t.action ? `:outbox_tray: **|** Comprou **${cacheAbb(t.num)}** Rifa${t.num > 1 ? "s" : ""} por **R$${cacheAbb(t.quantia)}**` :
        `:inbox_tray: **|** Ganhou **R$${cacheAbb(t.quantia)}** na rifa`
      break;
      default:
        msg += `:x: **|** Fez uma transação inválida de **R$${cacheAbb(t.quantia)}**!`
    }

    return msg;
  }).join("\n");

  let embed = new Discord.MessageEmbed()
    .setDescription(transations)
    .setColor("#0D02FA")
    .setTitle(user == message.author ? "Suas ultimas transações" : `Ultimas transações de ${user.tag}`);
  
  message.inlineReply(embed);
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
exports.conf = {
	aliases: ["tr", "trasações", "transacões", "transaçoes"]
}