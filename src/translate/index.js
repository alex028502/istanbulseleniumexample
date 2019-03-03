/* global module */

module.exports = function(language, word) {
  if (language === 'french') {
    if (word === 'hello') {
      return 'bonjour';
    }
    return 'je ne sais pas';
  }
  if (language === 'spanish') {
    if (word === 'hello') {
      return 'hola';
    }
    return 'no se';
  }
  return `I don't know ${language}`;
};
