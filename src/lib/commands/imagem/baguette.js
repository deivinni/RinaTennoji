const { Embed } = require('../../../util/functions/index'),
  { get } = require('snekfetch');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    return await get(`https://nekobot.xyz/api/imagegen?type=baguette&url=${msg.author.displayAvatarURL}`).then(async(r) => {
      msg.delete();
      return await msg.channel.send({
        embed: new Embed(msg.author, 'NekoBot').setImage(r.body.message)
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf: {
    enable: true,
    cooldown: 15,
    permissions: {
      member: ['ATTACH_FILES'],
      bot: ['SEND_MESSAGES','ATTACH_FILES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'baguette',
    desc: 'faça uma imagem de você comendo baguette',
    member: 'usuários',
    category: 'imagem',
    credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}