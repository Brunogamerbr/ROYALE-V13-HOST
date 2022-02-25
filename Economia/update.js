const Discord = require("discord.js");
module.exports.run = async(client, message, args, database, prefix) => {
    let db = await client.db.get(`Versao/${message.author.id}`)
    let db1 = await client.db.get(`VersaoBuild`)

    if(db.versão != db1.build) {
        client.db.set(`Versao/${message.author.id}`, {versão: db1.build})
        let msg = await message.reply(`<:correto:858615705398018078>| Você recebeu a atualização **${db1.build}**\n\nNovidades abaixo:\nAtualização somente para correção de erros!`)
    } else {
        return;
    }
}