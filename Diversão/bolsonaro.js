const Jimp = require('jimp');
const Discord = require('discord.js');

exports.run = async (client, message, args, database) => {
  Jimp.read('https://cdn.discordapp.com/attachments/745665022268539011/749292068341284885/bolsonaro.png')
    .then(image => {
      Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
        image.resize(1920, 1080)
        image.print(font, 600, 300, args.join(" "), 1000)
        image.getBuffer(Jimp.MIME_PNG, (err, i) => {
          message.channel.send({ files: [{ attachment: i, name: "bolsonaro.png" }] })
        })
      })
    })
}