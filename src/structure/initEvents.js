const { readdirSync } = require('fs');

module.exports = (bot) => {
  [
    'client','message'
  ].forEach(path => {
    const events = readdirSync(`./src/lib/events/${path}/`).filter(x => x.endsWith('.js'));
    for (const file of events) {
      const _event = require(`../lib/events/${path}/${file}`);
      bot.on(file.split('.')[0], _event.bind(null, bot))
    }
  })
}