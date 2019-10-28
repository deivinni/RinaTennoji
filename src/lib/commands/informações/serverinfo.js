const { Embed } = require('../../../util/functions/index'), moment = require('moment'); moment.locale('pt-BR');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    const guild = msg.guild;
    return await msg.channel.send(`${msg.emoji.normais.bot.one_drive} \`|\` Informações do servidor`, {
      embed: new Embed(msg.author, false, { thumbnail: { url: msg.guild.iconURL }})
      .setDescriptionArray([
        [
          `${msg.emoji.normais.bot.seta}Nome: ${guild.name} (ID: \`${guild.id}\`)`,
          `${msg.emoji.normais.bot.seta}Owner: ${guild.owner.toString()} (ID: \`${guild.owner.id}\`)`,
          `${msg.emoji.normais.bot.seta}Membros: ${guild.memberCount}`,
          `${msg.emoji.normais.bot.seta}Canais: ${guild.channels.size}`,
          `${msg.emoji.normais.bot.seta}Data de criação: ${moment(guild.createdAt).format('LLL')} (${moment().diff(moment(guild.createdAt), 'days')} dias)`,
          `${msg.emoji.normais.bot.seta}Você entrou: ${moment(msg.member.joinedAt).format('LLL')} (${moment().diff(moment(msg.member.joinedAt), 'days')} dias)`
        ],[
          `${msg.emoji.normais.bot.seta}Membros: ${[
            `${msg.emoji.normais.discord.status.online} ${guild.members.filter(m => m.presence.status == 'online').size}`,
            `${msg.emoji.normais.discord.status.dnd} ${guild.members.filter(m => m.presence.status == 'dnd').size}`,
            `${msg.emoji.normais.discord.status.idle} ${guild.members.filter(m => m.presence.status == 'idle').size}`,
            `${msg.emoji.normais.discord.status.offline} ${guild.members.filter(m => m.presence.status == 'offline').size}`,
            `${msg.emoji.normais.discord.status.bot} ${guild.members.filter(m => m.user.bot).size}`
          ].join(' \`|\` ')}`,
          `${msg.emoji.normais.bot.seta}Canais de texto: ${guild.channels.filter(c => c.type == 'text').size}`,
          `${msg.emoji.normais.bot.seta}Canais de voz: ${guild.channels.filter(c => c.type == 'voice').size}`,
          `${msg.emoji.normais.bot.seta}Canal AFK: ${guild.afkChannel}`,
          `${msg.emoji.normais.bot.seta}Emojis: ${guild.emojis.filter(r => !r.animated) ? `\`${guild.emojis.filter(r => !r.animated).size}\` normais` : ''}${guild.emojis.filter(r => !r.animated) ? ` e \`${guild.emojis.filter(r => r.animated).size}\` animados` : ''}`
        ],[
          `${msg.emoji.normais.bot.seta}Cargos: ${(guild.roles.map(r => r).join(', ') || `Muitos cargos... ${msg.emoji.normais.bot.cry}`)}`
        ]
      ])
    }).then(msg.channel.stopTyping(true));
  },
  conf: {
    alias: ['info-server', 'si'],
    enable: true,
    cooldown: 20,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'serverinfo',
    desc: 'veja as informações do servidor',
    member: 'usuários',
    category: 'informações'
  }
}