/* global require, console */
/* eslint no-console: 0 */

const assert = require('assert');

const sut = require('.'); // that's pretty cool

console.log('testing translator function...');

assert.strictEqual(sut('french', 'hello'), 'bonjour', 'existing word french');

// here is a check that overlaps selenium coverage
assert.strictEqual(sut('spanish', 'hello'), 'hola', 'existing word spanish');

assert.strictEqual(sut('french', 'f52fsrs'), 'je ne sais pas', 'fake word');
assert(sut('fr45s', 'hello').indexOf('don\'t know') !== -1, 'fake language');

console.log('seems to translate ANY existing word into ANY existing language');
console.log('(if my totally random sample is any indication)');
