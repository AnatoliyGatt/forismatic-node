# Forismatic for Node.js

An asynchronous client library for Forismatic [API](http://forismatic.com/en/api/).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Travis Build][travis-image]][travis-url]
[![License][license]][license-url]

## Installation

`npm install forismatic-node`

## Quick Start

The quickest way to get started is by executing following code:

```javascript
var forismatic = require("forismatic-node")();

forismatic.getQuote(function(error, quote) {
    if(!error) {
        console.log(quote);
    } else {
        console.error(error);
    }
});
```

If everything went well, you'll see something like this in your console:

```json
{
    "quoteText": "Ignorance never settle a question.",
    "quoteAuthor": "Benjamin Disraeli",
    "senderName": "",
    "senderLink": "",
    "quoteLink": "http://forismatic.com/en/33ae3b318c/"
}
```

## Documentation

### getQuote

Requests random quote.

#### Options

- `lang`(default: `en`) - Response language (`en` or `ru`).
- `key`(default: `undefined`) - Numeric key, which influences the choice of quotation, the maximum length is 6 characters.
- `generateKey`(default `false`) - Determines whether numeric key is auto-generated.

#### Examples

Requests quote in Russian with manually set key.

```javascript
forismatic.getQuote({
    lang: "ru",
    key: 123456
}, function(error, quote) {
    if(!error) {
        console.log(quote);
    } else {
        console.error(error);
    }
});
```

Requests quote in English with auto-generated key.

```javascript
forismatic.getQuote({
    lang: "en",
    generateKey: true
}, function(error, quote) {
    if(!error) {
        console.log(quote);
    } else {
        console.error(error);
    }
});
```

#### Errors

When errors occur, you receive an error object with default properties as a first argument of the callback.

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

Distributed under the [MIT License](LICENSE).

[npm-image]: https://img.shields.io/npm/v/forismatic-node.svg
[npm-url]: https://npmjs.org/package/forismatic-node
[downloads-image]: https://img.shields.io/npm/dm/forismatic-node.svg
[downloads-url]: https://npmjs.org/package/forismatic-node
[license]: https://img.shields.io/github/license/AnatoliyGatt/forismatic-node.svg
[license-url]: https://github.com/AnatoliyGatt/forismatic-node/blob/master/LICENSE
[travis-image]: https://img.shields.io/travis/AnatoliyGatt/forismatic-node/master.svg
[travis-url]: https://travis-ci.org/AnatoliyGatt/forismatic-node