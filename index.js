const mathRandom = require('math-random')

function yid() {
  let id = Date.now() + '-' + String(mathRandom()).substr(2, 13)

  while ( id.length < 27 ) {
    id += '0'
  }

  return id
}

module.exports = yid
