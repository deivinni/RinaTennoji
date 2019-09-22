const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  { neko, nekoGif } = new (require('nekos.life'))().sfw;

module.exports = {
  exec: async(bot, msg, args) => {
    const embed = new Embed(msg.author)
    (args[0] == '--gif' ? nekoGif() : neko()).then(img => {
      msg.channel.send(`Reaja em ${Emojis.Normais.Bot.Reload} para trocar a imagem.`, {embed: embed.setImage(img.url)}).then(m => {
        m.react(Emojis.IDs.Normais.Bot.Reload)
        const collector = m.createReactionCollector((r,u) => r.emoji.id === Emojis.IDs.Normais.Bot.Reload && u.id == msg.author.id, {time: 60000});
        collector.on('collect', (r) => {
          switch (r.emoji.id) {
            case Emojis.IDs.Normais.Bot.Reload:
              (args[0] == '--gif' ? nekoGif() : neko()).then(img2 => {
                r.remove(msg.author.id)
                m.edit(embed.setImage(img2.url)).catch();
              })
            break;
          }
        })
        setTimeout(() => {
          m.edit('')
          m.clearReactions();
        }, 60000)
      }).catch();
    })
  },
  conf:{ enable: true, cooldown: 60 },
  help: {
    name: 'neko',
    description: 'veja umas imagens de nekos',
    usage: '[--gif]',
    member: 'usuários',
    category: 'imagem',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}