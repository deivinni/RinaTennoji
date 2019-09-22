const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('nekos.life'),
  { kiss } = new (require('nekos.life'))().sfw;

module.exports = {
  exec: async(bot, msg, args) => {
    const member = msg.mentions.users.filter(a => a.id != bot.user.id).first() || bot.users.get(args[0]);
    if (!member) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, mencione alguém so servidor para beijar.`).catch();
    kiss().then(img => {
      msg.channel.send(`<a:kiss_:588097512376631317> \`|\` ${msg.author}, beijou ${member}.`, {embed: new Embed(msg.author).setImage(img.url)}).catch();
    })
  },
  conf:{ aliases: ['beijar'], enable: true, cooldown: 20 },
  help: {
    name: 'kiss',
    description: 'beija alguém do servidor',
    usage: ['kiss @usuário'],
    member: 'usuários',
    category: 'ações',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}