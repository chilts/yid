const mathRandom = require('math-random')

function pad(id) {
  while ( id.length < 27 ) {
    id += '0'
  }
  return id
}

function yid() {
  let id = Date.now() + '-' + String(mathRandom()).substr(2, 13)
  return pad(id)
}

function fromDate(d) {
  let id = d.valueOf() + '-' + String(mathRandom()).substr(2, 13)
  return pad(id)
}

function asDate(id) {
  if ( !id.match(/^\d{13}-\d{13}$/) ) {
    throw new Error(`yid.asDate(): Format of id is incorrect: ${id}`)
  }
  const epoch = id.split('-')[0]
  return new Date(Number(epoch))
}

function asEpoch(id) {
  if ( !id.match(/^\d{13}-\d{13}$/) ) {
    throw new Error(`yid.asEpoch(): Format of id is incorrect: ${id}`)
  }
  const epoch = id.split('-')[0]
  return Number(epoch)
}

function asRandom(id) {
  if ( !id.match(/^\d{13}-\d{13}$/) ) {
    throw new Error(`yid.asRandom(): Format of id is incorrect: ${id}`)
  }
  return id.split('-')[1]
}

yid.fromDate = fromDate
yid.asDate = asDate
yid.asEpoch = asEpoch
yid.asRandom = asRandom

module.exports = yid
