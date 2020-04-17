const mathRandom = require('math-random')

function yid() {
  let id = Date.now() + '-' + String(mathRandom()).substr(2, 13)

  while ( id.length < 27 ) {
    id += '0'
  }

  return id
}

function toDate(id) {
  if ( !id.match(/^\d{13}-\d{13}$/) ) {
    throw new Error(`Format of id is incorrect: ${id}`)
  }
  const epoch = id.split('-')[0]
  return new Date(Number(epoch))
}

yid.toDate = toDate

module.exports = yid
