const yid = require('.')

// setup
const times = 1000000
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

// tests
let id = ''

for(let i = 0; i < times; i++) {
  id = yid()
  count['' + id.length]++

  // check we can get the date back
  const d = yid.toDate(id)
  if (!(d instanceof Date)) {
    throw new Error("toDate() returned something that wasn't a date!")
  }
  if (String(d.valueOf()) != id.split('-')[0]) {
    throw new Error("the date's epoch (d.valueOf()) didn't match the epoch of the id")
  }
}

console.log('count:', count)

if ( count['27'] !== times ) {
  throw new Error("A yid was returned that wasn't 27 chars long")
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
