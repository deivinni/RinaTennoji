const { Client, Collection } = require('discord.js'),
  bot = new Client({ messageCacheMaxSize: 1000 });

['commands','aliases','cooldowns'].forEach(x => bot[x] = new Collection());
['LoadCommands','LoadEvents'].forEach(x => require(`./structure/${x}`)(bot));

bot.login(process.env.TOKEN);