const { Embed, FirstUpperCase } = require('../../../util/functions/index'), 
  moment = require('moment'); require('moment-duration-format'); moment.locale('pt-BR');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    const embed = new Embed(msg.author, false, {
        thumbnail: {
          url: msg.bot.user.displayAvatarURL
        }
      }), Command = (cat) => msg.bot.commands.filter(c => c.help.category == cat);

    if (!msg.args[0]) {
      return await msg.channel.send(`<:pasta_:587005722160791572> \`|\` Comandos da ${msg.bot.user.username}`, {
        embed: embed.setDescriptionArray([[
          `${msg.emoji.normais.discord.owner} \`|\` Meu criador: ${msg.bot.users.get(msg.config.owner).tag}`,
          `${msg.emoji.normais.discord.channel.text} \`|\` Prefixos: \`${msg.config.prefixo[0]}\` ou \`${msg.config.prefixo[1]}\``,
          `${msg.emoji.normais.discord.certified} \`|\` Total de comandos: \`${msg.bot.commands.filter(c => c.help.category != 'owner').size}\``,
        ]])
        .addField(`${msg.emoji.normais.bot.coffee} Ações [${Command('ações').size}]:`, (Command('ações').map(c => `\`${c.help.name}\``).join(', ') || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
        .addField(`${msg.emoji.normais.bot.pepo_happy} Diversão [${Command('diversão').size}]:`, (Command('diversão').map(c => `\`${c.help.name}\``).join(', ') || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
        .addField(`<:game_:598130455602003969> Game [${Command('game').size}]:`, (Command('game').map(c => `\`${c.help.name}\``) || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
        .addField(`${msg.emoji.normais.bot.instagram} Imagem [${Command('imagem').size}]:`, (Command('imagem').map(c => `\`${c.help.name}\``).join(', ') || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
        .addField(`${msg.emoji.normais.bot.informações} Informações [${Command('informações').size}]:`, (Command('informações').map(c => `\`${c.help.name}\``).join(', ') || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
        .addField(`🔞 NSFW [${Command('nsfw').size}]:`, ((msg.channel.nsfw ? Command('nsfw').map(c => `\`${c.help.name}\``).join(', ') : `${msg.emoji.normais.discord.outage} \`|\` Só posso mostrar esses comandos em um canal \`NSFW\``) || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
        .addField(`${msg.emoji.normais.bot.search} Search [${Command('search').size}]:`, (Command('search').map(c => `\`${c.help.name}\``).join(', ') || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
        .addField(`${msg.emoji.normais.bot.editar} Utilidades [${Command('utilidade').size}]:`, (Command('utilidade').map(c => `\`${c.help.name}\``).join(', ') || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
        //.addField(`${msg.emoji.normais.bot.think} Random [${Command('random').size}]:`, (Command('random').map(c => `\`${c.help.name}\``).join(', ') || `${msg.emoji.normais.discord.outage} \`|\` Erro ao pegar os comandos... ${msg.emoji.normais.bot.cry}`))
      }).then(msg.channel.stopTyping(true));
    } else if (msg.args[0]) {
      if (msg.bot.commands.has(msg.args[0])) {
        const cmd = msg.bot.commands.get((msg.args[0] || msg.bot.aliases.get(msg.args[0]))), conf = cmd.conf, help = cmd.help;
        return await msg.channel.send(`<:pasta_:587005722160791572> \`|\` Comandos da ${msg.bot.user.username}`, {
          embed: embed.setTitle(`<:cmd_:586617374141186097> \`|\` Comando: \`${FirstUpperCase(help.name)}\``)
          .setDescriptionArray([[
            `${msg.emoji.normais.bot.seta}Nome: ${help.name || `sem nome... ${msg.bot.normais.bot.think}`}`,
            `${msg.emoji.normais.bot.seta}Aliases: ${conf.alias.map(a => `\`${a}\``).join(', ') || `sem aliases... ${msg.emoji.normais.bot.cry}`}`,
            `${msg.emoji.normais.bot.seta}Descrição: ${help.desc || `sem descrição... ${msg.emoji.normais.bot.cry}`}`,
            `${msg.emoji.normais.bot.seta}Cooldown: ${conf.cooldown || 3} segundos`,
            `${msg.emoji.normais.bot.seta}Categoria: ${help.category === 'nsfw' ? 'NSFW': help.category === 'random' ? `sem categoria... ${msg.emoji.normais.bot.cry}` : help.category}`,
            `${msg.emoji.normais.bot.seta}Créditos: ${help.credit ? help.credit.map(a => a).join(', ') : `sem créditos... ${msg.emoji.normais.bot.pepo_happy}`}`
          ]]).setFooter(`Reaja abaixo para mais informações`).setTimestamp()
        }).then(message => {
          message.channel.stopTyping(true);
          message.react(msg.emoji.ids.normais.bot.adicionar).then(async() => {
            const collector = message.createReactionCollector((r, u) => r.emoji.id === msg.emoji.ids.normais.bot.adicionar && u.id === msg.author.id);
            collector.on('collect', async (r) => {
              switch (r.emoji.id) {
                case msg.emoji.ids.normais.bot.adicionar :
                  message.clearReactions();
                  await message.edit(`<:pasta_:587005722160791572> \`|\` Comandos da ${msg.bot.user.username}`, {
                    embed: embed.setDescriptionArray([
                      [
                        `\`<>\`: obrigatório / \`[]\`: opcional`
                      ],[
                        `${msg.emoji.normais.bot.seta}Nome: ${help.name || `sem nome... ${msg.bot.normais.bot.think}`}`,
                        `${msg.emoji.normais.bot.seta}Aliases: ${conf.alias.map(a => `\`${a}\``).join(', ') || `sem aliases... ${msg.emoji.normais.bot.cry}`}`,
                        `${msg.emoji.normais.bot.seta}Descrição: ${help.desc || `sem descrição... ${msg.emoji.normais.bot.cry}`}`,
                        `${msg.emoji.normais.bot.seta}Cooldown: ${conf.cooldown || 3} segundos`,
                        `${msg.emoji.normais.bot.seta}Categoria: ${help.category === 'nsfw' ? 'NSFW': help.category === 'random' ? `sem categoria... ${msg.emoji.normais.bot.cry}` : help.category}`,
                        `${msg.emoji.normais.bot.seta}Créditos: ${help.credit ? help.credit.map(a => a).join(', ') : `sem créditos... ${msg.emoji.normais.bot.pepo_happy}`}`
                      ],[
                        `${msg.emoji.normais.bot.seta}Forma de uso: \`${msg.config.prefixo[0] + (help.usage ? `${help.name} ${help.usage}` : help.name)}\``,
                        `${msg.emoji.normais.bot.seta}Acessível por: ${help.member}`
                      ],[
                        `${msg.emoji.normais.bot.seta}DM: ${conf.guildOnly      ? msg.emoji.normais.discord.enable.disable : msg.emoji.normais.discord.enable.enable}`,
                        `${msg.emoji.normais.bot.seta}Manutenção: ${conf.manu   ? msg.emoji.normais.discord.enable.enable  : msg.emoji.normais.discord.enable.disable}`,
                        `${msg.emoji.normais.bot.seta}Habilitado: ${conf.enable ? msg.emoji.normais.discord.enable.enable  : msg.emoji.normais.discord.enable.disable}`,
                        `${msg.emoji.normais.bot.seta}NSFW: ${conf.nsfw         ? msg.emoji.normais.discord.enable.enable  : msg.emoji.normais.discord.enable.disable}`,
                        `${msg.emoji.normais.bot.seta}Permissões: \n${[
                          `<:invisivel_:586618921008889904>Usuário: ${conf.permissions.member ? conf.permissions.member.map(perm => `\`${msg.config.permis[perm].name}\``).join(', ') : `sem permissões... ${msg.emoji.normais.bot.think}`}`,
                          `<:invisivel_:586618921008889904>Minhas: ${conf.permissions.bot ? conf.permissions.bot.map(perm => `\`${msg.config.permis[perm].name}\``).join(', ') : `sem permissões... ${msg.emoji.normais.bot.think}`}`
                        ].join('\n')}`
                      ]
                    ]).setFooter(msg.author.tag, msg.author.displayAvatarURL).setTimestamp()
                  }).then(() => msg.channel.stopTyping(true));
                break;
              }
            })
          })
        })
      } else return await msg.channel.send(`${msg.bot.normais.discord.outage} \`|\` ${msg.author}, este comando \`${msg.args[0]}\` não existe, favor verifique se digitou corretamente!`).then(() => msg.channel.stopTyping(true));
    }
  },
  conf: {
    enable: true,
    alias: ['ajuda','cmds','comandos','comando'],
    cooldown: 10,
    permissions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS','ADD_REACTIONS','MANAGE_MESSAGES']
    }
  },
  help: {
    name: 'help',
    desc: 'veja todos os meus comandos',
    usage: '[comando]',
    member: 'usuários',
    category: 'informações',
    credit: ['[[MenuDocs]](https://www.youtube.com/channel/UCpGGFqJP9vYvzFudqnQ-6IA)']
  }
}