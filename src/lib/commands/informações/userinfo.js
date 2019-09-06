const { Embed } = require('../../../util/functions/index'),
  { Emojis } = require('../../../util/config'),
  moment = require('moment'); moment.locale('pt-BR');

module.exports = {
  exec: async (bot, msg, args) => {
    try {
      const member = msg.mentions.users[0] || bot.users.get(args[0]) || msg.author,
        status = member.presence.status == 'idle' ? Emojis.Normais.Discord.Status.Idle : member.presence.status == 'online' ? Emojis.Normais.Discord.Status.Online : member.presence.status == 'dnd' ? Emojis.Normais.Discord.Status.Dnd : usuario.presence.status == 'offline' ? Emojis.Normais.Discord.Status.Offline : usuario.presence.status == 'steam' ? Emojis.Normais.Discord.Status.Streaming : null;
        //usageDiscordIn = member.presence.clientStatus == 'web' ? 'navegador' : member.presence.clientStatus == 'desktop' ? 'computador' : member.presence.clientStatus == 'mobile' ? 'celular' : `não esta online no momento`;
      msg.channel.send(
        new Embed(msg.author)
        .setAuthor(`Informações de ${msg.guild.member(member).nickname || member.username}`, bot.user.displayAvatarURL)
        .setThumbnail(member.displayAvatarURL)
        .addFieldArray('Informações principais', [[
          `${Emojis.Normais.Bot.Seta}Nome: ${member.username} (ID: \`${member.id}\`)`,
          `${Emojis.Normais.Bot.Seta}Avatar: __**[clique aqui](${member.displayAvatarURL.endsWith('.gif') ? `${member.displayAvatarURL}?size=2048` : member.displayAvatarURL})**__`,
          `${Emojis.Normais.Bot.Seta}Status: ${status}`,
          `${Emojis.Normais.Bot.Seta}Jogando: ${member.presence.game ? member.presence.game.name : 'nada... ;-;'}`,
          `${Emojis.Normais.Bot.Seta}Conta criada: ${moment(member.createdAt).format('LLL')} (${moment().diff(moment(member.createdAt), 'days')} dias)`
        ]])
        .addFieldArray('Informações no servidor', [[
          `${Emojis.Normais.Bot.Seta}Apelido: ${msg.guild.member(member).nickname || 'sem apelido... ;-;'}`,
          `${Emojis.Normais.Bot.Seta}Entrou: ${moment(msg.guild.member(member).joinedAt).format('LLL')} (${moment().diff(moment(msg.guild.member(member).joinedAt), 'days')} dias)`,
          `${Emojis.Normais.Bot.Seta}ADM: ${msg.guild.member(member).hasPermission('ADMINISTRATOR') ? Emojis.Normais.Discord.Enable.Enable : Emojis.Normais.Discord.Enable.Disable}`,
          `${Emojis.Normais.Bot.Seta}Cargos[${msg.guild.member(member).roles.size}]: ${msg.guild.member(member).roles.map(a => a).join(', ') || 'muitos cargos... ;-;'}`
        ]])
      )
    } catch (e) {
      console.error(e);
      msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, ocorreu um erro inesperado no comando, favor tente utiliza-lo novamente mais tarde!`)
    }
  },
  conf: { aliases:['server-info'], enable: true },
  help: {
    name: 'userinfo',
    description: 'veja as informações de algum usuário.',
    usage: '[@usuário]',
    member: 'usuários',
    category: 'informações'
  }
}