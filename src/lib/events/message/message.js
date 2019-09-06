const { Emojis, Owner, Prefixo } = require('../../../util/config'),
  { Collection } = require('discord.js');

module.exports = (bot, msg) => {
  if (!msg.author.bot) {
    Prefixo.find(prefix => {
      if (msg.content.toLowerCase().startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/\s+/g),
          comando = args.shift().toLowerCase(),
          cmd = bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando));
        if (cmd) {
          if (cmd.conf.ownerOnly && msg.author.id != Owner) return msg.channel.send(`${Emojis.Normais.Discord.Owner} \`|\` ${msg.author}, este comando só pode ser usado pelo meu criador!`);
          if (cmd.conf.guildOnly && msg.channel.type == 'dm') return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, este comando só pode ser usado em um servidor!`);
          if (cmd.conf.manu && msg.author.id != Owner) return msg.channel.send(`${Emojis.Normais.Bot.Manutenção} \`|\` ${msg.author}, este comando esta em manutenção.`);
          if (!cmd.conf.enable && msg.author.id != Owner) return msg.channel.send(`${Emojis.Normais.Discord.Enable.Disable} \`|\` ${msg.author}, este comando está desabilitado.`);
          if (cmd.conf.nsfw && (!msg.channel.nsfw || msg.channel.type != 'dm')) return msg.channel.send(`🔞 \`|\` ${msg.author}, este comando só pode ser usado em um canal \`NSFW\`!`);
          if (!bot.cooldowns.get(cmd.help.name)) bot.cooldowns.set(cmd.help.name, new Collection())
          const now = Date.now(),
            timestamps = bot.cooldowns.get(cmd.help.name),
            cooldownAmount = (cmd.conf.cooldown || 3) * 1000;
          if (timestamps.has(msg.author.id)) {
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
            if (now < expirationTime) {
              const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
              return msg.channel.send(`${Emojis.Normais.Discord.Cooldown} \`|\` ${msg.author}, utilize este comando novamente em \`${timeLeft}\`s!`)
            }
          }
          timestamps.set(msg.author.id, now);
          setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
          try { cmd.exec(bot, msg, args) } catch (e) {
            msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, ocorreu um erro inesperado! Favor tente utiliza-lo novamente mais tarde.`)
            return console.log(e.stack);
          }
        } else if (!Prefixo.some(ctx => msg.content == ctx)) {
            msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, o comando \`${comando}\` não existe! Utilize \`${Prefixo[0]}help\` para ver todos os meus comandos.`)
          }
      } else return;
    })
    if (msg.content == msg.guild.me.toString()) {
      return msg.channel.send(`${Emojis.Gifs.Bot.BotMention} \`|\` ${msg.author}, meu prefixo é \`${Prefixo[0]}\`, utilize \`${Prefixo[0]}help\` para saber meus comandos.`);
    }
  }
}