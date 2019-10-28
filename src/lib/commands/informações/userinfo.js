const { Embed } = require('../../../util/functions/index'), moment = require('moment'); moment.locale('pt-BR');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    try {
      const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]) || msg.author,
        status = member.presence.status == 'idle' ? msg.emoji.normais.discord.status.idle : member.presence.status == 'online' ? msg.emoji.normais.discord.status.online : member.presence.status == 'dnd' ? msg.emoji.normais.discord.status.dnd : usuario.presence.status == 'offline' ? msg.emoji.normais.discord.status.offline : usuario.presence.status == 'steam' ? msg.emoji.normais.discord.status.streaming : msg.emoji.normais.bot.think;
      return await msg.channel.send(`${msg.emoji.normais.bot.membros} \`|\` Informações de ${msg.guild.member(member).nickname || member.username}`, {
        embed: new Embed(msg.author, false)
        .setThumbnail(member.displayAvatarURL)
        .setDescriptionArray([
          [
            `${msg.emoji.normais.bot.seta}Nome: ${member.username} (ID: \`${member.id}\`)`,
            `${msg.emoji.normais.bot.seta}Avatar: __**[clique aqui](${member.displayAvatarURL.endsWith('.gif') ? `${member.displayAvatarURL}?size=2048` : member.displayAvatarURL})**__`,
            `${msg.emoji.normais.bot.seta}Status: ${status}`,
            `${msg.emoji.normais.bot.seta}Jogando: ${member.presence.game ? member.presence.game.name : `nada... ${msg.emoji.normais.bot.cry}`}`,
            `${msg.emoji.normais.bot.seta}Conta criada: ${moment(member.createdAt).format('LLL')} (${moment().diff(moment(member.createdAt), 'days')} dias)`
          ],[
            `${msg.emoji.normais.bot.seta}Apelido: ${msg.guild.member(member).nickname || `sem apelido... ${msg.emoji.normais.bot.cry}`}`,
            `${msg.emoji.normais.bot.seta}Entrou: ${moment(msg.guild.member(member).joinedAt).format('LLL')} (${moment().diff(moment(msg.guild.member(member).joinedAt), 'days')} dias)`,
            `${msg.emoji.normais.bot.seta}ADM: ${msg.guild.member(member).hasPermission('ADMINISTRATOR') ? msg.emoji.normais.discord.enable.enable : msg.emoji.normais.discord.enable.disable}`,
            `${msg.emoji.normais.bot.seta}Cargos[${msg.guild.member(member).roles.size}]: ${msg.guild.member(member).roles.map(a => a).join(', ') || `muitos cargos... ${msg.emoji.normais.bot.cry}`}`
          ]
        ])
      }).then(msg.channel.stopTyping(true));
    } catch (e) {
      console.error(e);
      return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, ocorreu um erro inesperado no comando, favor tente utiliza-lo novamente mais tarde!`).then(msg.channel.stopTyping(true));
    }
  },
  conf: { 
    alias:['info-user','ui'], 
    enable: true,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    },
    cooldown: 20
  },
  help: {
    name: 'userinfo',
    desc: 'veja as informações de algum usuário',
    usage: '[@usuário]',
    member: 'usuários',
    category: 'informações'
  }
}