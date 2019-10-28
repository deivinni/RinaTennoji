const { Embed } = require('../../../util/functions/index'),
  { get } = require('snekfetch');

module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true);
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar uma mensagem que desaja comentar no pornhub.`).then(msg.channel.stopTyping(true));
    return await get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${msg.author.displayAvatarURL}&username=${msg.author.username}&text=${msg.args.join(' ')}`).then(async(r) => {
      msg.delete();
      return await msg.channel.send({
        embed: new Embed(msg.author, 'NekoBot').setImage(r.body.message)
      }).then(msg.channel.stopTyping(true));
    });
  },
  conf:{ 
    enable: true, 
    cooldown: 15,
    permissions: {
      member: ['ATTACH_FILES'],
      bot: ['SEND_MESSAGES','ATTACH_FILES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'pornhub',
    desc: 'faça um comentario no pornhub',
    usage: '<mensagem>',
    member: 'usuários',
    category: 'imagem',
    credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}