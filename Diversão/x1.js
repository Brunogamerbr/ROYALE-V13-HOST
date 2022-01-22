const discord = require('discord.js')
const { MessageEmbed, MessageAttachment } = require("discord.js");

exports.run = async (client, message, args, database ) => {
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    function tirar(atual, quantia) {
      let calc = atual.length - quantia // Pega vida atual e subtrai dano
      let resultado = ''
      let i = 0;
      for (i = 0; i < calc; i++) {
        resultado = resultado + '❤';
      }
      return resultado
    }
    let user = message.mentions.users.first();
    if (!user) return message.channel.send(`> Mencione alguém para poder lutar.`);
    if (user.id == message.author.id) return message.channel.send(`> Que isso soldado, quer se matar é? Nunca mais faça isso!`);

    let player1 = `<@${message.author.id}>`;
    let player2 = `<@${user.id}>`;
    let vida1 = '❤❤❤❤❤❤❤❤❤❤'
    let vida2 = '❤❤❤❤❤❤❤❤❤❤'
    let start = new MessageEmbed()
      .setDescription(`A Guerra Começa`)
      .setColor("RANDOM")
      .addField(`**${user.username} Contra ${message.author.username}**`, `**Quem Será que irá ganhar?**`)
      .setImage('https://media.tenor.com/images/45c38f5f82dc36306a3b13b5d0606d3a/tenor.gif')
    let looser = ""
    let winner = ""
    let msg = await message.channel.send(start).catch(err => { return })
    await timeout(4000)

    var falas = [
      '👊 Soco na cara!',
      '🤬 Chute!',
      '💪 Ataque Crítico!',
      '🦷 Chute na boca!',
      '🔪 Facada!',
      '💉 Estão perdendo muito sangue.',
      '🔫 Tiro! [...]'
    ]
    var gifs = [
      'https://imgur.com/MAM5F57.gif',
      'https://imgur.com/NHsII6q.gif',
      'https://imgur.com/bAi6vJ0.gif',
      'https://imgur.com/cvQjzwQ.gif',
      'https://imgur.com/NRUHY4S.gif',
      'https://imgur.com/YWaxBXe.gif',
      'https://imgur.com/BPI8qv5.gif'
    ]

    let dano = [1, 2, 3, 2, 4, -3, 10, 0]
    let iniciando = new MessageEmbed()
      .setDescription(`Eles entram no campo de batalha...`)
      .setColor("RANDOM")
      .addField(`**${user.username}**`, `[${vida1}]`, true)
      .addField(`**${message.author.username}**`, `[${vida2}]`, true)
      .setImage('https://imgur.com/ZAZb5IE.gif')

    msg.edit(iniciando).catch(err => { return });
    let i = 0
    await timeout(3000);
    for (i = 0; i < 7; i++) {
      await timeout(1000)
      let rand = Math.floor(Math.random() * 2)

      if (gifs[i] == '-3') rand = 3;
      if (rand == 0) {
        vida1 = tirar(vida1, dano[i])

      } else if (rand == 1) {
        vida2 = tirar(vida2, dano[i])
      } else {
        for (let bb = 0; bb < rand; bb++) {
          if (vida1.length < 10) {
            vida1 = tirar(vida1, dano[i])
          }
          if (vida2.length < 10) {
            vida2 = tirar(vida2, dano[i])
          }
        }
      }
      let lutando = new MessageEmbed()
        .setDescription(`**${falas[i]}**`)
        .setColor("RANDOM")
        .addField(`**${user.username}**`, `[${vida1}]`, true)
        .addField(`**${message.author.username}**`, `[${vida2}]`, true)
        .setImage(gifs[i])
      msg.edit(lutando).catch(err => { return });
      await timeout(2500)
      if (vida1 == '' || vida2 == '') {
        i = 9
      }
    }
    let looserr = ''
    let w = ""
    if (vida1 == '') {
      w = player1
      looserr = player2
    } else
      if (vida2 == '') {
        w = player2
        looserr = player1
      } else {
        let nn = Math.floor(Math.random() * 2);
        if (nn == 1) {
          w = player1
          looser = player2
        } else {
          w = player2
          looser = player1
        }
      }
    let result = new MessageEmbed()
      .setDescription(`**A Guerra Chega Ao Fim**`)
      .setColor("RANDOM")
      .addField(`\u200b`, `${w} Você derrotou ${looserr}`)
      .setImage('https://imgur.com/XNby2lf.gif')

    msg.edit(result).catch(err => { return })
  }
