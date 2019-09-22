const bot = new (require('discord.js').Client)({messageCacheMaxSize: 1000});

['commands','aliases','cooldowns'].forEach(x => bot[x] = new (require('discord.js').Collection)());
['initCommands','initEvents'].forEach(x => require(`./structure/${x}`)(bot));

bot.login(process.env.TOKEN);