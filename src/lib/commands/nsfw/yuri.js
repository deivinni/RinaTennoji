const { Embed } = require('../../../util/functions/index'),
  { yuri, eroYuri } = new (require('nekos.life'))().nsfw;

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    const embed = new Embed(msg.author, 'Nekos.life');
    return await (msg.args[0] === '--ero' ? eroYuri() : yuri()).then(async(r) => {
      return await msg.channel.send(`Reaja em ${msg.emoji.normais.bot.reload} para mudar a imagem, ou ${msg.emoji.normais.bot.fechar} para fechar a função.`, {
        embed: embed.setImage(r.url)
      }).then(msg.channel.stopTyping(true)).then(async(message) => {
        msg.channel.stopTyping(true);
        message.react(msg.emoji.ids.normais.bot.reload).then(async() => {
          message.react(msg.emoji.ids.normais.bot.fechar);
          const collector = message.createReactionCollector((r,u) => (r.emoji.id === msg.emoji.ids.normais.bot.reload, msg.emoji.ids.normais.bot.fechar) && u.id == msg.author.id, {time: 60000});
          await collector.on('collect', async(r) => {
            switch (r.emoji.id) {
              case msg.emoji.ids.normais.bot.reload:
                await (msg.args[0] === '--ero' ? eroYuri() : yuri()).then(async(r1) => {
                  r.remove(msg.author.id)
                  return await message.edit(`Reaja em ${msg.emoji.normais.bot.reload} para mudar a imagem, ou ${msg.emoji.normais.bot.fechar} para fechar a função.`, {
                    embed: embed.setImage(r1.url)
                  })
                })
              break;
              case msg.emoji.ids.normais.bot.fechar:
                message.edit('');
                message.clearReactions();
              break;
            }
          })
          return setTimeout(() => {
            message.edit('')
            return message.clearReactions();
          }, 60000)
        });
      });
    });
  },
  conf: {
    enable: true,
    cooldown: 60,
    permissions: {
      bot: ['SEND_MESSAGES','EMBED_LINKS', 'ATTACH_FILES','MANAGE_MESSAGES','USE_EXTERNAL_EMOJIS']
    },
    nsfw: true
  },
  help: {
    name: 'yuri',
    desc: 'veja uns hentais ( ͡° ͜ʖ ͡°)',
    usage: '[--ero]',
    member: 'usuários',
    category: 'nsfw',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}