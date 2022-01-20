const Discord = require("discord.js");
exports.run = async (client, message, args, database) => {
let user = message.mentions.users.first();
	
let db = await database.ref(`Casamento/${message.author.id}`).once("value");
let dbref = database.ref(`Casamento/${message.author.id}`)	

let marr = `${db.val().marry}`
	
if (db.val().marry !== 0) {

message.inlineReply(`Você já está casado com \`${client.users.cache.get(marr).tag}\` Para se Divorciar utilize \`.divorcio\``)
return;
}

	
if (!user) {
message.inlineReply(`<:erro:858615784771551252>| Mencione o usuário que você deseja se casar!`)
return;
}
	
let dbc = await database.ref(`Casamento/${user.id}`).once("value");
let dbcref = database.ref(`Casamento/${user.id}`)			
 if (db.val() == null) {
dbref.set({marry: 0})	 
}	

message.inlineReply(`Voce casou com \`${user.tag}\``)
dbref.set({marry: user.id})
dbcref.set({marry: message.author.id})	
}