const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  { get } = require('snekfetch');

module.exports = {
  exec: async(bot, msg, args) => {
    if (!args[0]) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, você deve colocar o \`@\` de uma conta do Twiiter.`).catch();
    if (!args.slice(1).join(' ')) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, você deve colocar alguma mensagem para tweetar.`).catch();
    msg.channel.startTyping(true);
    get(`https://nekobot.xyz/api/imagegen?type=tweet&username=${args[0].replace('@','')}&text=${args.slice(1).join(' ')}`).then(async(r) => {
      msg.delete();
      await msg.channel.send(new Embed(msg.author).setImage(r.body.message)).catch();
    })
    msg.channel.stopTyping(true);
  },
  conf:{ aliases: ['tweet'], enable: true, cooldown: 20 },
  help: {
   name: 'twitter',
   description: 'gera uma imagem com alguma mensagem no Twitter.',
   usage: '<TwitterUsername> <mensagem>',
   member: 'usuários',
   category: 'imagem',
   credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}