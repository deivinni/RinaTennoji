const { slap } = new (require('nekos.life'))().sfw,
  { Embed } = require('../../../util/functions/index');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    const member = msg.mentions.users.filter(a => (a.id != msg.bot.user.id || !a.bot)).first() || msg.bot.users.get(msg.args[0]).filter(a => (a.id != msg.bot.user.id || !a.bot));
    if (!member) return await msg.channel.send(`${msg.emoji.normais.discord.outage}, \`|\` ${msg.author}, você deve mencionar o usuário em que deseja bater.`).then(() => msg.channel.stopTyping(true));
    return await slap().then(async (img) => {
      return await msg.channel.send(`<:slap_:589433427774930956> \`|\` ${msg.author}, deu um tapa em ${member}!`, {
        embed: new Embed(msg.author, 'Nekos.life', { image: { url: img.url } })
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf: {
    alias: ['bater'],
    enable: true,
    guildOnly: true,
    cooldown: 10,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'slap',
    desc: 'bata em algum usuário',
    usage: '@usuário',
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}