const { Embed } = require('../../../util/functions/'),
  { get } = require('snekfetch');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    try {
      if (!msg.args[0]) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, por favor coloque o jogo desejado!`).then(msg.channel.stopTyping(true));
      const search = await get('https://store.steampowered.com/api/storesearch').query({ cc: 'br', l: 'pt', term: msg.args.join(' ') });
      if (search.body.total.length === 0) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, não encontrei nenhum jogo com este nome: \`${msg.args.join(' ')}\`!`).then(msg.channel.stopTyping(true));
      const { id, tiny_image } = search.body.items[0],
        { body } = await get('https://store.steampowered.com/api/appdetails').query({ appids: id }),
        { data } = body[id.toString()],
        current = data.price_overview ? (data.price_overview.final/100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'Gratuito',
        original = data.price_overview ? (data.price_overview.initial/100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'Gratuito',
        price = current === original ? current : `~~${original}~~ ${current}`,
        plataform = [];
      if (data.plataforms) {
        if (data.plataforms.windows) plataform.push('Windowns');
        if (data.plataforms.mac) plataform.push('Mac');
        if (data.plataforms.linux) plataform.push('Linux');
      }
      return await msg.channel.send(`${msg.emoji.normais.bot.steam} \`|\` Informações de \`${data.name}\``, {
        embed: new Embed(msg.author, 'Steam')
        .setDescriptionArray([
          [
            `${msg.emoji.normais.bot.seta}Idade: ${data.required_age || 'livre'}`,
            `${msg.emoji.normais.bot.seta}Preço: ${price}`,
            `${msg.emoji.normais.bot.seta}Avaliação: ${data.metacritic ? data.metacritic.score : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Recomedações: ${data.recommendations ? data.recommendations.total : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Plataformas: ${plataform.join(', ') || msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Data de lançamento: ${data.release_date ? data.release_date.date : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Total de DLC's: ${data.dlc ? data.dlc.length : 'nenhuma'}`,
            `${msg.emoji.normais.bot.seta}Conquistas: ${data.achievements ? data.achievements.total : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Site: ${data.website ? `__**[clique aqui](${data.website})**__` : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Desenvolvedores: ${data.developers ? data.developers.join(', ') || msg.emoji.normais.bot.think : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Editoras: ${data.publishers ? data.publishers.join(', ') || msg.emoji.normais.bot.think : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Genêros: ${data.genres ? data.genres.map(c => c.description).join(', ') : msg.emoji.normais.bot.think}`
          ],[
            `${msg.emoji.normais.bot.seta}Descrição: ${data.short_description || msg.emoji.normais.bot.think}`
          ]
        ])
        .setImage(`${tiny_image}`.replace('231','616').replace('87','353'))
      }).then(msg.channel.stopTyping(true));
    } catch (e) {
      console.log(e.stack);
      return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, ocorreu um erro inesperado! Tente novamente mais tarde!`).then(msg.channel.stopTyping(true));
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
    name: 'steam',
    desc: 'pesquise por algum usuário do steam',
    usage: '<usuário>',
    member: 'usuários',
    caregory: 'game',
    credit: ['[Steam](https://store.steampowered.com/?l=portuguese)']
  }
}