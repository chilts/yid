# yid #

## Synopsis ##

```js
const yid = require('yid')

console.log(yid())
// -> 1517049989798-7496988299172
```

A `yid`:

* always 27 chars long
* has two parts:
  * a timestamp
  * a random string
* is of the form `\d{13}-\d{13}`
* starts off with `Date.now()`
* uses `Math.random()` for the second part

## Why? ##

Why another ID generating library?

I already wrote [zid](https://www.npmjs.com/package/zid) and [flake](https://www.npmjs.com/package/flake) (a long time
ago) and they all have uses. The use for this one is to generate FAST but UNIQUE IDs. A secondary property is that they
are approximately sortable across servers.

## Author ##

Andrew Chilton.

## License ##

ISC.
