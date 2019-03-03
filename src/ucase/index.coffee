
ucase = (word) ->
  if word.toLowerCase() == word
    return word.toUpperCase()
  else
    # like emacs search, if string is mixed case
    # then we probably like it the way it is
    return word

module.exports = ucase
