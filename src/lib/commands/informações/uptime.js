const moment = require('moment'),
  { Emojis } = require('../../../util/config');
  require('moment-duration-format');
  moment.locale('pt-BR');

module.exports = {
  exec: async (bot, msg, args) => {
    msg.channel.send(`${Emojis.Normais.Discord.Cooldown} \`|\` ${msg.author}, estou online à exatamente: ${
      moment.duration(bot.uptime).format('`D` [d], `H` [h], `m` [min], `s` [segs]')
    }.`).catch();
  },
  conf: { aliases: ['ontime'], enable: true, cooldown: 20 },
  help: {
    name: 'uptime',
    description: 'veja o tempo em que eu estou online',
    member: 'usuários',
    category: 'informações'
  }
}