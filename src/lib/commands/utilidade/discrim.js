const { Embed } = require('../../../util/functions/index');

  module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    const discrim = (msg.args[0] || msg.author.discriminator).replace('#',''),
      users = msg.bot.users.filter(u => u.discriminator == discrim).map(u => u.tag);
    if (users.lenght < 1) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, não encontrei nenhum usuário com este discriminador: \`#${discrim}\`.`).then(msg.channel.stopTyping(true));
    else return await msg.channel.send(`${users.length} ${users.length > 1 ? 'usuários' : 'usuário'} com este discriminador: \`#${discrim}\``, {
      embed: new Embed(msg.author, false).setDescription(users.join(' \`|\` '))
    }).then(msg.channel.stopTyping(true));
  },
  conf: {
    alias: ['discriminator','discriminador'],
    enable: true,
    cooldown: 10,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'discrim',
    desc: 'veja os usuários com um determinado discriminador',
    usage: '[discriminador]',
    member: 'usuários',
    category: 'utilidade'
  }
}