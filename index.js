const Discord = require("discord.js");
require("discord.js").MessageEmbed = require("./Embeds");
const config = require(`./config.json`);
const client = new Discord.Client({intents: 32767});
const firebase = require("firebase");
const fs = require("fs");
const { join } = require("path");

const firebaseConfig = {
  apiKey: "AIzaSyA-r_dpHhXU-Y0etxfcy4XPSif2cKhgG3c",
  authDomain: "royale-bot-economia.firebaseapp.com",
  databaseURL: "https://royale-bot-economia-default-rtdb.firebaseio.com",
  projectId: "royale-bot-economia",
  storageBucket: "royale-bot-economia.appspot.com",
  messagingSenderId: "726308332092",
  appId: "1:726308332092:web:043a3ec9003e65917c9939",
  measurementId: "G-7VC2E98BD9"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


client.on("messageCreate", async (message) => {
require("./Handlers/HandlerEconomia.js")(client, message, database, config);
require("./Handlers/HandlerAventura.js")(client, message, database, config);
require("./Handlers/HandlerModeração.js")(client, message, database, config);
require("./Afk.js")(client,message,database)
});

client.on("ready", () => {
require("./Eventos/Ready.js")(client)
require("./LoadCommands/LoadAventura.js")(client)
require("./LoadCommands/LoadModeração.js")(client)
});

client.login("OTIyNzE4ODk3NzgwNzExNDY1.YcFi8A.PGPPDCoVnPO1zw0KWDP9qRh_e9Y");
