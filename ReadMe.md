# yid #

These IDs are distributed (needs no co-ordination or central server) and are
timestamped so they are approximately sortable.

The random part however is not monotonically incrementing. There are use-cases
for and against this. For example, you generally want incrementing IDs within
any particular operation(s) which this package will provide. It wouldn't
provide this across parrallel operations, though it would provide unique IDs.

This is just a design decision for this package. If you
need monotonically incrementing IDs you might have to look elsewhere.

## Synopsis ##

```js
const yid = require('yid')

// Standard Version
console.log(yid())
// -> '1517049989798-7496988299172'

// Base62 Version (Shorter)
console.log(yid.base62())
// -> '0UcpUKiY-0i0Jk7UU'

// Prefixed Standard Version
console.log(yid('cc'))
// -> 'cc-1517056278382-3829387742987'

// Base62 Version (Shorter)
console.log(yid.base62('cc'))
// -> 'cc-0UcpULuS-0dw0bPNj'
```

A standard `yid` is:

* always 27 chars long
* has two parts:
  * a timestamp
  * a random string
* is of the form `\d{13}-\d{13}`
* starts off with `Date.now()`
* ends with a random set of numbers

A base62 `yid` is:

* always 17 chars long
* has two parts:
  * a timestamp
  * a random string
* is of the form `[0-9a-zA-Z]{13}-[0-9a-zA-Z]{8}`
* starts off with `Date.now()` in base62
* ends with a random set of numbers in base62

### `yid.fromDate(d)` ###

Pass in a `Date` object, and get a yid back. This is great if you want to
timestamp something in the past or the future, rather than right now.

You may pass a prefix as the 2nd parameter.


### `yid.base62()` ###

Returns an ID not as `\d{13}-\d{13}` but as
`[0-9A-Za-z]{8}-[0-9A-Za-z]{8}`. i.e. a smaller but still sortable version.

```js
const yid = require('yid')

// create an ID using the date at the start of the day
const date = new Date()
date.setUTCHours(0)
date.setUTCMinutes(0)
date.setUTCSeconds(0)
date.setUTCMilliseconds(0)
console.log(yid.fromDate(date))
// -> 1635984000000-4266433825250
```

### `yid.asDate(id)` ###

Returns the numbers from the first part of the `id` as a `Date()`.

```js
yid.asDate(id)
// -> Date: "2018-01-27T10:46:29.798Z"
```

### `yid.asEpoch(id)` ###

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

I already wrote [zid](https://www.npmjs.com/package/zid) and
[flake](https://www.npmjs.com/package/flake) (a long time ago) and they all
have uses. The use for this one is to generate FAST but UNIQUE distributed IDs
with no central server to talk to and no co-ordination required.

A secondary property is that they are approximately sortable across servers.

I got the idea from Google Keep, since the notes have IDs as follows, whereby the first secion is just `Date.now()`:

* '1517050593526.6629835825', e.g. https://keep.google.com/u/1/#NOTE/1517050593526.6629835825

Similar to Firebase Push IDs and are also sortable via ASCII. However, I also
wanted to avoid the possibility of an initial '-' or '_'. Hence Base62 (not Base64).

## Author ##

Andrew Chilton.

```
   ╒════════════════════════════════════════════════════╕
   │                                                    │
   │   Andrew Chilton (Personal)                        │
   │   -------------------------                        │
   │                                                    │
   │          Email : andychilton@gmail.com             │
   │            Web : https://chilts.org                │
   │        Twitter : https://twitter.com/andychilton   │
   │         GitHub : https://github.com/chilts         │
   │                                                    │
   │   Apps Attic Ltd (My Company)                      │
   │   ---------------------------                      │
   │                                                    │
   │          Email : chilts@appsattic.com              │
   │            Web : https://appsattic.com             │
   │        Twitter : https://twitter.com/AppsAttic     │
   │                                                    │
   │   Node.js / npm                                    │
   │   -------------                                    │
   │                                                    │
   │        Profile : https://www.npmjs.com/~chilts     │
   │           Card : $ npx chilts                      │
   │                                                    │
   ╘════════════════════════════════════════════════════╛
```

## License ##

ISC.
