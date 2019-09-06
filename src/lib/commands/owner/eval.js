const { Embed } = require('../../../util/functions/index'),
  { Colors, Emojis } = require('../../../util/config'),
  { inspect } = require('util')

module.exports = {
  exec: async (bot, msg, args) => {
    if (!args.join(' ')) return msg.channel.send('Sério? Vai querer que eu avalie algo para você ou não?')
    if (args.includes(('msg.guild.leave()' || 'bot.token'))) return msg.channel.send(new Embed().setColor(Colors.VERMELHO).setImage('https://i.imgur.com/k6QbXL7.png'));
    try {
      let evaluated = inspect(eval(args.join(' '), { depth: 0 })),
        timeStart = process.hrtime(),
        timeDiff = process.hrtime(timeStart),
        executed = `${timeDiff[0] > 0 ? `\`${timeDiff[0]}\`s` : ''}\`${timeDiff[1]/1000000}\`ms`;
      msg.channel.send(evaluated, { code: 'js', maxLenght: 1500 });
      bot.channels.get('617063996004237317').send([
        `${Emojis.Normais.Discord.Cooldown}Executado em: ${executed}`,
        `${Emojis.Normais.Discord.Channel.Text}Tipo: ${typeof args.join(' ')}`,
        `${Emojis.Normais.Discord.Outage}Resultado:`, '```', `${evaluated}`, '```'
      ].join('\n'));
    } catch (e) {
      msg.channel.send(e, { code:'js' });
      bot.channels.get('617063996004237317').send(e.stack, { code: 'js', maxLenght: 1900 });
    }
  },
  conf: { aliases:['exec','debug'], cooldown: 15, ownerOnly: true, enable: true },
  help: {
    name: 'eval',
    description: 'faça-me avaliar se algum script (em `js`) está correto',
    usage: '<script>',
    member: 'owner',
    category: 'owner'
  }
}