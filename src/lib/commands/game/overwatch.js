const { Embed } = require('../../../util/functions/'),
  ow = require('overwatch-api');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args[0]) return msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar o nome do jogador desejado!`).then(msg.channel.stopTyping(true));
    if (!msg.args[1] || (msg.args[1] && !['pc','xbl','psn'].includes(msg.args[1]))) return msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar uma plataforma válida, elas são: \`pc\`, \`xbl\` ou \`psn\``).then(msg.channel.stopTyping(true));
    if (msg.args[0].includes('#')) msg.args[0] = msg.args[0].replace(/#/g, '-');
    ow.getProfile(msg.args[1], 'global', msg.args[0], async (err, json) => {
      if (err) return msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, não foi possível encontrar este jogador!`).then(msg.channel.stopTyping(true));
      const { games, level, portrait, username, playtime: { competitive, quickplay }, private } = json,
        { sportsmanship, shotcaller, teammate } = json.endorsement,
        { won, draw, played, lost, win_rate } = games.competitive;

      if (private) return msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, este jogador contem o perfil privado!`).then(msg.channel.stopTyping(true));

      return msg.channel.send(`${msg.emoji.normais.bot.overwatch} \`|\` Informações de \`${username}\``, {
        embed: new Embed(msg.author, 'Blizzard')
        .setThumbnail(portrait)
        .setDescriptionArray([
          [
            `${msg.emoji.normais.bot.seta}Level: ${level}`,
            `${msg.emoji.normais.bot.seta}Indicação \`Espírito Esportivo\`: ${sportsmanship.rate || 0} / 100`,
            `${msg.emoji.normais.bot.seta}Indicação \`Toma Decisões\`: ${shotcaller.rate || 0} / 100`,
            `${msg.emoji.normais.bot.seta}Indicação \`Bom Aliado\`: ${teammate.rate || 0} / 100`
          ],[
            `${msg.emoji.normais.bot.seta}Partidas competitivas: ${played || 'nenhuma'}`,
            `${msg.emoji.normais.bot.seta}Vitórias competitivas: ${won || 'nenhuma'}`,
            `${msg.emoji.normais.bot.seta}Empates competitivos: ${draw || 'nenhum'}`,
            `${msg.emoji.normais.bot.seta}Derrotas competitivas: ${lost || 'nenhuma'}`,
            `${msg.emoji.normais.bot.seta}Porcentagem de vitória: ${win_rate || '0%'}`,
            `${msg.emoji.normais.bot.seta}Tempo jogado: ${competitive || '00:00:00'}`
          ],[
            `${msg.emoji.normais.bot.seta}Partidas em jogo rápido: ${games.quickplay.played || 'nenhuma'}`,
            `${msg.emoji.normais.bot.seta}Vitórias em jogo rápido: ${games.quickplay.won || 'nenhuma'}`,
            `${msg.emoji.normais.bot.seta}Tempo de jogo: ${quickplay || '00:00:00'}`
          ]
        ])
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf: {
    alias: ['ow'],
    enable: true,
    permissions: {
      bot: ['SEND_MESSAGES','EMBED_LINKS','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'overwatch',
    desc: 'veja as informações de algum jogador de overwatch',
    usage: '<player> <plataforma>',
    member: 'usuários',
    category: 'game',
    credit: ['[[MenuDocs]](https://www.youtube.com/channel/UCpGGFqJP9vYvzFudqnQ-6IA)','[Overwatch](https://playoverwatch.com/pt-br)']
  }
}