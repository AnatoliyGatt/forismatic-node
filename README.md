![forismatic-node Logo][logo]

An asynchronous client library for Forismatic [API](http://forismatic.com/en/api/).

[![NPM Package Version][npm-package-version-badge]][npm-package-url]
[![NPM Package License][npm-package-license-badge]][npm-package-license-url]
[![NPM Package Downloads][npm-package-downloads-badge]][npm-package-url]
[![Dependencies Status][dependencies-status-badge]][dependencies-status-page-url]
[![devDependencies Status][devDependencies-status-badge]][devDependencies-status-page-url]

[![Node Version][node-version-badge]][node-downloads-page-url]
[![Travis CI Build Status][travis-ci-build-status-badge]][travis-ci-build-status-page-url]
[![Code Climate Status][code-climate-status-badge]][code-climate-status-page-url]
[![Code Climate Test Coverage Status][code-climate-test-coverage-status-badge]][code-climate-test-coverage-status-page-url]
[![Inch CI Documentation Coverage Status][inch-ci-documentation-coverage-status-badge]][inch-ci-documentation-coverage-status-page-url]

[![NPM Package Statistics][npm-package-statistics-badge]][npm-package-url]

## Installation

`npm install forismatic-node`

## Quick Start

The quickest way to get started is by executing following code:

```javascript
var forismatic = require('forismatic-node')();

forismatic.getQuote(function (error, quote) {
    if (!error) {
        console.log(quote);
    } else {
        console.error(error);
    }
});
```

If everything went well, you'll see something like this in your console:

```javascript
{
    quoteText: 'Ignorance never settle a question.',
    quoteAuthor: 'Benjamin Disraeli',
    senderName: '',
    senderLink: '',
    quoteLink: 'http://forismatic.com/en/33ae3b318c/'
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
    lang: 'ru',
    key: 123456
}, function (error, quote) {
    if (!error) {
        console.log(quote);
    } else {
        console.error(error);
    }
});
```

Requests quote in English with auto-generated key.

```javascript
forismatic.getQuote({
    lang: 'en',
    generateKey: true
}, function (error, quote) {
    if (!error) {
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

[logo]: https://cldup.com/LCozDFbBNP.png

[npm-package-url]: https://npmjs.org/package/forismatic-node

[npm-package-version-badge]: https://img.shields.io/npm/v/forismatic-node.svg?style=flat-square

[npm-package-license-badge]: https://img.shields.io/npm/l/forismatic-node.svg?style=flat-square
[npm-package-license-url]: http://opensource.org/licenses/MIT

[npm-package-downloads-badge]: https://img.shields.io/npm/dm/forismatic-node.svg?style=flat-square

[dependencies-status-badge]: https://david-dm.org/AnatoliyGatt/forismatic-node.svg?style=flat-square
[dependencies-status-page-url]: https://david-dm.org/AnatoliyGatt/forismatic-node#info=dependencies

[devDependencies-status-badge]: https://david-dm.org/AnatoliyGatt/forismatic-node/dev-status.svg?style=flat-square
[devDependencies-status-page-url]: https://david-dm.org/AnatoliyGatt/forismatic-node#info=devDependencies

[node-version-badge]: https://img.shields.io/node/v/forismatic-node.svg?style=flat-square
[node-downloads-page-url]: https://nodejs.org/en/download/

[travis-ci-build-status-badge]: https://img.shields.io/travis/AnatoliyGatt/forismatic-node.svg?style=flat-square
[travis-ci-build-status-page-url]: https://travis-ci.org/AnatoliyGatt/forismatic-node

[code-climate-status-badge]: https://img.shields.io/codeclimate/github/AnatoliyGatt/forismatic-node.svg?style=flat-square
[code-climate-status-page-url]: https://codeclimate.com/github/AnatoliyGatt/forismatic-node

[code-climate-test-coverage-status-badge]: https://img.shields.io/codeclimate/coverage/github/AnatoliyGatt/forismatic-node.svg?style=flat-square
[code-climate-test-coverage-status-page-url]: https://codeclimate.com/github/AnatoliyGatt/forismatic-node/coverage

[inch-ci-documentation-coverage-status-badge]: https://inch-ci.org/github/AnatoliyGatt/forismatic-node.svg?style=flat-square
[inch-ci-documentation-coverage-status-page-url]: https://inch-ci.org/github/AnatoliyGatt/forismatic-node

[npm-package-statistics-badge]: https://nodei.co/npm/forismatic-node.png?downloads=true&downloadRank=true&stars=true