const { Prefixo, Emojis } = require('../../../util/config');

module.exports = (bot) => {
  try {
    bot.user.setPresence({
      status: 'online', 
      game: {
        name: `${Prefixo[0]}help | ${bot.users.size} usuários!`, 
        type: 'STREAMING', url: 'https://www.twitch.tv/deivinni_'
      }
    });
    bot.channels.get('609848544060506113').send(`${Emojis.Normais.Discord.Authorized} \`|\` Inicializada com sucesso!`);
    console.log('Inicializada com sucesso!');
  } catch (e) {
    console.error(e)
  }
}