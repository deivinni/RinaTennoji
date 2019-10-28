const { pat } = new (require('nekos.life'))().sfw,
  { Embed } = require('../../../util/functions/index');

module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true);
    const member = msg.mentions.users.filter(a => (a.id != msg.bot.user.id || !a.bot)).first() || msg.bot.users.get(msg.args[0]).filter(a => (a.id != msg.bot.user.id || !a.bot));
    if (!member) return await msg.channel.send(`${msg.emoji.normais.discord.outage}, \`|\` ${msg.author}, você deve mencionar o usuário em que deseja acariciar.`).then(() => msg.channel.stopTyping(true));
    return await pat().then(async (img) => {
      return await msg.channel.send(`<:pat_:588095982244331520> \`|\` ${msg.author}, acariciou ${member}!`, { 
        embed: new Embed(msg.author, 'Nekos.life', { image: { url: img.url } })
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf:{ 
    alias: ['acariciar'], 
    enable: true, 
    cooldown: 10,
    guildOnly: true,
    permissions: {
      bot: ['SEND_MESSAGE','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'pat',
    desc: 'acaricie alguém do servidor',
    usage: '@usuário',
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}