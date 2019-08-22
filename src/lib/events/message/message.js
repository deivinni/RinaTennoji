const { emojis, prefix, owner } = require('../../../util/config'),
  { Collection } = require('discord.js');

module.exports = (bot, msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(('s.'||'S.')) {
    const args = msg.content.slice(prefix.length).trim().split(/\s+/g),
      comando = args.shift().toLowerCase(),
      cmd = bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando));
    if (cmd) {
      if (cmd.conf.ownerOnly && msg.author.id != owner) return msg.channel.send(`${emojis._normals.owner} \`|\` ${msg.author}, este comando só pode ser usado pelo meu criador!`);
      if (cmd.conf.guildOnly && msg.channel.type == 'dm') return msg.channel.send(`${emojis._normals.erro} \`|\` ${msg.author}, este comando só pode ser usado em um servidor!`);
      if (cmd.conf.manu && msg.author.id != owner) return msg.channel.send(`${emojis._normals.manu} \`|\` ${msg.author}, este comando esta em manutenção.`);
      if (!cmd.conf.enable && msg.author.id != owner) return msg.channel.send(`${emojis._normals.disable} \`|\` ${msg.author}, este comando está desabilitado.`);
      if (cmd.conf.nsfw && (!msg.channel.nsfw || msg.channel.type != 'dm')) return msg.channel.send(`🔞 \`|\` ${msg.author}, este comando só pode ser usado em um canal \`NSFW\`!`);
      if (!bot.cooldowns.get(cmd.help.name)) bot.cooldowns.set(cmd.help.name, new Collection())
      const now = Date.now(),
        timestamps = bot.cooldowns.get(cmd.help.name),
        cooldownAmount = (cmd.conf.cooldown || 3) * 1000;
      if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
          return msg.channel.send([
            `${emojis._normals.cooldown} \`|\` ${msg.author}, este comando esta em cooldown!`,
            `Utilize ele novamente em: \`${timeLeft}\` segund${timeLeft > 1 ? 'os' : 'o'}.`
          ].join('\n'))
        }
      }
      timestamps.set(msg.author.id, now)
      setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
      try { cmd.exec(bot, msg, args) } catch (e) {
        msg.channel.send([
          `${emojis._normals.erro} \`|\` ${msg.author}, ocorreu um erro inesperado!`,
          'Favor tente utiliza-lo novamente mais tarde.'
        ].join('\n'))
        bot.channels.get('609848544060506113').send([
          `${emojis._normals.text} \`|\` Comando: ${comando}`,
          `${emojis._normals.bughunter} \`|\` Usuário: ${msg.author.tag}`,
          `${emojis._normals.erro} \`|\` Erro:`,'```js',`${e.stack}`,'```'
        ].join('\n'));
        return console.log(e.stack);
      }
    } else return msg.channel.send([
      `${emojis._normals.erro} \`|\` ${msg.author}, o comando \`${comando}\` não existe!`,
      `Utilize \`${prefix}help\` para saber todos os meus comando e aliases.`
    ].join('\n'))
  } else {
    if (msg.content == (`<@${bot.user.id}>` || `<@!${bot.user.id}>`)) {
      msg.channel.send([
        `${emojis._gifs.bot_mention} \`|\` ${msg.author}, meu prefixo é \`${prefix}\`.`,
        `Utilize \`${prefix}help\` para saber meus comandos.`,
        `E \`${prefix}botinfo\` para ter informações sobre mim.`
      ].join('\n'))
    }
  }
}
