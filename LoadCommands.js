const Discord = require("discord.js")
const fs = require("fs")

module.exports = async(client) => {

fs.readdir('./Economia/', (err, files) => {
  if (err) console.error(err);
	console.log(`Categoria Economia carregada com sucesso!`);
	files.forEach(f => {
		let props = require(`./Economia/${f}`);

    if (props.conf == null) return;
    if (props.conf.aliases == null) return;
props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, `${f}`.replace('.js', ''));
    })
  })
});

fs.readdir('./Aventura/', (err, files) => {
  if (err) console.error(err);
	console.log(`Categoria Aventura carregada com sucesso!`);
	files.forEach(f => {
		let props = require(`./Aventura/${f}`);

    if (props.conf == null) return;
    if (props.conf.aliases == null) return;
props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, `${f}`.replace('.js', ''));
    })
  })
});

fs.readdir('./Moderação/', (err, files) => {
  if (err) console.error(err);
	console.log(`Categoria Moderação carregada com sucesso!`);
	files.forEach(f => {
		let props = require(`./Moderação/${f}`);

    if (props.conf == null) return;
    if (props.conf.aliases == null) return;
props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, `${f}`.replace('.js', ''));
    })
  })
});

fs.readdir('./Utilidades/', (err, files) => {
  if (err) console.error(err);
	console.log(`Categoria Utilidades carregada com sucesso!`);
	files.forEach(f => {
		let props = require(`./Utilidades/${f}`);

    if (props.conf == null) return;
    if (props.conf.aliases == null) return;
props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, `${f}`.replace('.js', ''));
    })
  })
});

fs.readdir('./Developers/', (err, files) => {
  if (err) console.error(err);
	console.log(`Categoria Developers carregada com sucesso!`);
	files.forEach(f => {
		let props = require(`./Developers/${f}`);

    if (props.conf == null) return;
    if (props.conf.aliases == null) return;
props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, `${f}`.replace('.js', ''));
    })
  })
});


}