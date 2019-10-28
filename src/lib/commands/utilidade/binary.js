module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar a mensagem para ser transformada.`).then(msg.channel.stopTyping(true));
    if (msg.args.join(' ').length <= 200) {
        return await msg.channel.send([
          `${msg.emoji.normais.discord.authorized} \`|\` ${msg.author}, pronto! Sua mensagem foi transformada em código binário:`,
          '```',`${textBinary(msg.args.join(' '))}`,'```'
        ].join('\n')).then(msg.channel.stopTyping(true));
    } else return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, infelizmente sua mensagem contem mais de 200 caracteres!`).then(msg.channel.stopTyping(true));
  },
  conf: {
    alias: ['binário'],
    cooldown: 15,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    },
    enable: true
  },
  help: {
    name: 'binary',
    desc: 'transforme uma mensagem em código binário, ou vice-versa',
    usage: '<menssagem>',
    member: 'usuários',
    category: 'utilidade',
    credit: ['[Switchblade](https://github.com/SwitchbladeBot)']
  }
}

function textBinary (text) {
  return text.split('').map(function (char) {
    return char.charCodeAt(0).toString(2)
  }).join(' ')
}

function binaryText (binary) {
  return parseInt(binary, 2).toString(10)
}