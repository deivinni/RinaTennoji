const { Embed } = require('../../../util/functions/index'),
  { colors, emojis, permis } = require('../../../util/config'),
  { inspect } = require('util')

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send('Sério? Vai querer que eu avalie algo para você ou não?').then(msg.channel.stopTyping(true));
    if (msg.args.includes(('msg.guild.leave()' || 'bot.token'))) return await msg.channel.send({
      embed: new Embed().setColor(colors.VERMELHO).setImage('https://i.imgur.com/k6QbXL7.png')
    }).then(msg.channel.stopTyping(true));
    try {
      let evaluated = inspect(eval(msg.args.join(' '), { depth: 0 })),
        timeStart = process.hrtime(),
        timeDiff = process.hrtime(timeStart),
        executed = `${timeDiff[0] > 0 ? `\`${timeDiff[0]}\`s` : ''}\`${timeDiff[1]/1000000}\`ms`;
      await msg.channel.send(evaluated, { code: 'js', maxLenght: 1500 }).then(msg.channel.stopTyping(true));
      return await msg.bot.channels.get('617063996004237317').send([
        `${emojis.normais.discord.cooldown} \`|\` Executado em: ${executed}`,
        `${emojis.normais.discord.channel.text} \`|\` Tipo: ${typeof msg.args.join(' ')}`,
        `${emojis.normais.discord.outage} \`|\` Resultado:`, '```js', `${evaluated}`, '```'
      ].join('\n')).then(msg.channel.stopTyping(true));
    } catch (e) {
      await msg.channel.send(e, { code:'js' }).then(msg.channel.stopTyping(true));
      return await msg.bot.channels.get('617063996004237317').send(e.stack, { code: 'js', maxLenght: 1900 }).then(msg.channel.stopTyping(true));
    }
  },
  conf: {
    alias: ['exec','debug'],
    ownerOnly: true,
    enable: true,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'eval',
    desc: 'faça-me avaliar se algum script (em `js`) está correto',
    usage: '<script>',
    member: 'owner',
    category: 'owner',
    credit: ['[[MenuDocs]](https://www.youtube.com/channel/UCpGGFqJP9vYvzFudqnQ-6IA)']
  }
}