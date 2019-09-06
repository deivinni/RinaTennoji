const { Prefixo } = require('../../../util/config');

module.exports = (bot, _, newMsg) => {
  Prefixo.find(prefix => {
    if (newMsg.content.toLowerCase().startsWith(prefix)) {
      return bot.emit('message', newMsg);
    } else return;
  })
}