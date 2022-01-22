const Discord = require("discord.js");

exports.run = async (client, message, args, database) => {


var doggo = message.guild.members.cache.get(client.user.id);

if(!doggo.hasPermission('MANAGE_WEBHOOKS'))
return message.inlineReply(`**❌| Estou sem permissão de criar webhook nesse servidor** !`)

 
 let name = ('ESCANOR');
 let avatar = {avatar: 'https://i.imgur.com/hH1oAdh.png'}

 let batatinha = [
    '**ESCANOR!** Aquele que não faz flexão... E sim empurra a terra para baixo!',
    '**ESCANOR!** Aquele que já contou até o infinito... Duas vezes!',
    '**ESCANOR!** Aquele que nunca chega atrazado.... O sim o tempo está equivocado!',
    '**ESCANOR!** Aquele que dorme com a luz acesa... Não por medo do escuro e sim pelo escuro ter medo dele!',
    '**ESCANOR!** Aquele cujo nome foi escrito no deathnote... E depois de 40 segundos o deathnote morreu!',
    '**ESCANOR!** Aquele que foi passar o dia na praia... E o sol que ficou queimado!',
    '**ESCANOR!** Aquele que chutou uma montanha pro céu... E até hoje é conhecida como lua!',
    '**ESCANOR!** Aquele que não envelhece... O tempo fica da idade de Escanor!',
    '**ESCANOR!** Aquele que nao caí... O planeta que é atraido por ele!',
    '**ESCANOR!** Aquele que nunca pede o link... Pois ele já tem todos eles!',
    '**ESCANOR!** Aquele que não liga o chuveiro... Ele que chora ao ver Escanor!',
    '**ESCANOR!** Aquele que na chamada da escola, a professora que falava presente!',
    '**ESCANOR!** Aquele que foi atingido por um raio e esse raio foi eletrocutado!',
    '**ESCANOR!** Aquele que não corre... E sim a terra que foge ao ver Escanor!',
    '**ESCANOR!** Aquele que faltou dois dias de aula na escola... E hoje esses dias são conhecidos como sábado e domingo',
    '**ESCANOR!** Aquele que sobreviu a 2021... Duas vezes!',
    '**ESCANOR!** Aquele que foi mordido por uma cascavel... E depois de 2 horas a cobra morreu!',
    "**ESCANOR!** Aquele que nunca morrerá de ataque cardíaco... Pois meu coração não é doido de me atacar!",
    "**ESCANOR!** Aquele que nunca perde a virgindade... Porque escanor nunca perde!",
    "**ESCANOR!** Aquele que não comemora o natal... E sim o natal comemora Escanor!",
    "**ESCANOR!** Aquele que nunca comete erros... E sim o erro que está errado!",
    "**ESCANOR!** Aquele que não tem medo de nada... Pois o medo tem medo de Escanor!",
    "**ESCANOR!** Aquele que não é iludido por egirl... As egirl que se iludem por Escanor!",
    "**ESCANOR!** Aquele que quando olha para o espelho não vê nada... Pois algo tão infimo não consegue refletir a imagem de Escanor!",
    "**ESCANOR!** Aquele que na escola os professores não ensinam... Escanor ensina os professores!",
    "**ESCANOR!** Aquele que não liga o chuveiro... E sim o encara até ele chorar!",
    "**ESCANOR!** Aquele que não possui poder... O poder possui Escanor!",
    "**ESCANOR!** Aquele que não ganha presentes... O presente que ganha Escanor!"
];
let arg = batatinha[Math.floor(Math.random() * batatinha.length)]

  try {
    message.channel.createWebhook(name, avatar).then(async w => {
      await w.send(arg);
      await w.delete();
    })
  } catch (err) {
    message.reply('**ESCANOR!** Aquele que não responderá seu comando... Pois escanor não segue as ordens de ninguem!');
  }
}