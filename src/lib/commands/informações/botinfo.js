const { Embed } = require('../../../util/functions/index'),
  { cpus, totalmem, hostname } = require('os'),
  moment = require('moment'); require('moment-duration-format');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    return await msg.channel.send({
      embed: new Embed(msg.author, false).setThumbnail(msg.bot.user.displayAvatarURL)
      .setDescriptionArray([
        [
          `${msg.emoji.normais.bot.seta}Criador: [${msg.bot.users.get(msg.config.owner).tag}](${msg.bot.users.get(msg.config.owner).displayAvatarURL})`,
          `${msg.emoji.normais.bot.seta}Criada em: ${moment(msg.bot.user.createdAt).format('LLL')} (${moment().diff(moment(msg.bot.user.createdAt), 'days')} dias)`,
          `${msg.emoji.normais.bot.seta}Versão: \`${require('../../../../package.json').version}\``,
          `${msg.emoji.normais.bot.seta}Latência: \`${Math.floor(msg.bot.ping)}\` ms`,
          `${msg.emoji.normais.bot.seta}Uptime: ${moment.duration(msg.bot.uptime).format('`D` [d], `H` [h], `m` [min], `s` [segs]')}`,
          `${msg.emoji.normais.bot.seta}Discord.js: \`${require('discord.js').version}\``,
          `${msg.emoji.normais.bot.seta}Total de servidores: \`${msg.bot.guilds.size}\``,
          `${msg.emoji.normais.bot.seta}Total de usuários: \`${msg.bot.users.size}\``,
          `${msg.emoji.normais.bot.seta}Total de comandos: \`${msg.bot.commands.filter(c => c.help.category != 'owner').size}\``
        ],[
          `${msg.emoji.normais.bot.seta}Hostname: ${hostname()}`,
          `${msg.emoji.normais.bot.seta}CPU: \`${(process.cpuUsage().user/1024/1024/100).toFixed(2)}\`%`,
          `${msg.emoji.normais.bot.seta}RAM: \`${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)}\`MB/\`${(totalmem()/1024/1024/1024).toFixed(2)}\`GB`,
          `${msg.emoji.normais.bot.seta}Processador: ${cpus().length}x ${cpus()[0].model}`
        ],[
          `${msg.emoji.normais.bot.seta}Github: [clique aqui](https://github.com/DEIVINNI/RinaTennoji)`,
          `${msg.emoji.normais.bot.seta}Invite: [indisponível](https://www.discordapp.com/)`,
          `${msg.emoji.normais.bot.seta}Servidor: [em breve](https://www.discordapp.com/)`,
          `${msg.emoji.normais.bot.seta}Site: [em breve](https://www.google.com/)`
        ]
      ])
    }).then(msg.channel.stopTyping(true));
  },
  conf: {
    alias: ['bi','info-bot'],
    enable: true,
    cooldown: 20,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'botinfo',
    desc: 'veja todas as minhas estatisticas',
    member: 'usuários',
    category: 'informações'
  }
}