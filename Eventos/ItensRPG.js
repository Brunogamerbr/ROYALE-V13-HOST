const Discord = require("discord.js")
module.exports = async(client, message, database) => {

const db = await client.db.get(`StartRPG/${message.author.id}`)
    if(!db) return;
    const hp = Number(db.hp)
    if(hp <= 0) {
    setTimeout(function() {
    client.db.delete(`StartRPG/${message.author.id}`)
    }, 10);
    setTimeout(function(){
    client.db.delete(`InventarioRPG/${message.author.id}`)
    },10)
    message.reply(`${message.author} Você acabou perdendo todos os corações de **HP** você morreu... mas tente iníciar uma nova jornada!`)
    }
}
