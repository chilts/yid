function yid() {
  let id = Date.now() + '-' + String(Math.random()).substr(2, 13)
  while ( id.length < 27 )
    id += '0'
  return id
}

module.exports = yid
