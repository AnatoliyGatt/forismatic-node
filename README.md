# Forismatic for Node.js

An asynchronous client library for Forismatic [API](http://forismatic.com/en/api/).

[![NPM Package Version][npm-package-version-badge]][npm-package-url]
[![NPM Package License][npm-package-license-badge]][npm-package-license-url]
[![NPM Package Downloads][npm-package-downloads-badge]][npm-package-url]
[![Dependencies Status][dependencies-status-badge]][dependencies-status-page-url]
[![devDependencies Status][devDependencies-status-badge]][devDependencies-status-page-url]

[![Travis CI Build Status][travis-ci-build-status-badge]][travis-ci-build-status-page-url]

[![NPM Package Statistics][npm-package-statistics-badge]][npm-package-url]

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

```javascript
{
    quoteText: "Ignorance never settle a question.",
    quoteAuthor: "Benjamin Disraeli",
    senderName: "",
    senderLink: "",
    quoteLink: "http://forismatic.com/en/33ae3b318c/"
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

[npm-package-url]: https://npmjs.org/package/forismatic-node

[npm-package-version-badge]: https://img.shields.io/npm/v/forismatic-node.svg?style=flat-square

[npm-package-license-badge]: https://img.shields.io/npm/l/forismatic-node.svg?style=flat-square
[npm-package-license-url]: http://opensource.org/licenses/MIT

[npm-package-downloads-badge]: https://img.shields.io/npm/dm/forismatic-node.svg?style=flat-square

[dependencies-status-badge]: https://david-dm.org/AnatoliyGatt/forismatic-node.svg?style=flat-square
[dependencies-status-page-url]: https://david-dm.org/AnatoliyGatt/forismatic-node#info=dependencies

[devDependencies-status-badge]: https://david-dm.org/AnatoliyGatt/forismatic-node/dev-status.svg?style=flat-square
[devDependencies-status-page-url]: https://david-dm.org/AnatoliyGatt/forismatic-node#info=devDependencies

[travis-ci-build-status-badge]: https://img.shields.io/travis/AnatoliyGatt/forismatic-node.svg?style=flat-square
[travis-ci-build-status-page-url]: https://travis-ci.org/AnatoliyGatt/forismatic-node

[npm-package-statistics-badge]: https://nodei.co/npm/forismatic-node.png?downloads=true&downloadRank=true&stars=true