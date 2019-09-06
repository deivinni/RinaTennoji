const { Embed } = require('../../../util/functions/index'),
  moment = require('moment'),
  { Emojis, Owner } = require('../../../util/config'),
  { cpus, totalmem, hostname } = require('os'); require('moment-duration-format')

module.exports = {
  exec: async (bot, msg, args) => {
    msg.channel.send(
      new Embed(msg.author).setThumbnail(bot.user.displayAvatarURL)
      .addFieldArray(`${Emojis.Normais.Bot.Informações} | Informações minhas`, [[
        `${Emojis.Normais.Bot.Seta}Criador: [${bot.users.get(Owner).tag}](${bot.users.get(Owner).displayAvatarURL})`,
        `${Emojis.Normais.Bot.Seta}Criada em: ${moment(bot.user.createdAt).format('LLL')} (${moment().diff(moment(bot.user.createdAt), 'days')} dias)`,
        `${Emojis.Normais.Bot.Seta}Versão: \`${require('../../../../package.json').version}\``,
        `${Emojis.Normais.Bot.Seta}Latência: \`${Math.floor(bot.ping)}\` ms`,
        `${Emojis.Normais.Bot.Seta}Uptime: ${moment.duration(bot.uptime).format('`D` [d], `H` [h], `m` [min], `s` [segs]')}`,
        `${Emojis.Normais.Bot.Seta}Discord.js: \`${require('discord.js').version}\``,
        `${Emojis.Normais.Bot.Seta}Total de servidores: \`${bot.guilds.size}\``,
        `${Emojis.Normais.Bot.Seta}Total de usuários: \`${bot.users.size}\``,
        `${Emojis.Normais.Bot.Seta}Total de comandos: \`${bot.commands.size}\``
      ]])
      .addFieldArray(`<:process_:601822798456815617> | Processamento`, [[
        `${Emojis.Normais.Bot.Seta}Hostname: ${hostname()}`,
        `${Emojis.Normais.Bot.Seta}CPU: \`${(process.cpuUsage().user/1024/1024/100).toFixed(2)}\`%`,
        `${Emojis.Normais.Bot.Seta}RAM: \`${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)}\`MB/\`${(totalmem()/1024/1024/1024).toFixed(2)}\`GB`,
        `${Emojis.Normais.Bot.Seta}Processador: ${cpus().length}x ${cpus()[0].model}`
      ]])
      .addFieldArray(`🔗 | Links úteis`, [[
        `${Emojis.Normais.Bot.Seta}Github: [clique aqui](https://github.com/DEIVINNI/Yuuki)`,
        `${Emojis.Normais.Bot.Seta}Invite: [indisponível](https://www.discordapp.com/)`,
        `${Emojis.Normais.Bot.Seta}Servidor: [em breve](https://www.discordapp.com/)`,
        `${Emojis.Normais.Bot.Seta}Site: [em breve](https://www.google.com/)`
      ]])
    )
  },
  conf: {
    aliases: ['bi','bot-info'], enable: true, cooldown: 30
  },
  help: {
    name: 'botinfo',
    description: 'veja todas as minhas estatisticas',
    member: 'usuários',
    category: 'informações'
  }
}