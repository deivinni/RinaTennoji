const { prefixo, emojis } = require('../../../util/config');

module.exports = async (bot, msg) => {
  if (!msg.author.bot) {
    prefixo.find(prefix => {
      if (msg.content.toLowerCase().startsWith(prefix)) {
        
        const args = msg.content.slice(prefix.length).trim().split(/\s+/g),
          comando = args.shift().toLowerCase(),
          cmd = bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando));

        Object.defineProperties(msg, {
          'config': { value: require('../../../util/config')        },
          'emoji' : { value: require('../../../util/config').emojis },
          'color' : { value: require('../../../util/config').colors },
          'args'  : { value: args                                   },
          'bot'   : { value: bot                                    }
        });

        //exportar os eventos de comandos (normalmente os erros de comando executado)
        require('../../../structure/').CommandEvent(bot, msg, cmd, comando);

      } else return;
    });
    if (msg.content === msg.guild.me.toString()) {
      msg.channel.startTyping(true);
      return msg.channel.send(`${emojis.gifs.bot.bot_mention} \`|\` ${msg.author}, meu prefixo é \`${prefixo[0]}\` ou \`${prefixo[1]}\`, utilize \`${prefixo[0]}\` para saber meus comandos.`).then(msg.channel.stopTyping(true));
    }
  }
  return;
}