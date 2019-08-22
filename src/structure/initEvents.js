const { readdirSync } = require('fs');

module.exports = (bot) => {
  [
    'client','message'
  ].forEach(path => {
    const events = readdirSync(`./src/lib/events/${path}/`).filter(x => x.endsWith('.js'));
    for (const file of events) {
      const _event = require(`../lib/events/${path}/${file}`);
      bot.on(EventNameUpperCase(file.split('.')[0], '_'), _event.bind(null, bot))
    }
  })
}

function EventNameUpperCase(ctx, slice) {
  if (ctx.includes(slice)) {
    return ctx.slice(split, 1).toUpperCase.replace(slice, '') + ctx.slice(slice);
  } else {
    return ctx;
  }
}
