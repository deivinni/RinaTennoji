const moment = require('moment'),
  { search, loadManga } = require('jikanjs'),
  translate = require('@vitalets/google-translate-api'),
  { Embed, shortenerText } = require('../../../util/functions/index');
moment.locale('pt-BR');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar um manga que queira pesquisar.`).then(msg.channel.stopTyping(true));
    try {
      return await search('manga', msg.args.join(' ')).then(async(r) => {
        return await loadManga(r.results[0].mal_id).then(async(data) => {
          return await translate(shortenerText(data.synopsis.replace(' [Written by MAL Rewrite]',''), 500), {to: 'pt'}).then(async (res) => {
            return await msg.channel.send(`${msg.emoji.normais.bot.mal} \`|\` My Anime List`, {
              embed: new Embed(msg.author, 'My Anime List')
              .setTitleURL(`${data.title || msg.args.join(' ')}${' | '+data.type || ''}`, data.url || null)
              .setThumbnail(data.image_url ? data.image_url : null)
              .setDescriptionArray([
                [
                  `${msg.emoji.normais.bot.seta}Nomê Japonês: ${data.title_japanese || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}My Anime List ID: ${data.mal_id || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Autores: ${data.authors.map(a => a.name).join(', ') || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Gêneros: ${data.genres.map(a => a.name).slice(0, 3).join(', ')+', etc.' || msg.emoji.normais.bot.think}`
                ],[
                  `${msg.emoji.normais.bot.seta}Ranque: #${data.rank || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Pontuação: ${data.score || msg.emoji.normais.bot.think}${data.scored_by ? `/${data.scored_by} usuários` : ''}`,
                  `${msg.emoji.normais.bot.seta}Popularidade: #${data.popularity || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Membros: ${data.members || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Favoritos: ${data.favorites || msg.emoji.normais.bot.think}`
                ],[
                  `${msg.emoji.normais.bot.seta}Volumes: ${data.volumes != null ? data.volumes : msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Capitulos: ${data.chapters != null ? data.chapters : msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Conteúdo: ${data.status === 'Finished Airing' ? 'Completo' : 'Em lançamento'}`,
                  `${msg.emoji.normais.bot.seta}Data de início: ${data.published.from != null ? moment.utc(data.published.from).format('LLLL') : msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Data final: ${data.published.to != null ? moment.utc(data.published.to).format('LLLL') : msg.emoji.normais.bot.think}`
                ],[
                  `${msg.emoji.normais.bot.seta}Sinopse: ${res.text || msg.emoji.normais.bot.think}`
                ]
              ])
            }).then(msg.channel.stopTyping(true));
          });
        });
      });
    } catch (e) {
      console.log(e.stack);
      return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, ocorreu um erro inesperado. Tente novamente mais tarde.`).then(msg.channel.stopTyping(true));
    }
  },
  conf: {
    enable: true,
    cooldown: 20,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    },
    manu: true
  },
  help: {
    name: 'manga',
    description: 'pesquise por um manga no My Anime List',
    usage: '<manga>',
    member: 'usuários',
    category: 'search',
    credit: ['[Jikan](https://jikan.moe)','[My Anime List](https://myanimelist.net)']
  }
}