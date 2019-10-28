const moment = require('moment'),
  youtube = new (require('simple-youtube-api'))(process.env.YOUTUBE_KEY),
  { Embed, shortenerText, FirstUpperCase } = require('../../../util/functions/index');
moment.locale('pt-BR');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args[0]) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, coloque algo que deseje pesquisar.`).then(msg.channel.stopTyping(true));
    return await youtube.searchVideos(msg.args.join(' '), 1).then(async(r) => {//r = resultado
      return await msg.channel.send(`${msg.emoji.normais.bot.youtube} \`|\` Resultado de: \`${FirstUpperCase(msg.args.join(' '))}\``.split(',').join(''), {
        embed: new Embed(msg.author, 'YouTube')
        .setImage(r[0].thumbnails.high.url)
        .setThumbnail(r[0].channel.thumbnails)
        .setDescriptionArray([
          [
            `${msg.emoji.normais.bot.seta}Título: ${r[0].title}`,
            `${msg.emoji.normais.bot.seta}Publicado em: ${moment(r[0].publishedAt).format('LLLL')}`,
            `${msg.emoji.normais.bot.seta}Tipo: ${r[0].type}`
          ],[
            `${msg.emoji.normais.bot.seta}Canal: ${r[0].channel.title} - __**[link do canal](${r[0].channel.url})**__`,
            `${msg.emoji.normais.bot.seta}Link: __**[clique aqui](${r[0].shortURL})**__`,
            `${msg.emoji.normais.bot.seta}Descrição:\n${shortenerText(r[0].description, 80)}`
          ]
        ])
      }).then(msg.channel.stopTyping(true));
    })
  },
  conf: {
    alias: ['yt'],
    enable: true,
    cooldown: 25,
    permissions: {
      bot: ['SEND_MESSAGES', 'ATTACH_FILES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'youtube',
    description: 'pesquise um vídeo no youtube',
    usage: '<vídeo>',
    member: 'usuários',
    category: 'search',
    credit: ['[YouTube](https://www.youtube.com)']
  }
}