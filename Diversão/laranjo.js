const Jimp = require('jimp');
const Discord = require('discord.js');

exports.run = async (client, message, args, database) => {
  message.channel.startTyping()
	Jimp.read('https://cdn.discordapp.com/attachments/745665022268539011/749290667812847646/laranjo.png')
    .then(image => {
      Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
        image.resize(647, 467)
        image.print(font, 25, 75, args.join(" "), 1000)
        image.getBuffer(Jimp.MIME_PNG, (err, i) => {
		
          message.channel.send({ files: [{ attachment: i, name: "laranjo.png" }] });
 message.channel.stopTyping()		
        })
      })
    })
}