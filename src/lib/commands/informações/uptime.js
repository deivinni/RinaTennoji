const moment = require('moment'); require('moment-duration-format'); moment.locale('pt-BR');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    return await msg.channel.send(`${msg.emoji.normais.discord.cooldown} \`|\` ${msg.author}, estou online à ${
      moment.duration(msg.bot.uptime).format('`D` [d], `H` [h], `m` [min], `s` [segs]')
    }`).then(msg.channel.stopTyping(true));
  },
  conf: {
    alias: ['ontime'], 
    enable: true, 
    cooldown: 20,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'uptime',
    desc: 'veja o tempo em que eu estou online',
    member: 'usuários',
    category: 'informações'
  }
}