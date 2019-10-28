const { Embed } = require('../../../util/functions/'),
  math = require('mathjs');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args[0]) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você precisa colocar uma equação para ser solucionada.`).then(msg.channel.stopTyping(true));
    try {
      return await msg.channel.send(':1234: \`|\` Rina Calculator', {
        embed: new Embed(msg.author, 'mathjs', { 
          thumbnail: { url: 'https://lh3.googleusercontent.com/teegsEGjmomH-MHD-A_BSwapI5ry6EIVOKBVl--Q6BkJ3kfigBezEqoJU1ZYcn9_Vv-X' } 
        })
        .addFieldArray('Equação', [['```js', msg.args.join(' '), '```']])
        .addFieldArray('Resultado', [['```js', math.evaluate(msg.args.join(' ')), '```']])
      }).then(msg.channel.stopTyping(true));
    } catch (e) {
      msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, por favor coloque uma equação válida!`).then(msg.channel.stopTyping(true));
    }
  },
  conf: {
    alias: ['calcular'],
    enable: true,
    cooldown: 10,
    permissions: {
      bot: ['SEND_MESSAGES','EMBED_LINKS','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'math',
    desc: 'faça contas matemáticas pelo discord',
    usage: '<equação>',
    member: 'usuários',
    category: 'utilidade',
    credit: ['[Plexi Development](https://www.youtube.com/user/TrueXPixels)']
  }
}