const { hug } = new (require('nekos.life'))().sfw,
  { Embed } = require('../../../util/functions/index');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    const member = msg.mentions.users.filter(a => (a.id != msg.bot.user.id || !a.bot)).first() || msg.bot.users.get(msg.args[0]).filter(a => (a.id != msg.bot.user.id || !a.bot));
    if (!member) return await msg.channel.send(`${msg.emoji.normais.discord.outage}, \`|\` ${msg.author}, você deve mencionar o usuário em que deseja abraçar.`).then(() => msg.channel.stopTyping(true));
    return await hug().then(async (img) => {
      return await msg.channel.send(`<a:attackHug_:588082982829424640> \`|\` ${msg.author}, abraçou ${member}!`, { 
        embed: new Embed(msg.author, 'Nekos.life', { image: { url: img.url } })
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf: {
    alias: ['abraçar'],
    cooldown: 10,
    permissions: {
      bot: ['SEND_MESSAGES', 'USE_EXTERNAL_EMOJIS']
    },
    enable: true,
    guildOnly: true
  },
  help: {
    name: 'hug',
    desc: 'abraçe alguém do servidor',
    usage: '@usuário',
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}