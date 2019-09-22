const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  { get } = require('snekfetch');

module.exports = {
  exec: async(bot, msg, args) => {
    const member = msg.mentions.users.filter(a => a.id != bot.user.id).first();
    if (!member) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, favor mencione uma pessoa para ser sua trap card.`).catch();
    msg.channel.startTyping(true);
    get(`https://nekobot.xyz/api/imagegen?type=trap&name=${member.username}&author=${msg.author.username}&image=${member.displayAvatarURL}`).then(async(r) => {
      await msg.channel.send(new Embed(msg.author).setImage(r.body.message)).catch();
    })
    msg.channel.stopTyping(true);
  },
  conf:{ enable: true, cooldown: 20 },
  help: {
   name: 'trap',
   description: 'transfome uma pessoa em sua trap card.',
   usage: '<@usuário>',
   member: 'usuários',
   category: 'imagem',
   credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}