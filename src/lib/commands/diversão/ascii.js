const { font } = require('ascii-art'),
  { Emojis } = require('../../../util/config');

module.exports = {
  exec: async (bot, msg, args) => {
    font (args.join(' '), 'Doom', async (rendered) => {
      rendered = rendered.trimRight();
      if (args.join(' ').length > 40) return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, esta mensagem é muito longa.`)
      msg.channel.send(rendered, {code: 'md'}).catch();
    })
  },
  conf: { enable: true, cooldown: 30 },
  help: {
    name: 'ascii',
    description: 'crie uma mensagem em ascii',
    usage: '<mensagem>',
    member: 'usuários',
    category: 'diversão',
    credits: ['[Plexi Development](https://www.youtube.com/user/TrueXPixels)']
  }
}