// npm
const mathRandom = require('math-random')

function pad(id, len) {
  while ( id.length < len ) {
    id += '0'
  }
  return id
}

function yid(prefix) {
  let id = (prefix ? `${prefix}-` : '') + Date.now() + '-' + pad(String(mathRandom()).substr(2, 13), 13)
  return id
}

function fromDate(d, prefix) {
  let id = (prefix ? `${prefix}-` : '') + d.valueOf() + '-' + pad(String(mathRandom()).substr(2, 13), 13)
  return id
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

// Base62 character set (URL-safe), and also sortable
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// toBase62()
//
// * toBase62(0) -> '0'
// * toBase62(1) -> '1'
// * toBase62(Date.now()) -> 'UcpTvDM'
// * toBase62(9999999999999) -> '2q3Rktod'
//
// So '2q3Rktod' is the highest random part you'll see.
function toBase62(number) {
  if (number === 0) {
    return BASE62[0]
  }

  let result = ''
  while (number > 0) {
    result = BASE62[number % 62] + result
    number = Math.floor(number / 62)
  }
  return result
}

function fromBase62(str) {
  let result = 0

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const value = BASE62.indexOf(char)
    if (value === -1) {
      throw new Error(`Invalid character: ${char}`)
    }
    result = result * 62 + value
  }

  return result
}

// always pads at the start of the string
function padStart(str, len) {
  return str.padStart(len, '0')
}

function base62(prefix) {
  const ts = padStart(toBase62(Date.now()), 8)
  const randNum = Number(String(mathRandom()).substr(2, 13))
  const randStr = padStart(toBase62(randNum), 8)
  return (prefix ? `${prefix}-` : '' ) + ts + '-' + randStr
}

// exports

yid.fromDate = fromDate
yid.asDate = asDate
yid.asEpoch = asEpoch
yid.asRandom = asRandom

yid.base62 = base62

module.exports = yid
