module.exports = async (bot, error) => {
  return await bot.guilds.get('586610890288136202').channels.get('609848544060506113').send([
    '```js',
    `${error.stack}`,
    '```'
  ].join('\n'));
}