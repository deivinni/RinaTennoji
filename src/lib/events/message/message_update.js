const { prefix } = require('../../../util/config');

module.exports = (bot, _, newMsg) => {
  if (newMsg.content.startsWith(prefix)) {
    return bot.emit('message', newMsg);
  } else return;
}
