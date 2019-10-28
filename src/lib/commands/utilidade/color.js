const { Embed } = require('../../../util/functions/index'),
  { hex } = require('color-convert');

module.exports = {
  exec: async (msg) => {
    msg.channel.startTyping(true);
    let color;
    if (!msg.args.join(' ')) return await msg.channel.send(`${msg.emoji.normais.discord.outage} \`|\` ${msg.author}, você deve colocar a hex color desejada.`).then(msg.channel.stopTyping(true));
    if (msg.args[0] && /^#?[0-9a-f]{6}$/i.test(msg.args[0])) return color = msg.args[0].replace('#', '');
    msg.channel.startTyping(true);
    return await msg.channel.send({
      embed: new Embed(msg.author, 'Color-Convert').setColor(parseInt(color, 16))
      .setThumbnail(`https://dummyimage.com/250/${color}/&text=%20`)
      .addField('HEX',     `#${color}`,                     true)
      .addField('RGB',     `${hex.rgb(color)}`,     true)
      .addField('CMYK',    `${hex.cmyk(color)}`,    true)
      .addField('HSL',     `${hex.hsl(color)}`,     true)
      .addField('HSV',     `${hex.hsv(color)}`,     true)
      .addField('HWB',     `${hex.hwb(color)}`,     true)
      .addField('LAB',     `${hex.lab(color)}`,     true)
      .addField('ANSI16',  `${hex.ansi16(color)}`,  true)
      .addField('ANSI256', `${hex.ansi256(color)}`, true)
      .addField('XYZ',     `${hex.xyz(color)}`,     true)
      .addField('HCG',     `${hex.hcg(color)}`,     true)
      .addField('Apple',   `${hex.apple(color)}`,   true)
      .addField('Gray',    `${hex.gray(color)}`,    true)
      .addField('CSS',     `${hex.keyword(color)}`, true)
    }).then(msg.channel.stopTyping(true));
  },
  conf: {
    alias: ['cor'],
    enable: true,
    cooldown: 10,
    permisions: {
      bot: ['SEND_MESSAGES','USE_EXTERNAL_EMOJIS']
    }
  },
  help: {
    name: 'color',
    desc: 'veja as informações de uma cor',
    usage: '<#hex_color>',
    member: 'usuários',
    category: 'utilidade',
    credit: ['[BastionBot](https://github.com/TheBastionBot/Bastion)']
  }
}