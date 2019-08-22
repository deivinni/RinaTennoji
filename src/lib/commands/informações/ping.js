const { emojis } = require('../../../util/config');

module.exports = {
  exec: async (bot, msg, args) => {
    msg.channel.send(`${emojis._gifs.latency} \`|\` ${msg.author}, minha latência é \`${Math.floor(bot.ping)}\` ms!`);
  },
  conf: { aliases: ['latency'], enable: true },
  help: {
    name: 'ping',
    description: 'veja a minha latência',
    member: 'usuários',
    category: 'informações'
  }
}
