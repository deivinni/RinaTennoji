const Intil = require('intl');
Intil.__disableRegExpRestore();

module.exports = (number, lang = 'pt-br') => {
  const { format } = new Intil.NumberFormat(lang);
  return format(number);
}