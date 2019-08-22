const { Embed } = require('../../../util/functions/index'),
  moment = require('moment'),
  { emojis, owner } = require('../../../util/config'),
  { cpus, totalmem, hostname } = require('os'); require('moment-duration-format')

module.exports = {
  exec: async (bot, msg, args) => {
    msg.channel.send(
      new Embed(msg.author).setThumbnail(bot.user.displayAvatarURL)
      .addFieldArray(`${emojis._normals.info} | Informações minhas`, [[
        `${emojis._normals.seta}Criador: ${bot.users.get(owner).tag}`,
        `${emojis._normals.seta}Criada em: ${moment(bot.user.createdAt).format('LLL')}`,
        `${emojis._normals.seta}Versão: \`${require('../../../../package.json').version}\``,
        `${emojis._normals.seta}Latência: \`${Math.floor(bot.ping)}\` ms`,
        `${emojis._normals.seta}Uptime: ${moment.duration(bot.uptime).format('`D` [d], `H` [h], `m` [min], `s` [segs]')}`,
        `${emojis._normals.seta}Discord.js: \`${require('discord.js').version}\``,
        `${emojis._normals.seta}Total de servidores: \`${bot.guilds.size}\``,
        `${emojis._normals.seta}Total de usuários: \`${bot.users.size}\``,
        `${emojis._normals.seta}Total de comandos: \`${bot.commands.size}\``
      ]])
      .addFieldArray(`<:process_:601822798456815617> | Processamento`, [[
        `${emojis._normals.seta}Hostname: ${hostname()}`,
        `${emojis._normals.seta}CPU: \`${(process.cpuUsage().user/1024/1024/100).toFixed(2)}\`%`,
        `${emojis._normals.seta}RAM: \`${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)}\`MB/\`${(totalmem()/1024/1024/1024).toFixed(2)}\`GB`,
        `${emojis._normals.seta}Processador: \`${cpus().length}\`x ${cpus()[0].model}`
      ]])
      .addFieldArray(`🔗 | Links úteis`, [[
        `${emojis._normals.seta}Github: [clique aqui](https://github.com/DEIVINNI/ShinobuKocho)`,
        `${emojis._normals.seta}Invite: [indisponível](https://www.discordapp.com/)`,
        `${emojis._normals.seta}Servidor: [em breve](https://www.discordapp.com/)`,
        `${emojis._normals.seta}Site: [em breve](https://www.google.com/)`
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
