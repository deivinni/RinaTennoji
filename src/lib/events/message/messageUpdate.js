const { prefixo } = require('../../../util/config');

module.exports = (bot, old, _new) => {
  prefixo.find(prefix => {
    if (_new.content.toLowerCase().startsWith(prefix)) {
      bot.emit('message', _new);
    } else return;
  })
}