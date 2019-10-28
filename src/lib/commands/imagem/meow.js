const { meow } = new (require('nekos.life'))().sfw,
  { Embed } = require('../../../util/functions/index');

module.exports = {
  exec: async(msg) => {
    msg.channel.startTyping(true);
    const embed = new Embed(msg.author, 'Nekos.life');
    return await meow().then(async(img) => {
      return await msg.channel.send(`Reaja em ${msg.emoji.normais.bot.reload} para mudar a imagem, ou ${msg.emoji.normais.bot.fechar} para fechar a função.`, {
        embed: embed.setImage(img.url)
      }).then(msg.channel.stopTyping(true)).then(async(message) => {
        message.react(msg.emoji.ids.normais.bot.reload).then(async() => {
          message.react(msg.emoji.ids.normais.bot.fechar);
          const collector = message.createReactionCollector((r,u) => (r.emoji.id === msg.emoji.ids.normais.bot.reload, msg.emoji.ids.normais.bot.fechar) && u.id == msg.author.id, {time: 60000});
          await collector.on('collect', async(r) => {
            switch (r.emoji.id) {
              case msg.emoji.ids.normais.bot.reload:
                await meow().then(async(r1) => {
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
          });
          return setTimeout(() => {
            message.edit('')
            return message.clearReactions();
          }, 60000)
        });
      });
    });
  },
  conf:{ 
    alias: ['gato','gatinho'],
    enable: true,
    cooldown: 60,
    permissions: {
      bot: ['SEND_MESSAGES','EMBED_LINKS', 'ATTACH_FILES','MANAGE_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'meow',
    desc: 'veja imagens de gatinhos',
    member: 'usuários',
    category: 'imagem',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}