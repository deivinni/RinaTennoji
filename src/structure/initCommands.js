const { readdirSync } = require('fs');

module.exports = (bot) => {
  try {
    [
      'informações'
    ].forEach(path => {
      const commands = readdirSync(`./src/lib/commands/${path}/`).filter(x => x.endsWith('.js'));
      for (const file of commands) {
        const cmd = require(`../lib/commands/${path}/${file}`);
        if (!cmd.conf.enable) return;
        else {
          bot.commands.set(cmd.help.name, cmd);
          if (!cmd.conf.aliases) return;
          else {
            cmd.conf.aliases.forEach(alias => bot.aliases.set(alias, cmd.help.name))
          }
        }
      }
    })
  } catch (e) {
    console.error(e);
  }
}
