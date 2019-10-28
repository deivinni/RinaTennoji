const { prefixo, owner, emojis, permis } = require('../util/config'),
  { Collection } = require('discord.js'),
  moment = require('moment');
moment.locale('pt-BR');
require('moment-duration-format');

module.exports = async (bot, msg, cmd, comando) => {
  msg.channel.startTyping(true);
  if (cmd) {
    var cooldown = (cmd.conf.cooldown || 3);
    if (cmd.conf.ownerOnly && msg.author.id != owner) {
      msg.channel.send(`${emojis.normais.discord.owner} \`|\` ${msg.author}, este comando só poder ser usado pelo meu criador.`).then(msg.channel.stopTyping(true));
      return cooldown = 3
    } else if (cmd.conf.guildOnly && msg.channel.type == 'dm') {
      msg.channel.send(`${emojis.normais.discord.channel.text} \`|\` ${msg.author}, este comando não poder ser usado no meu DM.`).then(msg.channel.stopTyping(true));
      return cooldown = 3
    } else if (cmd.conf.manu && msg.author.id != owner) {
      msg.channel.send(`${emojis.normais.bot.manutenção} \`|\` ${msg.author}, este comando está em manutenção. Tente usa-lo novamente mais tarde!`).then(msg.channel.stopTyping(true));
      return cooldown = 3
    } else if (!cmd.conf.enable && msg.author.id != owner) {
      msg.channel.send(`${emojis.normais.discord.outage} \`|\` ${msg.author}, este comando está indisponível no momento!`).then(msg.channel.stopTyping(true));
      return cooldown = 3
    } else if (cmd.conf.nsfw && !msg.channel.nsfw) {
      msg.channel.send(`🔞 \`|\` ${msg.author}, este comando só poder ser usado em um canal \`NSFW\`!`).then(msg.channel.stopTyping(true));
      return cooldown = 3
    } else if (cmd.conf.permissions) {
      if (cmd.conf.permissions.member) {
        if (!cmd.conf.permissions.member.some(perm => msg.member.hasPermission(perm))) {
          msg.channel.send(`${emojis.normais.discord.outage} \`|\` ${msg.author}, você precisa das seguintes permissões para usar este comando: ${cmd.conf.permissions.member.map(perm => `\`${permis[perm].name}\``).join(', ')}.`).catch(() => {
            return msg.author.send(`${emojis.normais.discord.outage} \`|\` ${msg.author}, você precisa das seguintes permissões para usar este comando: ${cmd.conf.permissions.member.map(perm => `\`${permis[perm].name}\``).join(', ')}.`).then(msg.channel.stopTyping(true));
          }).then(msg.channel.stopTyping(true));
          return cooldown = 3
        } else cooldown = cooldown
      } else if (cmd.conf.permissions.bot) {
        if (!cmd.conf.permissions.bot.some(perm => msg.guild.me.hasPermission(perm))) {
          msg.channel.send(`${emojis.normais.discord.outage} \`|\` ${msg.author}, eu preciso das seguintes permissões para executar o comando \`${comando}\`: ${cmd.conf.permissions.bot.map(perm => `\`${permis[perm].name}\``).join(', ')}.`).catch(() => {
            return msg.author.send(`${emojis.normais.discord.outage} \`|\` ${msg.author}, eu preciso das seguintes permissões para executar o comando \`${comando}\`: ${cmd.conf.permissions.bot.map(perm => `\`${permis[perm].name}\``).join(', ')}.`).then(msg.channel.stopTyping(true));
          }).then(msg.channel.stopTyping(true));
          return cooldown = 3
        } else cooldown = cooldown
      }
    }
    
    if (!bot.cooldowns.get(cmd.help.name)) bot.cooldowns.set(cmd.help.name, new Collection)
    const now = Date.now(),
      timestamps = bot.cooldowns.get(cmd.help.name),
      cooldown_amount = ((cmd.cooldown || cooldown || 3) * 1000);
    if (timestamps.has(msg.author.id)) {
      const expiration_time = timestamps.get(msg.author.id) + cooldown_amount;
      if (now < expiration_time) {
        const timeLeft = expiration_time - now;
        return await msg.channel.send(`${emojis.normais.discord.cooldown} \`|\` ${msg.author}, utilize este comando novamente em: ${
          moment.duration(timeLeft).format('`D` [d], `H` [h], `m` [min], `s` [segs]')
        }!`).then(msg.channel.stopTyping(true));
      }
    }
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldown_amount);

    try { cmd.exec(msg) }
    catch (e) { console.error(e) }

  } else if (!prefixo.some(_msg => msg.content == _msg)) {
    return await msg.channel.send(`${emojis.normais.discord.outage} \`|\` ${msg.author}, o comando \`${comando}\` não existe! Utilize \`${prefixo[0]}help\` para ver meus comandos existentes.`).then(msg.channel.stopTyping(true));
  } else return;
}