const { Embed } = require('../../../util/functions/index'),
  { get } = require('snekfetch');

module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true);
    const member = msg.mentions.users.filter(a => a.id != msg.bot.user.id).first();
    if (!member) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, favor mencione uma pessoa para ser sua trap card.`).then(msg.channel.stopTyping(true));
    return await get(`https://nekobot.xyz/api/imagegen?type=trap&name=${member.username}&author=${msg.author.username}&image=${member.displayAvatarURL}`).then(async(r) => {
      await msg.channel.send({
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
   name: 'trap',
   desc: 'transfome uma pessoa em sua trap card',
   usage: '<@usuário>',
   member: 'usuários',
   category: 'imagem',
   credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}