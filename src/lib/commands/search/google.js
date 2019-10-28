const request = require('request-promise-native'),
  { load } = require('cheerio'),
  { Embed, shortenerText } = require('../../../util/functions/');

module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true)
    try {
      if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, digite algo que queira pesquisar.`).then(msg.channel.stopTyping(true));
      let response = await request({
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:68.0) Gecko/20100101 Firefox/68.0'
        },
        url: 'http://google.com/search',
        qs: {
          q: msg.args.join(' '),
          safe: 'active'
        }
      });
      let $ = load(response);
      let results = [];
      $('.g').each(i => {
        results[i] = {};
      });
      $('.g .r a h3').each((i, e) => {
        let link = e.parent.attribs['href'];
        results[i]['name'] = `${getText(e)} - ${link}`;
      });
      $('.g .s .st').each((i, e) => {
        results[i]['value'] = `${shortenerText(getText(e), 300)}`;
      });
      results = results.filter(r => r.name && r.value).slice(0, 4);

      return await msg.channel.send(`${msg.emoji.normais.bot.google} \`|\` Resultados de \`${msg.args.join(' ')}\``, {
        embed: new Embed(msg.author, 'Google', {
          fields: results
        })
      }).then(msg.channel.stopTyping(true));
    } catch (e) {
      console.log(e.stack);
      return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, ocorreu um erro inesperado ao executar este comando. Tente novamente mais tarde!`).then(msg.channel.stopTyping(true));
    }
  },
  conf:{
    alias: ['go'],
    enable: true,
    cooldown: 25,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'google',
    desc: 'pesquise algo no google.',
    usage: '<pesquisa>',
    member: 'usuários',
    category: 'search',
    credit: ['[Google](https://www.google.com)','[BastionBot](https://github.com/TheBastionBot/Bastion)']
  }
}
function getText(children) {
  if (children.children) return getText(children.children);
  return children.map(c => {
    return c.children ? getText(c.children) : c.data;
  }).join('');
}