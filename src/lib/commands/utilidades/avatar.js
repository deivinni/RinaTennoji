const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config');

module.exports = {
  exec: async (bot, msg, args) => {
    const member = msg.mentions.users[0] || bot.users.get(args[0]) || msg.author,
      avatar = member.displayAvatarURL.endsWith('.gif') ? `${member.displayAvatarURL}?size=2048` : member.displayAvatarURL;
    msg.channel.send(
      new Embed(msg.author)
      .setImage(avatar)
      .setTitle(`${Emojis.Normais.Bot.Instagram} | Avatar de ${msg.guild.member(member).nickname || member.username}`)
      .setDescription(`Clique __**[aqui](${avatar})**__ para fazer download`)
    )
  },
  conf: { aliases: ['picture', 'foto'], enable: true },
  help: {
    name: 'avatar',
    description: 'veja o avatar de algum usuário.',
    usage: '[@usuário]',
    member: 'usuários',
    category: 'utilidades'
  }
}