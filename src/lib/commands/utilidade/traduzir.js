const translate = require('@vitalets/google-translate-api'),
  { Embed } = require('../../../util/functions/index')

module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, coloque um idioma para traduzir e a mensagem.`).then(msg.channel.stopTyping(true));
    translate(`${msg.args.slice(1).join(' ')}`, {to: `${msg.args[0]}`}).then(async(res) => {
      msg.delete();
      return await msg.channel.send({
        embed: new Embed(msg.author, 'Google Translator')
        .setThumbnail('https://i.redd.it/zurtc1epmh111.gif')
        .setAuthor('Tradutor', msg.bot.user.displayAvatarURL, 'https://translate.google.com/')
        .addFieldArray('📥 | Mensagem original', [['```',`${msg.args.slice(1).join(' ')}`,'```']])
        .addFieldArray('📤 | Mensagem traduzida', [['```',`${res.text}`,'```']])
      }).then(msg.channel.stopTyping(true));
    }).catch(async() => await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você inseriu um idioma inválido. Tente colocar a abreviação dele, exemplo: \`Inglês\` -> \`en\``).then(msg.channel.stopTyping(true)));
  },
  conf:{ 
    alias: ['translate'],
    enable: true,
    cooldown: 20,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'traduzir',
    desc: 'traduza alguma mensagem',
    usage: '<odioma> <mensagem>',
    member: 'usuários',
    category: 'utilidades',
    credit: ['[Google Tradutor](https://translate.google.com)']
  }
}