const weather = require('weather-js'),
  { Embed } = require('../../../util/functions/');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    weather.find({
      search: msg.args.join(' '),
      degreeType: 'C'
    }, async function (err, result) {
      if (err) {
        console.log(err.stack);
        return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, ops... Ocorreu um erro! Tente novamente mais tarde!`).then(msg.channel.stopTyping(true));
      };
      if (!result) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, coloque uma cidade para mostrar a previsão do temp!`).then(msg.channel.stopTyping(true));
      const temp = result[0].current,
        local = result[0].location;
      return await msg.channel.send(`:sunny: \`|\` Previsão do tempo de ${temp.observationpoint}`, {
        embed: new Embed(msg.author, 'weather-js')
        .setDescriptionArray([[
          `${msg.emoji.normais.bot.seta}Fuso horário: ${local.timezone} UTC`,
          `${msg.emoji.normais.bot.seta}Temperatura: ${temp.temperature}° C`,
          `${msg.emoji.normais.bot.seta}Em torno dos: ${temp.feelslike}°`,
          `${msg.emoji.normais.bot.seta}Ventos: ${temp.winddisplay}`,
          `${msg.emoji.normais.bot.seta}Umidade do ar: ${temp.humidity}%`,
        ]]).setThumbnail(temp.imageUrl)
      }).then(msg.channel.stopTyping(true));
    })
  },
  conf: {
    alias: ['clima'],
    enable: true,
    cooldown: 15,
    permissions: {
      bot: ['SEND_MESSAGES','EMBED_LINKS','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'weather',
    desc: 'veja a previsão do tempo de qualquer cidade',
    usage: '<cidade>',
    member: 'usuários',
    category: 'search'
  }
}