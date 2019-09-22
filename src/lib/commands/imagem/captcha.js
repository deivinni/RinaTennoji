const { Embed } = require('../../../util/functions/index'),
  { get } = require('snekfetch');

module.exports = {
  exec: async(bot, msg, args) => {
    msg.channel.startTyping(true);
    get(`https://nekobot.xyz/api/imagegen?type=captcha&url=${msg.author.displayAvatarURL}&username=${msg.author.username}`).then(async(r) => {
      msg.delete();
      await msg.channel.send(new Embed(msg.author).setImage(r.body.message)).catch();
    })
    msg.channel.stopTyping(true);
  },
  conf:{ enable: true, cooldown: 20 },
  help: {
   name: 'captcha',
   description: 'faça um captcha com sua foto.',
   member: 'usuários',
   category: 'imagem',
   credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}