
/* global require, global, document */

const translate = require('./translate');
const ucase = require('./ucase/index.coffee');

global.doTranslate = function() {
  const englishWord = document.getElementById('word').value;
  const spanishWord = translate('spanish', englishWord);
  document.getElementById('answer').innerHTML = ucase(spanishWord);
};

