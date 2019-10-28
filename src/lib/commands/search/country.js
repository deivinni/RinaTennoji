const { Embed, FormatNumber, shortenerText } = require('../../../util/functions/'),
  fetch = require('node-fetch');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar o nome do país que queira ver as informações.`).then(msg.channel.stopTyping(true));
    try {
      const data = await fetch(`https://restcountries.eu/rest/v2/${msg.args.join(' ').length <= 3 ? 'alpha' : 'name'}/${encodeURIComponent(msg.args.join(' '))}`)
        .then(res => res.json())
        .then(body => body[0] || body)
        .catch(err => err);

      return await msg.channel.send(`:flag_${data.alpha2Code.toLowerCase()}: \`|\` Informações de \`${data.name}\``, {
        embed: new Embed(msg.author, 'REST Countries')
        .setDescriptionArray([
          [
            `${msg.emoji.normais.bot.seta}Também conhecido como: ${shortenerText(data.altSpellings.join(', '), 50)}`
          ],
          [
            `${msg.emoji.normais.bot.seta}Nome nativo: ${data.nativeName}`,
            `${msg.emoji.normais.bot.seta}Idiomas: ${data.languages.map(l => `${l.name} (${l.nativeName})`).join(', ')}`,
            `${msg.emoji.normais.bot.seta}Capital: ${data.capital}`,
            `${msg.emoji.normais.bot.seta}Região: ${data.region} / ${data.subregion}`,
            `${msg.emoji.normais.bot.seta}População: ${FormatNumber(data.population)} pessoas`,
            `${msg.emoji.normais.bot.seta}Área: ${FormatNumber(data.area)} km²`,
            `${msg.emoji.normais.bot.seta}Fusos horários: ${shortenerText(data.timezones.join(', '), 50)}`
          ],
          [
            `${msg.emoji.normais.bot.seta}Moedas: ${data.currencies.map(c => `${c.name} (${c.symbol})`).join(', ')}`,
            data.regionalBlocs.length > 0 ? `${msg.emoji.normais.bot.seta}Tratados: ${data.regionalBlocs.map(b => `${b.acronym} - ${b.name}`).join(', ')}` : null
          ]
        ])
      }).then(msg.channel.stopTyping(true));
    } catch (e) {
      console.log(e.stack);
      return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, ocorreu um erro inesperado! Tente novamente mais tarde!`).then(msg.channel.stopTyping(true));
    }
  },
  conf: {
    alias: ['país','nação'],
    enable: true,
    cooldown: 20,
    permissions: {
      bot: ['SEND_MESSAGES','EMBED_LINKS','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'country',
    desc: 'veja as informações de alguma nação',
    usage: '<nação>',
    member: 'usuários',
    category: 'search',
    credit: ['[Switchblade](https://github.com/SwitchbladeBot)','[REST Countries](https://restcountries.eu)']
  }
}