const { stringify } = require('querystring'),
  request = require('request');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    try {
      if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, favor coloque algo que deseje pesquisar no discord-js.`).then(msg.channel.stopTyping(true));
      let query = stringify({
          src: 'https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json',
          q: msg.args.join(' ')
      });
      request({
        url: `https://djsdocs.sorta.moe/v2/embed?${query}`,
        json: true
      }, async (req, res, json) => {
        if (!json)
          return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, não foi possível encontrar algo sobre: \`${msg.args.join(' ')}\``).then(msg.channel.stopTyping(true));
        return await msg.channel.send({ embed: json }).then(msg.channel.stopTyping(true));
      })
  } catch (e) {
    return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, ocorreu um erro inesperado ao executar este comando. Tente novamente mais tarde!`).then(msg.channel.stopTyping(true));
  }
  },
  conf: {
    alias: ['djs','discordjs-docs'],
    enable: true,
    cooldown: 20,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'docs',
    description: 'pesquise por algo no discord.js',
    usage: '<pesquisa>',
    member: 'desemvolvedores',
    category: 'search',
    credit: ['[Discord.js](https://discord.js.org/)', '[iCrawl](https://github.com/iCrawl)']
  }
}