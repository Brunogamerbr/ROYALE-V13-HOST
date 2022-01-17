const Discord = require("discord.js");
require("discord.js").MessageEmbed = require("./Embeds");
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES']
});
const firebase = require("firebase");
const config = require(`./config.json`);
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
require("./Events/Handler.js")(client, message, database, config)
});

client.on("ready", () => {
require("./Events/Ready.js")(client)
});

client.login(process.env.TOKEN);
