const Discord = require("discord.js")
let config = require("../config.json");
module.exports = async (client, database) => {
  global.ramUsoMax = 0;
  global.ramUsoMin = 999999;
  global.ramUso = parseFloat((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2));
  
  setInterval(() => {
    let usage = parseFloat((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))
    
    if(usage > global.ramUsoMax) global.ramUsoMax = usage;
    if(usage < global.ramUsoMin) global.ramUsoMin = usage;
    
    global.ramUso = usage;
  }, 100);
 }
