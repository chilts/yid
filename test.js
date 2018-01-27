const yid = require('.')

let id
var count = {
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

for(let i = 0; i < 10000000; i++) {
  id = yid()
  count['' + id.length]++
}

console.log('count:', count)

if ( count['27'] !== 10000000 ) {
  throw new Error("A yid was returned that wasn't 27 chars long")
}

for(let i = 1; i < 1000; i++ ) {
  id = yid()

  if ( id.split('-').length !== 2 ) {
    throw new Error("A yid was returned that didn't have two sections around the dash : " + id)
  }

  // 1517049989798-7496988299172
  if ( !id.match(/^\d{13}-\d{13}$/) ) {
    throw new Error("A yid was returned that wasn't of the format DDDDDDDDDDDDD-DDDDDDDDDDDDD : " + id)
  }
}
