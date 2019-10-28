const request = require('request-promise-native'),
  { Embed, shortenerText } = require('../../../util/functions/index');

module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true);
    if (!msg.args[0]) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você precisa colocar algo que queira pesquisar no Wikipédia.`).then(msg.channel.stopTyping(true));
    let response = await request({
      url: `https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${msg.args.join(' ')}`,
      json: true
    });
    response = response.query.pages[0]
    if (response.missing) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, não foi possivel encontrar nada sobre \`${msg.args.join(' ')}\`.`).then(msg.channel.stopTyping(true));
    return await msg.channel.send(`${msg.emoji.normais.bot.wikipedia} \`|\` Wikipédia`, {
      embed: new Embed(msg.author, 'Wikipédia').setTitle(`[Veja a matéria no site do Wikipédia](${response.fullurl})`)
      .addField(response.title || msg.args.join(' '), `${response.extract.length < 1000 ? shortenerText(response.extract, 950) : shortenerText(response.extract, 950)}...\n**[Ler mais](${response.fullurl})**`)
      .setImage(response.thumbnail ? response.thumbnail.source : '')
      .setThumbnail('https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png')
    }).then(msg.channel.stopTyping(true));
  },
  conf:{
    alias: ['wiki','wikipedia'],
    enable: true,
    cooldown: 25,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'wikipédia',
    desc: 'pesquise algo no wikipédia',
    usage: '<pesquisa>',
    member: 'usuários',
    category: 'search',
    credit: ['[Wikipédia](https://pt.wikipedia.org/)','[BastionBot](https://github.com/TheBastionBot/Bastion)']
  }
}