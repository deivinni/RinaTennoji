const { Emojis } = require('../../../util/config')

module.exports = (bot, error) => {
  bot.channels.get('609848544060506113').send([
    `${Emojis.Normais.Discord.Channel.Text} \`|\` Comando: ${comando}`,
    `${Emojis.Normais.Discord.BugHunter} \`|\` Usuário: ${msg.author.tag}`,
    `${Emojis.Normais.Discord.Outage} \`|\` Erro:`,'```js',`${error.stack}`,'```'
  ].join('\n'));
}