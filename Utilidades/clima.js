const Discord = require("discord.js");
const weather = require('weather-js');
module.exports.run = async function(client, message, args, database) {
  if(!args.length) return message.reply("<:erro:858615784771551252>| Por favor, insira uma localização válida!");


  weather.find({ search: args.join(' '), degreeType: 'C' }, async(error, result) => {
    if(error) return message.reply(`<:erro:858615784771551252>| Um erro interno aconteceu. Tente novamente mais tarde!`);
    if(result == undefined || result.length == 0) {
        return message.reply(`<:erro:858615784771551252>| Local não encontrado!`);
    }

    var current = result[0].current;
    var location = result[0].location;

    let embed = new Discord.MessageEmbed()
      .setAuthor(`Previsão do tempo para ${current.observationpoint}`)
      .setColor("#0D02FA")
      .addField(`Fuso Horário`, `UTC${location.timezone}`, true)
      .addField(`Temperatura`, `${current.temperature}°C`, true)
      .addField(`Sensação Térmica`, `${current.feelslike}°C`, true)
      .addField(`Velocidade do vento`, `${current.winddisplay}`, true)
      .addField('Umidade do ar', `${current.humidity}%`, true)
    message.reply({embeds: [embed]})
  })

}
