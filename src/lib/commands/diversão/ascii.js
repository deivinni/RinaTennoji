const { font } = require('ascii-art');

module.exports = {
  exec: async (msg) =>{
    msg.channel.startTyping(true);
    if (!msg.args[0]) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar alguma mensagem para ser transformada em ascii-art!`).then(msg.channel.stopTyping(true));
    if (msg.args.join(' ').length > 40) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, esta mensagem é muito longa.`).then(msg.channel.stopTyping(true));
    return font(msg.args.join(' '), 'Doom', async (rendered) => {
      rendered = rendered.trimRight();
      return await msg.channel.send(rendered, { code: 'md' }).then(msg.channel.stopTyping(true));
    });
  },
  conf: {
    enable: true,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    },
    cooldown: 15
  },
  help: {
    name: 'ascii',
    desc: 'crie uma mensagem em ascii',
    usage: '<mensagem>',
    member: 'usuários',
    category: 'diversão',
    credit: ['[Plexi Development](https://www.youtube.com/user/TrueXPixels)']
  }
}