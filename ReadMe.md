# yid #

## Synopsis ##

```js
const yid = require('yid')

console.log(yid())
// -> 1517049989798-7496988299172
```

A `yid` is:

* always 27 chars long
* has two parts:
  * a timestamp
  * a random string
* is of the form `\d{13}-\d{13}`
* starts off with `Date.now()`
* uses a substring of https://www.npmjs.com/package/math-random for the second part

## `yid.asDate(id)` ##

Returns the numbers from the first part of the `id` as a `Date()`.

```js
yid.asDate(id)
// -> Date: "2018-01-27T10:46:29.798Z"
```

## `yid.asEpoch(id)` ##

Returns the numbers from the first part of the `id` as a `Number()`.

```js
yid.asEpoch(id)
// -> Number: 1517049989798
```

## `yid.asRandom(id)` ##

Returns the random collection of digits from the second part of the `id`.

```js
yid.asRandom(id)
// -> "7496988299172"
```

## Why? ##

Why another ID generating library?

I already wrote [zid](https://www.npmjs.com/package/zid) and [flake](https://www.npmjs.com/package/flake) (a long time
ago) and they all have uses. The use for this one is to generate FAST but UNIQUE distributed IDs with no central server
to talk to and no co-ordination required.

A secondary property is that they are approximately sortable across servers.

I got the idea from Google Keep, since the notes have IDs as follows, whereby the first secion is just `Date.now()`:

* '1517050593526.6629835825', e.g. https://keep.google.com/u/1/#NOTE/1517050593526.6629835825

## Author ##

Andrew Chilton.

## License ##

ISC.
