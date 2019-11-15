const { Embed, FormatNumber, FormatDuration } = require('../../../util/functions/'),
  { 
    Apextab_API: { searchPlayer, getPlayerById }, Platform: { PC, XBOX_ONE, PS4 } 
  } = require('apextab-api');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args[0]) return msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msh.author}, você deve colocar o jogador desejado!`).then(msg.channel.stopTyping(true));
    if (!msg.args[1] || (msg.args[1] && !['pc','xbox','ps4'].includes(msg.args[1]))) return msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar uma plataforma válida: \`pc\`, \`xbox\` ou \`ps4\`!`).then(msg.channel.stopTyping(true));
    const platformCheck = { pc: PC, xbox: XBOX_ONE, ps4: PS4 },
      platform = platformCheck[msg.args[1].toLowerCase()];
    try {
      const { results } = await searchPlayer(msg.args[0], platform ? platform : pc);
      for (let playerResults of results) {
        const player = await getPlayerById(playerResults.aid),
          { name, skillratio, visits, avatar, legend, level, kills, headshots, matches, globalrank, utime } = player;
        return msg.channel.send(`${msg.emoji.normais.bot.apex} \`|\` Informações de \`${name}\``, {
          embed: new Embed(msg.author, 'Respawn')
          .setDescriptionArray([
            [
              `${msg.emoji.normais.bot.seta}Lenda ativa: ${legend || 'nenhuma'}`,
              `${msg.emoji.normais.bot.seta}Ranque global: ${FormatNumber(globalrank) || 'nenhum'}`,
              `${msg.emoji.normais.bot.seta}Nível: ${FormatNumber(level) || 0}`,
              `${msg.emoji.normais.bot.seta}Habilidade: ${skillratio+'%' || '0%'}`,
              `${msg.emoji.normais.bot.seta}Partidas: ${FormatNumber(matches) || 0}`,
              `${msg.emoji.normais.bot.seta}Abates: ${FormatNumber(kills) || 0}`,
              `${msg.emoji.normais.bot.seta}Headshots: ${FormatNumber(headshots) || 0}`,
              `${msg.emoji.normais.bot.seta}Visitas: ${FormatNumber(visits) || 'nenhuma'}`,
              `${msg.emoji.normais.bot.seta}Tempo jogado: ${FormatDuration(utime) || '0 dias'}`
            ]
          ]).setThumbnail(avatar)
        })
      }
    } catch (e) {
      return msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, não foi possível encontrar este jogador!`).then(msg.channel.stopTyping(true));
    }
  },
  conf: {
    enable: true,
    cooldown: 10,
    permissions: {
      bot: ['SEND_MESSAGES','EMBED_LINKS','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'apex',
    desc: 'veja as informações de um jogador de apex legends',
    usage: '<player> <plataforma>',
    member: 'usuários',
    category: 'game',
    credit: ['[[MenuDocs]](https://www.youtube.com/channel/UCpGGFqJP9vYvzFudqnQ-6IA)']
  }
}