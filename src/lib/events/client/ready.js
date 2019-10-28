const { prefixo, emojis } = require('../../../util/config')

module.exports = async (bot) => {
  bot.user.setPresence({
    status: 'online',
    game: {
      name: `${prefixo[0]}help | ${bot.users.size} users!`,
      type: 'STREAMING',
      url: 'https://www.twitch.tv/deivinni_'
    }
  });
  await bot.channels.get('609848544060506113').send(`${emojis.normais.discord.authorized} \`|\` Iniciada com sucesso!`);
  return console.log('Inicializada com sucesso!');
}