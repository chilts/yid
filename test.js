const yid = require('.')

// setup
const times = 100000
const count = {
  '22' : 0,
  '23' : 0,
  '24' : 0,
  '25' : 0,
  '26' : 0,
  '27' : 0,
  '28' : 0,
  '29' : 0,
  '30' : 0,
  '31' : 0,
  '32' : 0,
  '33' : 0,
  '34' : 0,
  '35' : 0,
  '36' : 0,
  '37' : 0,
  '38' : 0,
}

let base62Count = 0

// tests
let id = ''

for(let i = 0; i < times; i++) {
  // test both yid() and .fromDate()
  id = (i%2) ? yid() : yid.fromDate(new Date())
  count['' + id.length]++

  // .asDate()
  const d = yid.asDate(id)
  if (!(d instanceof Date)) {
    throw new Error("asDate() returned something that wasn't a date!")
  }
  if (String(d.valueOf()) != id.split('-')[0]) {
    throw new Error("the date's epoch (d.valueOf()) didn't match the epoch of the id")
  }

  // .asEpoch()
  const epoch = yid.asEpoch(id)
  if (d.valueOf() != epoch) {
    throw new Error("the date's epoch didn't match the epoch of the id")
  }

  // .asRandom()
  if (yid.asRandom(id) != id.split('-')[1]) {
    throw new Error("the date's random part didn't match the that of the id")
  }

  // test the base62 version
  id = yid.base62()
  if ( id.length === 17 ) {
    base62Count += 1
  }
}

if ( count['27'] !== times ) {
  throw new Error("A yid was returned that wasn't 27 chars long")
}

if ( base62Count !== times ) {
  throw new Error("A yid.base62() was returned that wasn't 17 chars long")
}

for(let i = 1; i < times; i++ ) {
  id = yid()

  if ( id.split('-').length !== 2 ) {
    throw new Error("A yid was returned that didn't have two sections around the dash : " + id)
  }

  // 1517049989798-7496988299172
  if ( !id.match(/^\d{13}-\d{13}$/) ) {
    throw new Error("A yid was returned that wasn't of the format DDDDDDDDDDDDD-DDDDDDDDDDDDD : " + id)
  }
}

// check for prefixes (regular)
for(let i = 1; i < times; i++ ) {
  id = yid('prj')

  if ( id.split('-').length !== 3 ) {
    throw new Error("A prefixed yid was returned that didn't have three sections around the dash : " + id)
  }

  // prj-1517049989798-7496988299172
  // console.log('id:', id)
  // console.log('match:', id.match(/^prj-\d{13}-\d{13}$/))
  if ( !id.match(/^prj-\d{13}-\d{13}$/) ) {
    throw new Error("A prefixed yid was returned that wasn't of the format xxx-DDDDDDDDDDDDD-DDDDDDDDDDDDD : " + id)
  }
}

// check for prefixes (base62)
for(let i = 1; i < times; i++ ) {
  id = yid.base62('prj')

  if ( id.split('-').length !== 3 ) {
    throw new Error("A prefixed base62 yid was returned that didn't have three sections around the dash : " + id)
  }

  // prj-0UcpUbzy-2iGH8g3D
  // console.log('id:', id)
  // console.log('match:', id.match(/^prj-[0-1a-zA-Z]{8}-[0-9a-zA-Z]{8}$/))
  if ( !id.match(/^prj-[0-9a-zA-Z]{8}-[0-9a-zA-Z]{8}$/) ) {
    throw new Error("A prefixed base62 yid was returned that wasn't of the format xxx-XXXXXXXX-XXXXXXXX : " + id)
  }
}
