const ms = require('parse-ms')

exports.run = async (client, message, args, database, prefix) => {
 
	
	
 
  let user1 = message.author
  
  let dbs = await   
database.ref(`Start/${user1.id}`).once('value');
  let dbsref = database.ref(`Start/${user1.id}`);
  
  let db1V = await   
database.ref(`Versao/${user1.id}`).once('value');
  let db1Vref = database.ref(`Versao/${user1.id}`);

  let db2B = await   
database.ref(`VersaoBuild`).once('value');
  let d2Bref = database.ref(`VersaoBuild`);

  if (dbs.val() == null) {
  message.inlineReply(`**Antes de começar a usar minha Economia você deve usar \`${prefix}start\` Para liberar meus comandos de Economia**`)
return;
    }

  
if (db1V.val().versão !== db2B.val().build) {
message.inlineReply(`**Tem uma nova Versão Disponível para sua Conta. Use \`${prefix}update\` Para aproveitar a nova Versão. Para mais informações entre em meu Servidor de Suporte \`${prefix}invite\`**`)
return;
}

	
	
	
	
	
	
	let ref = await database.ref(`Rifa`)
  let db = await ref.once('value')
  if(!db.val()) {
    ref.set({
      quantiaTotal: 0,
      participantes: 0,
      ultimoValor: 0,
      ultimoGanhador: client.user.id,
      tempo: Date.now() + 3600000,
      tickets: 0,
      ticketsTotal: 0
    })

  }

  if(!['buy', 'comprar'].includes(args[0])) {
    let time = parseInt(db.val().tempo - Date.now())
 
message.inlineReply(`
Participantes: **${db.val().participantes}**
Tickets comprados: **${db.val().tickets}**
Prêmio: **R$${db.val().quantiaTotal}**
Último ganhador: **${client.users.cache.get(db.val().ultimoGanhador) ? client.users.cache.get(db.val().ultimoGanhador).tag : "Usuário desconhecido#0000"} (R$${db.val().ultimoValor})**
Tempo até o próximo resultado: **${ms(time).minutes}m ${ms(time).seconds}s**
Compre um ticket com \`.rifa buy\``)

  } else {
    let buyTickets = parseInt(args[1])
    if(!buyTickets || isNaN(buyTickets)) buyTickets = 1
    if(buyTickets < 1) buyTickets = Math.abs(args[1])
    let refMoney = database.ref(`Economia/${message.author.id}`)
    let dbMoney = await refMoney.once('value')
    let refTickets = await database.ref(`Rifa/Tickets`)
    let dbTickets = await refTickets.once('value')
    let arrTickets = dbTickets.val() ? dbTickets.val().tickets : []
    let refUsers = await database.ref(`Rifa/usuarios`)
    let refMaxTickets = await database.ref(`Rifa/${message.author.id}`)
    let dbMaxTickets = await refMaxTickets.once('value')
    let dbUsers = await refUsers.once('value')
    let usuarios = dbUsers.val() ? dbUsers.val().users : []
    let ticketsCompradosPorUser = dbMaxTickets.val() ? dbMaxTickets.val().total : 0

    if((buyTickets * 300) > dbMoney.val().dinheiro) return message.inlineReply(`Você não tem **R$${(buyTickets * 300).toLocaleString('en')}** na sua Carteira para comprar **${buyTickets}** tickets!`)
    if(parseInt((ticketsCompradosPorUser + buyTickets)) > 5000) return message.reply(`Você só pode comprar 5,000 tickets por partida.`)

    let arrayTickets = []
    for(let i = 0; i < buyTickets; i++) {
      arrayTickets.push(message.author.id)
    }

    if(!usuarios.includes(message.author.id)) {
      refUsers.update({
        users: [message.author.id, ...usuarios]
      })
      ref.update({
        participantes: db.val().participantes + 1
      })
    }

    if(!dbMaxTickets.val()) {
      refMaxTickets.set({
        total: Number(buyTickets)
    })
    } else {
      refMaxTickets.update({
        total: Number(ticketsCompradosPorUser + buyTickets)
    })
    }

    refTickets.set({
      tickets: arrayTickets.concat(arrTickets)
    })

    refMoney.update({ dinheiro: dbMoney.val().dinheiro - (buyTickets * 300) })

    ref.update({
      quantiaTotal: parseInt(db.val().quantiaTotal + (buyTickets * 300)),
      tickets: parseInt(db.val().tickets + buyTickets),
    })

    message.inlineReply(`Você comprou **${buyTickets}** tickets por **R$${(buyTickets * 300)}** agora espere até o resultado da rifa sair!`)

    let tb = await database.ref(`Transacoes/${message.author.id}`).once("value")
    let tbref = database.ref(`Transacoes/${message.author.id}`)

    let t1 = tb.val() ? tb.val().t : [];
      
    t1.push({type: "rifa", action: 1, date: Date.now(), quantia: (buyTickets * 300), num: buyTickets});

    tbref.set({
      t: t1
    })

  }

}