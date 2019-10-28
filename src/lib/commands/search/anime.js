const moment = require('moment'),
  { search, loadAnime } = require('jikanjs'),
  translate = require('@vitalets/google-translate-api'),
  { Embed, shortenerText } = require('../../../util/functions/index');
moment.locale('pt-BR');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar o nome do anime desejado.`).then(msg.channel.stopTyping(true));
    try {
      return await search('anime', msg.args.join(' ')).then(async(r) => {
        return await loadAnime(r.results[0].mal_id).then(async(data) => {
          return await translate(shortenerText(data.synopsis.replace(/[[Written by MAL Rewrite]]/g,''), 500), {to: 'pt'}).then(async (res) => {
            return await msg.channel.send(`${msg.emoji.normais.bot.mal} \`|\` My Anime List`, {
              embed: new Embed(msg.author, 'My Anime List')
              .setTitleURL(`${data.title ? data.title : msg.args.join(' ')}${data.type ? ' | '+data.type : ''}`, (data.url || null))
              .setThumbnail(data.image_url ? data.image_url : null)
              .setDescriptionArray([
                [
                  `${msg.emoji.normais.bot.seta}Nomê Japonês: ${data.title_japanese || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}My Anime List ID: ${data.mal_id || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Classificação indicativa: ${data.rating || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Original: ${data.source || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Estudio: ${data.studios.map(a => a.name).join(', ') || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Gêneros: ${data.genres.map(a => a.name).slice(0, 3).join(', ')+', etc.' || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Trailer: ${'[clique aqui]('+data.trailer_url+')' || msg.emoji.normais.bot.think}`
                ],[
                  `${msg.emoji.normais.bot.seta}Ranque: #${data.rank || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Pontuação: ${data.score || msg.emoji.normais.bot.think}${data.scored_by ? `/${data.scored_by} usuários` : ''}`,
                  `${msg.emoji.normais.bot.seta}Popularidade: #${data.popularity || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Membros: ${data.members || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Favoritos: ${data.favorites || msg.emoji.normais.bot.think}`
                ],[
                  `${msg.emoji.normais.bot.seta}Episódios: ${data.episodes || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Conteúdo: ${data.status === 'Finished Airing' ? 'Completo' : 'Em lançamento'}`,
                  `${msg.emoji.normais.bot.seta}Duração dos episódios: ${data.duration.replace('per ep', 'por episódio')}`,
                  `${msg.emoji.normais.bot.seta}Data de início: ${moment.utc(data.aired.from).format('LLLL') || msg.emoji.normais.bot.think}`,
                  `${msg.emoji.normais.bot.seta}Data final: ${moment.utc(data.aired.to).format('LLLL') || msg.emoji.normais.bot.think}`
                ],[
                  `${msg.emoji.normais.bot.seta}Sinopse: ${res.text || msg.emoji.normais.bot.think}`
                ]
              ])
            }).then(msg.channel.stopTyping(true));
          })
        })
      })
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
    name: 'anime',
    description: 'pesquise por um anime no My Anime List',
    usage: '<anime>',
    member: 'usuários',
    category: 'search',
    credit: ['[Jikan](https://jikan.moe)','[My Anime List](https://myanimelist.net)']
  }
}