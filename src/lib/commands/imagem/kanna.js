const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  { get } = require('snekfetch');

module.exports = {
  exec: async(bot, msg, args) => {
    if (!args.join(' ')) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, você deve colocar uma mensagem.`).catch();
    msg.channel.startTyping(true);
    get(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${args.join(' ')}`)
    .then(async(r) => {
      msg.delete();
      await msg.channel.send(new Embed(msg.author).setImage(r.body.message)).catch();
    })
    msg.channel.stopTyping(true);
  },
  conf:{ enable: true, cooldown: 20 },
  help: {
   name: 'kannagen',
   description: 'faça a kanna-chan mandar uma mensagem',
   usage: '<mensagem>',
   member: 'usuários',
   category: 'imagem',
   credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}