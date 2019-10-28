const { Embed } = require('../../../util/functions/index');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]) || msg.author,
      avatar = member.displayAvatarURL.endsWith('.gif') ? `${member.displayAvatarURL}?size=2048` : member.displayAvatarURL;
    return await msg.channel.send(`${msg.emoji.normais.bot.instagram} \`|\` Avatar de ${member.tag}`, {
      embed: new Embed(msg.author, false).setImage(avatar)
    }).then(msg.channel.stopTyping(true));
  },
  conf: {
    alias: ['picture', 'foto'],
    enable: true,
    cooldown: 10,
    permissions: {
      bot: ['SEND_MESSAGES', 'ATTACH_FILES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'avatar',
    desc: 'veja o avatar de algum usuário',
    usage: '[@usuário]',
    member: 'usuários',
    category: 'utilidade'
  }
}