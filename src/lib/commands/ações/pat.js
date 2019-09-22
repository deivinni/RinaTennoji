const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  { pat } = new (require('nekos.life'))().sfw;

module.exports = {
  exec: async(bot, msg, args) => {
    const member = msg.mentions.users.filter(a => a.id != bot.user.id).first() || bot.users.get(args[0]);
    if (!member) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, mencione alguém so servidor para acariciar.`).catch();
    pat().then(img => {
      msg.channel.send(`<:pat_:588095982244331520> \`|\` ${msg.author}, acariciou ${member}.`, {embed: new Embed(msg.author).setImage(img.url)}).catch();
    })
  },
  conf:{ aliases: ['acariciar'], enable: true, cooldown: 20 },
  help: {
    name: 'pat',
    description: 'acaricie alguém do servidor',
    usage: '<@usuário>',
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}