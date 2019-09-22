const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  { hug } = new (require('nekos.life'))().sfw;

module.exports = {
  exec: async(bot, msg, args) => {
    const member = msg.mentions.users.filter(a => a.id != bot.user.id).first() || bot.users.get(args[0]).filter(a => a.id != bot.user.id);
    if (!member) return msg.channel.send(`${Emojis.Normais.Discord.Outage}, \`|\` ${msg.author}, você deve mencionar o usuário em que deseja abraçar.`).catch();
    hug().then(img => {
      msg.channel.send(`<a:attackHug_:588082982829424640> \`|\` ${msg.author}, abraçou ${member}`, {embed: new Embed(msg.author).setImage(img.url)}).catch();
    })
  },
  conf:{ aliases: ['abraçar'], enable: true, cooldown: 20 },
  help: {
    name: 'hug',
    description: 'abraçe alguém do servidor',
    usage: '<@usuário>',
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}