const { Embed } = require('../../../util/functions/index'),
  { get } = require('snekfetch')

module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar alguma mensagem para o Donald Trump tuítar.`).then(msg.channel.stopTyping(true));
    return await get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${msg.args.join(' ')}`).then(async (r) => {
      msg.delete();
      return await msg.channel.send({
        embed: new Embed(msg.author, 'NekoBot').setImage(r.body.message)
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf:{ 
    alias: ['trumptweet'], 
    enable: true, 
    cooldown: 15,
    permissions: {
      member: ['ATTACH_FILES'],
      bot: ['SEND_MESSAGES','ATTACH_FILES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'trump',
    desc: 'faça o Donald Trump tuítar algo',
    usage: '<mensagem>',
    member: 'usuários',
    category: 'imagem',
    credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}