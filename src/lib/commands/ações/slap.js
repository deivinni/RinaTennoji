const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  { slap } = new (require('nekos.life'))().sfw;

module.exports = {
  exec: async(bot, msg, args) => {
    const member = msg.mentions.users.filter(a => a.id != bot.user.id).first() || bot.users.get(args[0]);
    if (!member) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, mencione alguém so servidor para acariciar.`).catch();
    slap().then(img => {
      msg.channel.send(`<:slap_:589433427774930956> \`|\` ${msg.author}, deu um tapa em ${member}.`, {embed: new Embed(msg.author).setImage(img.url)}).catch();
    })
  },
  conf:{ aliases: ['bater'], enable: true, cooldown: 20 },
  help: {
    name: 'slap',
    description: 'bata em alguém usuário',
    usage: '<@usuário>',
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}