const { RichEmbed } = require('discord.js'),
  { colors } = require('../config')

module.exports = class Embed extends RichEmbed{
  constructor(user, credit, data = {}) {
    super(data)
    this.setColor(colors.PADRÃO)
    if (user) {
      return this.setFooter(`${user.username}${credit != false ? ` | ${credit}` : ''}`, user.displayAvatarURL).setTimestamp();
    } else if (credit) {
      return this.setFooter(credit ? credit : '').setTimestamp();
    }
    this.fiel
  }
  setDescriptionArray (messages = []) {
    this.description = messages.map(lines => lines.filter(x => !!x).join('\n')).filter(x => !!x.length).join('\n\n')
    return this;
  }
  addFieldArray (name = '', value = [], inline = false) {
    value = value.map(lines => lines.filter(x => !!x).join('\n')).filter(x => !!x.length).join('\n\n')
    this.fields.push({ name, value, inline })
    return this;
  }
  setTitleURL (title = '', url = '') {
    this.title = title;
    this.url = url;
    return this;
  }
}
