const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config')

module.exports = {
  exec: async (bot, msg, args) => {
    const discrim = (args[0] || msg.author.discriminator).replace('#',''),
      users = bot.users.filter(u => u.discriminator == discrim).map(u => u.tag);
    if (users.lenght < 1) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, não encontrei nenhum usuário com este discriminador: \`#${discrim}\`.`)
    else return msg.channel.send(`${users.length} ${users.length > 1 ? 'usuários' : 'usuário'} com este discriminador: \`#${discrim}\``,new Embed(msg.author).setDescription(users.join(' \`|\` ')))
  },
  conf: {
    aliases: ['discriminator','discriminador'],
    enable: true,
    cooldown: 15,
    permissions: ['SEND_MESSAGES']
  },
  help: {
    name: 'discrim',
    description: 'veja os usuários com um determinado discriminador',
    usage: '[discriminador]',
    member: 'usuários',
    category: 'utilidades'
  }
}