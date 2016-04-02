var assert = require('assert');
var forismatic = require('../lib/forismatic')();

describe('forismatic', function () {
    describe('init', function () {
        var defaultRequestOptions = {};

        before(function () {
            defaultRequestOptions = {
                hostname: 'api.forismatic.com',
                port: 80,
                basePath: '/api/1.0/'
            }
        });

        it('should have correct default request options', function () {
            assert.deepEqual(forismatic.defaultRequestOptions, defaultRequestOptions, 'default request options should have correct initial property values');
        });
    });

    describe('functions', function () {
        describe('#getQuote()', function () {
            function validateQuote(quote) {
                assert.ok(quote, 'quote should not be undefined, null or empty');
                assert.ok(quote.quoteText, 'quote.quoteText should not be undefined, null or empty');
                assert.notEqual(quote.quoteAuthor, undefined, 'quote.quoteAuthor should not be undefined');
                assert.notEqual(quote.senderName, undefined, 'quote.senderName should not be undefined');
                assert.notEqual(quote.senderLink, undefined, 'quote.senderLink should not be undefined');
                assert.ok(quote.quoteLink, 'quote.quoteLink should not be undefined, null or empty');
            }

            it('should respond with valid quote object, requested with no options', function (done) {
                forismatic.getQuote(function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with valid quote object, requested with manually set key', function (done) {
                forismatic.getQuote({
                    key: 123456
                }, function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function () {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with valid quote object, requested with generated key', function (done) {
                forismatic.getQuote({
                    generateKey: true
                }, function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function () {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with valid quote object, requested with language set to English', function (done) {
                forismatic.getQuote({
                    lang: 'en'
                }, function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function () {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with valid quote object, requested with language set to English and manually set key', function (done) {
                forismatic.getQuote({
                    lang: 'en',
                    key: 123456
                }, function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function () {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with valid quote object, requested with language set to English and generated key', function (done) {
                forismatic.getQuote({
                    lang: 'en',
                    generateKey: true
                }, function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function () {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with valid quote object, requested with language set to Russian', function (done) {
                forismatic.getQuote({
                    lang: 'ru'
                }, function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function () {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with valid quote object, requested with language set to Russian and manually set key', function (done) {
                forismatic.getQuote({
                    lang: 'ru',
                    key: 123456
                }, function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function () {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with valid quote object, requested with language set to Russian and generated key', function (done) {
                forismatic.getQuote({
                    lang: 'ru',
                    generateKey: true
                }, function (error, quote) {
                    if (!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function () {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should fail when called without arguments', function () {
                assert.throws(function () {
                    forismatic.getQuote();
                }, Error);
            });

            it('should fail when called with options only', function () {
                assert.throws(function () {
                    forismatic.getQuote({
                        lang: 'ru',
                        key: 123456
                    });
                }, Error);
            });
        });
    });
});