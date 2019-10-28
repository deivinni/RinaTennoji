const { readdirSync } = require('fs');

module.exports = (bot) => {
  try {
    [
      'client', 'guild', 'message'
    ].forEach(path => {
      const events = readdirSync(`./src/lib/events/${path}/`).filter(x => x.endsWith('.js'));
      for (const file of events) {
        const event = require(`../lib/events/${path}/${file}`);
        bot.on(file.split('.')[0], event.bind(null, bot));
      };
    });
  } catch (e) {
    console.error(e);
  }
}