async function rifa(client) {
  const fire = require('firebase')
  const database = fire.database()
  const ref = database.ref(`Rifa`)
  const db = await ref.once('value')
  
  try {
    const time = db.val().tempo
  // const arrParticipants = db.val().Tickets.tickets || []
  const refParti = database.ref('Rifa/Tickets')
  const dbParti = await refParti.once('value')
  let arrParticipants;
  if(!dbParti.val()) arrParticipants = []
  else arrParticipants = dbParti.val().tickets
  
  
  if(time < Date.now()) {
    if(arrParticipants.length > 0) {
      const amount = db.val().quantiaTotal
      const winnerID = arrParticipants[Math.floor(Math.random() * arrParticipants.length)]
      const user = await client.users.fetch(winnerID)
      const refW = database.ref(`Economia/${winnerID}`)
      const dbW = await refW.once('value')
      refW.update({ dinheiro: parseInt(dbW.val().dinheiro + amount) })

      try { 
        await user.send(`Você ganhou **R$${amount}** na rifa! Continue jogando na rifa para ganhar mais.`) 
        

        } catch(e) { 
          console.log(e) 
          }

      
      let tb = await database.ref(`Transacoes/${user.id}`).once("value")
      let tbref = database.ref(`Transacoes/${user.id}`)

      let t1 = tb.val() ? tb.val().t : [];
      
      t1.push({type: "rifa", action: 0, date: Date.now(), quantia: amount});

      tbref.set({
        t: t1
      })
      
      ref.set({
        participantes: 0,
        quantiaTotal: 0,
        tempo: Date.now() + 3600000,
        tickets: 0,
        ultimoGanhador: winnerID,
        ultimoValor: amount
      })
      
    } else {
       ref.update({
         tempo: Date.now() + 3600000
       })
     }
  }
  } catch(e) {
     console.log('erro no evento da rifa ' + e.message)
  }
}

module.exports = rifa
