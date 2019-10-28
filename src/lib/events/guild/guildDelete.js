const { prefixo } = require('../../../util/config');

module.exports = (bot, guild) => {
  bot.user.setPresence({
    status: 'online',
    game: {
      name: `${prefixo[0]}help | ${bot.users.size} users!`,
      type: 'STREAMING',
      url: 'https://www.twitch.tv/deivinni_'
    }
  });
}