const { Embed, FormatNumber } = require('../../../util/functions/'),
  { get } = require('snekfetch');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args[0]) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, por favor coloque o jogo desejado!`).then(msg.channel.stopTyping(true));
    await get('https://store.steampowered.com/api/storesearch').query({ 
      cc: 'br', l: 'pt', term: msg.args.join(' ')
    }).then(async(search) => {
      if (search.body.total.length === 0) return msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, não encontrei nenhum jogo com este nome: \`${msg.args.join(' ')}\`!`).then(msg.channel.stopTyping(true));
      const { id, tiny_image } = search.body.items[0],
        { body }  = await get('https://store.steampowered.com/api/appdetails').query({ appids: id }),
        { data }  = body[id.toString()],
        current   = data.price_overview  ? `R$${FormatNumber(data.price_overview.final/100)}`   : 'gratuito',
        original  = data.price_overview  ? `R$${FormatNumber(data.price_overview.initial/100)}` : 'gratuito',
        price     = current === original ? current : `~~R$${original}~~ R$${current}`,
        platform  = [];
      if (data.platforms) {
        if (data.platforms.windows) platform.push('Windows');
        if (data.platforms.mac) platform.push('Mac');
        if (data.platforms.linux) platform.push('Linux');
      }
      console.log(data);
      return msg.channel.send(`${msg.emoji.normais.bot.steam} \`|\` Informações de \`${data.name}\``, {
        embed: new Embed(msg.author, 'Steam')
        .setDescriptionArray([
          [
            `${msg.emoji.normais.bot.seta}Idade: ${data.required_age || 'livre'}`,
            `${msg.emoji.normais.bot.seta}Preço: ${price}`,
            `${msg.emoji.normais.bot.seta}Avaliação: ${data.metacritic ? data.metacritic.score : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Recomedações: ${data.recommendations ? data.recommendations.total : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Platformas: ${platform.join(', ')  || msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Data de lançamento: ${data.release_date ? data.release_date.date : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Total de DLC's: ${data.dlc ? data.dlc.length : 'nenhuma'}`,
            `${msg.emoji.normais.bot.seta}Conquistas: ${data.achievements ? data.achievements.total : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Site: ${data.website ? `__**[clique aqui](${data.website})**__` : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Desenvolvedores: ${data.developers ? data.developers.join(', ') || msg.emoji.normais.bot.think : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Editoras: ${data.publishers ? data.publishers.join(', ') || msg.emoji.normais.bot.think : msg.emoji.normais.bot.think}`,
            `${msg.emoji.normais.bot.seta}Genêros: ${data.genres ? data.genres.map(c => c.description).join(', ') : msg.emoji.normais.bot.think}`
          ],[ `${msg.emoji.normais.bot.seta}Descrição: ${data.short_description || msg.emoji.normais.bot.think}` ]
        ]).setImage(`${tiny_image}`.replace('231','616').replace('87','353'))
      }).then(msg.channel.stopTyping(true));
    });
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