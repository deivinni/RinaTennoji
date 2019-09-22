const { Emojis } = require('../../../util/config'),
  { Embed } = require('../../../util/functions/index'),
  moment = require('moment');
  moment.locale('pt-BR');

module.exports = {
  exec: async (bot, msg, args) => {
    const embed = new Embed(msg.author),
      guild = msg.guild;
    embed.setThumbnail(msg.guild.iconURL).setAuthor('Informações do servidor', bot.user.displayAvatarURL)
    msg.channel.send(
      embed
        .addFieldArray(`Informações principais`, [[
          `${Emojis.Normais.Bot.Seta}Nome: ${guild.name} (ID: \`${guild.id}\`)`,
          `${Emojis.Normais.Bot.Seta}Owner: ${guild.owner.toString()} (ID: \`${guild.owner.id}\`)`,
          `${Emojis.Normais.Bot.Seta}Membros: ${guild.memberCount}`,
          `${Emojis.Normais.Bot.Seta}Canais: ${guild.channels.size}`,
          `${Emojis.Normais.Bot.Seta}Data de criação: ${moment(guild.createdAt).format('LLL')} (${moment().diff(moment(guild.createdAt), 'days')} dias)`,
          `${Emojis.Normais.Bot.Seta}Você entrou: ${moment(msg.member.joinedAt).format('LLL')} (${moment().diff(moment(msg.member.joinedAt), 'days')} dias)`
        ]]).addFieldArray(`Informações adicionais`, [[
          `${Emojis.Normais.Bot.Seta}Membros: ${[
            `${Emojis.Normais.Discord.Status.Online} ${guild.members.filter(m => m.presence.status == 'online').size}`,
            `${Emojis.Normais.Discord.Status.Dnd} ${guild.members.filter(m => m.presence.status == 'dnd').size}`,
            `${Emojis.Normais.Discord.Status.Idle} ${guild.members.filter(m => m.presence.status == 'idle').size}`,
            `${Emojis.Normais.Discord.Status.Offline} ${guild.members.filter(m => m.presence.status == 'offline').size}`,
            `${Emojis.Normais.Discord.Status.Bot} ${guild.members.filter(m => m.user.bot).size}`
          ].join(' \`|\` ')}`,
          `${Emojis.Normais.Bot.Seta}Canais de texto: ${guild.channels.filter(c => c.type == 'text').size}`,
          `${Emojis.Normais.Bot.Seta}Canais de voz: ${guild.channels.filter(c => c.type == 'voice').size}`,
          `${Emojis.Normais.Bot.Seta}Canal AFK: ${guild.afkChannel}`,
          `${Emojis.Normais.Bot.Seta}Emojis: ${guild.emojis.filter(r => !r.animated) ? `\`${guild.emojis.filter(r => !r.animated).size}\` normais` : ''}${guild.emojis.filter(r => !r.animated) ? ` e \`${guild.emojis.filter(r => r.animated).size}\` animados` : ''}`
        ]]
      ).addField(`Cargos[${guild.roles.size}]`, (guild.roles.map(r => r).join(', ') || 'Muitos cargos... ;-;'))
    ).catch();
  },
  conf: { aliases: ['server-info'], enable: true, cooldown: 30 },
  help: {
    name: 'serverinfo',
    description: 'veja as informações do servidor',
    member: 'usuários',
    category: 'informações'
  }
}