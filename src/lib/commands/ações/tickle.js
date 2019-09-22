const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  { tickle } = new (require('nekos.life'))().sfw;

module.exports = {
  exec: async(bot, msg, args) => {
    const member = msg.mentions.users.filter(a => a.id != bot.user.id).first() || bot.users.get(args[0]);
    if (!member) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, mencione alguém so servidor para acariciar.`).catch();
    tickle().then(img => {
      msg.channel.send(`${msg.author}, fez cócegas em ${member}.`, {embed: new Embed(msg.author).setImage(img.url)}).catch();
    })
  },
  conf:{ aliases: ['cócegas'], enable: true, cooldown: 20 },
  help: {
    name: 'tickle',
    description: 'faça cócegas em alguém',
    usage: '<@usuário>',
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}