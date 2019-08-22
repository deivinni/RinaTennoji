const { Embed, FirstUpperCase } = require('../../../util/functions/index'),
  { emojis, prefix, owner } = require('../../../util/config'),
  { readdirSync } = require('fs')

module.exports = {
  exec: async (bot, msg, args) => {
    const embed = new Embed(msg.author)
        .setThumbnail(bot.user.displayAvatarURL)
        .setAuthor(`Comandos da ${bot.user.username}`,'https://cdn.discordapp.com/emojis/586617374141186097.png?v=1');
    const categories = readdirSync('./src/lib/commands/');
    if (!args[0]) {
      embed.setDescriptionArray([[
        `${emojis._normals.owner} \`|\` Criador: ${bot.users.get(owner).tag}`,
        `${emojis._normals.text} \`|\` Prefixo: \`${prefix}\``,
        `${emojis._normals.certified} \`|\` Total de comandos: \`${bot.commands.size}\``
      ]])
      categories.forEach(category => {
        const dir = bot.commands.filter(c => c.help.category === category)
        try {
          embed.addField(`${emojis._normals.seta} ${FirstUpperCase(category)} [${dir.size}]:`, dir.map(c=>`\`${c.help.name}\``).join(', '));
        } catch (e) {
          embed.addField('⠀⠀⠀⠀⠀⠀⠀⠀', `${emojis._normals.erro} \`|\` Erro ao carregar a categoria.`);
          console.log(e.stack);
        }
      })
      msg.channel.send(embed)
    } else {
      let cmd = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
      if (!cmd) return msg.channel.send([
        `${emojis._normals.erro} \`|\` ${msg.author}, comando \`${args[0]}\` não foi encontrado!`,
        `Verifique se este comando realmente existe.`
      ].join('\n'));
      let conf = cmd.conf, help = cmd.help;
      if (conf.hide_help) return;
      if (conf.nsfw && (!msg.channel.nsfw || msg.channel.type != 'dm')) return msg.channel.send([
        `${emojis._normals.erro} \`|\` ${msg.author}, comando \`NSFW\` fora de um canal \`NSFW\`!`,
        `Utilize \`${prefix+msg.content.slice(prefix.length)[0]+' '+args[0]}\` para ver as informações deste comando.`
      ].join('\n'));
      return msg.channel.send(
        embed.setDescription(`\`<>\`: obrigatório / \`[]\`: opcional`)
        .addFieldArray(`${emojis._normals.info} | Informações`, [[
          `${emojis._normals.seta} Nome: ${FirstUpperCase(help.name)}`,
          `${emojis._normals.seta} Aliases: ${conf.aliases.map(a => `\`${a}\``).join(', ') || 'sem aliases'}`,
          `${emojis._normals.seta} Descrição: ${FirstUpperCase(help.description)}`,
          `${emojis._normals.seta} Categoria: ${help.category === 'nsfw' ? 'NSFW': FirstUpperCase(help.category)}`
        ]]).addFieldArray(`${emojis._normals.correto} | Utilização`, [[
          `${emojis._normals.seta} Forma de uso: \`${prefix+(help.usage ? `${help.name} ${help.usage}` : help.name)}\``,
          `${emojis._normals.seta} Acessível por: ${FirstUpperCase(help.member)}`
        ]]).addFieldArray(`${emojis._normals.config} | Configurações`, [[
          `${emojis._normals.seta} DM: ${conf.guildOnly ? emojis._normals.disable : emojis._normals.enable}`,
          `${emojis._normals.seta} Manutenção: ${conf.manu ? emojis._normals.enable : emojis._normals.disable}`,
          `${emojis._normals.seta} Habilitado: ${conf.enable ? emojis._normals.enable : emojis._normals.disable}`,
          `${emojis._normals.seta} NSFW: ${conf.nsfw ? emojis._normals.enable : emojis._normals.disable}`
        ]])
      )
    }
  },
  conf: { aliases: ['ajuda','comandos','comando','cmds','cmd'], enable: true, cooldown: 15 },
  help: {
    name: 'help',
    description: 'veja todos os meus comandos',
    usage: '[comando]',
    member: 'usuários',
    category: 'informações'
  }
}
