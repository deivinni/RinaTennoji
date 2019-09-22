const { Embed, FirstUpperCase } = require('../../../util/functions/index'),
  { Emojis, Prefixo, Owner } = require('../../../util/config');

module.exports = {
  exec: async (bot, msg, args) => {
    const embed = new Embed(msg.author)
      .setThumbnail(bot.user.displayAvatarURL)
      .setAuthor(`Comandos da ${bot.user.username}`,'https://cdn.discordapp.com/emojis/586617374141186097.png?v=1');
    if (!args[0]) {
      embed.setDescriptionArray([[
        `${Emojis.Normais.Discord.Owner} \`|\` Criador: ${bot.users.get(Owner).tag}`,
        `${Emojis.Normais.Discord.Channel.Text} \`|\` Prefixo: \`${Prefixo[0]}\` ou \`yuuki⠀\``,
        `${Emojis.Normais.Discord.Certified} \`|\` Total de comandos: \`${bot.commands.size}\``
      ]])
      const dir = (category) => bot.commands.filter(c => c.help.category === category)
      embed.addField(`${Emojis.Normais.Bot.Seta}Ações [${dir('ações').size}]:`            , (dir('ações')      .map(c=>`\`${c.help.name}\``).join(', ') || 'Comandos indisponíveis'));
      embed.addField(`${Emojis.Normais.Bot.Seta}Diversão [${dir('diversão').size}]:`      , (dir('diversão')   .map(c=>`\`${c.help.name}\``).join(', ') || 'Comandos indisponíveis'));
      embed.addField(`${Emojis.Normais.Bot.Seta}Imagem [${dir('imagem').size}]:`          , (dir('imagem')     .map(c=>`\`${c.help.name}\``).join(', ') || 'Comandos indisponíveis'));
      embed.addField(`${Emojis.Normais.Bot.Seta}Informações [${dir('informações').size}]:`, (dir('informações').map(c=>`\`${c.help.name}\``).join(', ') || 'Comandos indisponíveis'));
      embed.addField(`${Emojis.Normais.Bot.Seta}Owner [${dir('owner').size}]:`            , (dir('owner')      .map(c=>`\`${c.help.name}\``).join(', ') || 'Comandos indisponíveis'));
      embed.addField(`${Emojis.Normais.Bot.Seta}Utilidades [${dir('utilidades').size}]:`  , (dir('utilidades') .map(c=>`\`${c.help.name}\``).join(', ') || 'Comandos indisponíveis'));
      msg.channel.send(embed).catch();
    } else {
      let cmd = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
      if (!cmd) {
        msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, comando \`${args[0]}\` não foi encontrado! Verifique se este comando realmente existe.`)
      }
      let conf = cmd.conf, help = cmd.help;
      if (conf.hide_help) return;
      if (conf.nsfw && (!msg.channel.nsfw || msg.channel.type != 'dm')) {
        return msg.channel.send(`${Emojis.Normais.Discord.Outage} \`|\` ${msg.author}, não posso mostrar meus comandos \`NSFW\` neste canal!`)
      }
      return msg.channel.send(
        embed.setDescription(`\`<>\`: obrigatório / \`[]\`: opcional`)
        .addFieldArray(`${Emojis.Normais.Bot.Informações} | Informações`, [[
          `${Emojis.Normais.Bot.Seta}Nome: ${FirstUpperCase(help.name)}`,
          `${Emojis.Normais.Bot.Seta}Aliases: ${conf.aliases.map(a => `\`${a}\``).join(', ') || 'sem aliases... ;-;'}`,
          `${Emojis.Normais.Bot.Seta}Descrição: ${FirstUpperCase(help.description)}`,
          `${Emojis.Normais.Bot.Seta}Categoria: ${help.category === 'nsfw' ? 'NSFW': FirstUpperCase(help.category)}`,
          `${Emojis.Normais.Bot.Seta}Créditos: ${conf.credits.map(a => a).join(', ') || `sem créditos... ${Emojis.Normais.Bot.PepoHappy}`}`
        ]]).addFieldArray(`${Emojis.Normais.Bot.Editar} | Utilização`, [[
          `${Emojis.Normais.Bot.Seta}Forma de uso: \`${prefix+(help.usage ? `${help.name} ${help.usage}` : help.name)}\``,
          `${Emojis.Normais.Bot.Seta}Acessível por: ${FirstUpperCase(help.member)}`
        ]]).addFieldArray(`${Emojis.Normais.Discord.UserSettings} | Configurações`, [[
          `${Emojis.Normais.Bot.Seta}DM: ${conf.guildOnly ? Emojis.Normais.Discord.Enable.Disable : Emojis.Normais.Discord.Enable.Enable}`,
          `${Emojis.Normais.Bot.Seta}Manutenção: ${conf.manu ? Emojis.Normais.Discord.Enable.Enable : Emojis.Normais.Discord.Enable.Disable}`,
          `${Emojis.Normais.Bot.Seta}Habilitado: ${conf.enable ? Emojis.Normais.Discord.Enable.Enable : Emojis.Normais.Discord.Enable.Disable}`,
          `${Emojis.Normais.Bot.Seta}NSFW: ${conf.nsfw ? Emojis.Normais.Discord.Enable.Enable : Emojis.Normais.Discord.Enable.Disable}`
        ]])
      ).catch();
    }
  },
  conf: {
    aliases: ['ajuda','comandos','comando','cmds','cmd'],
    enable: true,
    cooldown: 15,
    permissions: ['SEND_MESSAGES']
  },
  help: {
    name: 'help',
    description: 'veja todos os meus comandos',
    usage: '[comando]',
    member: 'usuários',
    category: 'informações',
    credits: ['[[MenuDocs]](https://www.youtube.com/channel/UCpGGFqJP9vYvzFudqnQ-6IA)']
  }
}