const { Embed } = require('../../../util/functions/index'),
  { get } = require('snekfetch');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar uma mensagem.`).then(msg.channel.stopTyping(true));
    return await get(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${msg.args.join(' ')}`).then(async(r) => {
      msg.delete();
      return await msg.channel.send({
        embed: new Embed(msg.author, 'NekoBot').setImage(r.body.message)
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf: {
    enable: true,
    cooldown: 15,
    permissions: {
      member: ['ATTACH_FILES'],
      bot: ['SEND_MESSAGES','ATTACH_FILES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'kanna',
    desc: 'faça a kanna-chan mandar uma mensagem',
    usage: '<mensagem>',
    member: 'usuários',
    category: 'imagem',
    credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}