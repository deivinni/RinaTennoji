module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    return await msg.channel.send(`${msg.emoji.gifs.discord.latency} \`|\` ${msg.author}, minha lantência é \`${Math.floor(msg.bot.ping)}\` ms!`).then(msg.channel.stopTyping(true));
  },
  conf: {
    alias: ['latency'],
    cooldown: 5,
    enable: true,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'ping',
    desc: 'veja a minha latência',
    member: 'usuários',
    category: 'informações'
  }
}