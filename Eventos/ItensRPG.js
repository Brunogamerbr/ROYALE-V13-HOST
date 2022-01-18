const Discord = require("discord.js")
module.exports = async(client, message, database) => {

const db = await client.db.get(`StartRPG_${message.author.id}`)
    if(!db) return;
    const hp = Number(db.hp)
    if(hp <= 0) {
    await client.db.delete(`StartRPG_${message.author.id}`)
    await client.db.delete(`InventarioRPG_${message.author.id}`)
   return message.reply(`${message.author} Você acabou perdendo todos os corações de **HP** você morreu... mas tente iníciar uma nova jornada!`).catch(e => console.log(e.message))
    }

}
