const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config');

module.exports = {
  exec: async (bot, msg, args) => {
    const member = msg.mentions.users.first() || bot.users.get(args[0]) || msg.author,
      avatar = member.displayAvatarURL.endsWith('.gif') ? `${member.displayAvatarURL}?size=2048` : member.displayAvatarURL;
    msg.channel.send(`${Emojis.Normais.Bot.Instagram} \`|\` Avatar de ${member.tag}`,new Embed(msg.author).setImage(avatar)).catch();
  },
  conf: {
    aliases: ['picture', 'foto'],
    enable: true,
    cooldown: 10,
    permissions: ['SEND_MESSAGES']
  },
  help: {
    name: 'avatar',
    description: 'veja o avatar de algum usuário.',
    usage: '[@usuário]',
    member: 'usuários',
    category: 'utilidades'
  }
}