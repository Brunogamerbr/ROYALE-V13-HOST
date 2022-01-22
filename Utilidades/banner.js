const axios = require('axios');
const discord = require('discord.js')
module.exports.run = async (client, message, args, database) => {
const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
	axios.get(`https://discord.com/api/users/${user.id}`, {
 headers: {
 Authorization: `Bot ${client.token}`,
            },
        })
        .then((res) => {
 const { banner, accent_color } = res.data;
if(banner) {
const extension = banner.startsWith('a_') ? '.gif' : '.png'
const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=4096`;

const embed = new discord.MessageEmbed()
.setDescription(`Clique [aqui](${url}) para baixar o banner!`)
.setImage(url)
.setColor(`#0D02FA`)
message.reply({embeds: [embed]})
} else {
 if(accent_color) {
message.reply(`<:erro:858615784771551252>| Você Não tem um banner personalizado!`)
} else return message.reply(`<:erro:858615784771551252>| Não tem banner nem cor personalizado!`)
 }
 })
}
