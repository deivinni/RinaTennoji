const { Emojis } = require('../../../util/config');

module.exports = {
  exec: async (bot, msg, args) => {
    msg.channel.send(`${Emojis.Gifs.Discord.Latency} \`|\` ${msg.author}, minha latência é \`${Math.floor(bot.ping)}\` ms!`).catch();
  },
  conf: { aliases: ['latency'], enable: true },
  help: {
    name: 'ping',
    description: 'veja a minha latência',
    member: 'usuários',
    category: 'informações'
  }
}