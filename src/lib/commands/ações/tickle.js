const { tickle } = new (require('nekos.life'))().sfw,
  { Embed } = require('../../../util/functions/index');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    const member = msg.mentions.users.filter(a => (a.id != msg.bot.user.id || !a.bot)).first() || msg.bot.users.get(msg.args[0]).filter(a => (a.id != msg.bot.user.id || !a.bot));
    if (!member) return await msg.channel.send(`${msg.emoji.normais.discord.outage}, \`|\` ${msg.author}, mencione alguém so servidor para acariciar.`).then(() => msg.channel.stopTyping(true));
    return await tickle().then(async (img) => {
      return await msg.channel.send(`${msg.author}, fez cócegas em ${member}.`, {
        embed: new Embed(msg.author, 'Nekos.life', { image: { url: img.url } })
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf: {
    alias: ['cócegas'],
    enable: true,
    guildOnly: true,
    cooldown: 10,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'tickle',
    desc: 'faça cócegas em alguém',
    usage: '@usuário',
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life)']
  }
}