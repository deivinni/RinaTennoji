module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar a mensagem desejada para ser transformada em código morse.`).then(msg.channel.stopTyping(true));
    let morse = {
      'a': '.-',     'b': '-...',   'c': '-.-.',   'd': '-..',
      'e': '.',      'f': '..-.',   'g': '--.',    'h': '....',
      'i': '..',     'j': '.---',   'k': '-.-',    'l': '.-..',
      'm': '--',     'n': '-.',     'o': '---',    'p': '.--.',
      'q': '--.-',   'r': '.-.',    's': '...',    't': '-',
      'u': '..-',    'v': '...-',   'w': '.--',    'x': '-..-',
      'y': '-.--',   'z': '--..',
      '0': '-----',  '1': '.----',  '2': '..---',  '3': '...--',
      '4': '....-',  '5': '.....',  '6': '-....',  '7': '--...',
      '8': '---..',  '9': '----.',
      '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
      '!': '-.-.--', '/': '-..-.',  '(': '-.--.',  ')': '-.--.-',
      '&': '.-...',  ':': '---...', ';': '-.-.-.', '=': '-...-',
      '+': '.-.-.',  '-': '-....-', '"': '.-..-.', '$': '...-..-',
      '@': '.--.-.',
      'à': '.--.-',  'ä': '.-.-',   'å': '.--.-',  'ą': '.-.-',
      'æ': '.-.-',   'ć': '-.-..',  'ĉ': '-.-..',  'ç': '-.-..',
      'ch': '----',  'đ': '..-..',  'ð': '..--.',  'é': '..-..',
      'è': '.-..-',  'ę': '..-..',  'ĝ': '--.-.',  'ĥ': '----',
      'ĵ': '.---.',  'ł': '.-..-',  'ń': '--.--',  'ñ': '--.--',
      'ó': '---.',   'ö': '---.',   'ø': '---.',   'ś': '...-...',
      'ŝ': '...-.',  'š': '----',   'þ': '.--..',  'ü': '..--',
      'ŭ': '..--',   'ź': '--..-.', 'ż': '--..-',  ' ': '\u2007'
    }
    return await msg.channel.send([
      `${msg.emoji.normais.discord.authorized} \`|\` ${msg.author}, aqui está o seu \`código morse\`:`,
      '```',
      `${msg.args.join(' ').toLowerCase().replace(/./g, x => morse[x]+'\u2007').replace(/undefined/g, 'sem_tradução\u2007').trim()}`,
      '```'
    ].join('\n')).then(msg.channel.stopTyping(true));
  },
  conf:{
    enable: true,
    cooldown: 15,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'morse',
    desc: 'transforme uma frase em código morse.',
    usage: '<mensagem>',
    member: 'usuários',
    category: 'utilidade',
    credit: ['[BastionBot](https://github.com/TheBastionBot/Bastion)']
  }
}