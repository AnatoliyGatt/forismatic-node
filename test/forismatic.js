var assert = require("assert");
var forismatic = require("../lib/forismatic")();

describe("forismatic", function() {
    describe("init", function() {
        var defaultRequestOptions = {
            hostname: "api.forismatic.com",
            port: 80,
            basePath: "/api/1.0/"
        };

        it("should have correct default request options", function() {
            assert.deepEqual(forismatic.defaultRequestOptions, defaultRequestOptions, "default request options should have correct initial property values");
        });

        it("should not override default request options", function() {
            forismatic.defaultSettings = {
                hostname: "api.forismatic.ru",
                port: 3000,
                basePath: "/api/1.0/"
            };

            assert.deepEqual(forismatic.defaultRequestOptions, defaultRequestOptions, "default request options should not be overridden");
        });
    });

    describe("interface", function() {
        describe("#getQuote()", function() {
            function validateQuote(quote) {
                assert.notEqual(quote, undefined, "quote should not be undefined");
                assert.notEqual(quote.quoteText, undefined, "quoteText should not be undefined");
                assert.notEqual(quote.quoteText, "", "quoteText should not be empty");
                assert.notEqual(quote.quoteAuthor, undefined, "quoteAuthor should not be undefined");
                assert.notEqual(quote.senderName, undefined, "senderName should not be undefined");
                assert.notEqual(quote.senderLink, undefined, "senderLink should not be undefined");
                assert.notEqual(quote.quoteLink, undefined, "quoteLink should not be undefined");
                assert.notEqual(quote.quoteLink, "", "quoteLink should not be empty");
            }

            it("should respond with valid quote object, requested with no options", function(done) {
                forismatic.getQuote(function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should respond with valid quote object, requested with manually set key", function(done) {
                forismatic.getQuote({
                    key: 123456
                }, function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should respond with valid quote object, requested with generated key", function(done) {
                forismatic.getQuote({
                    generateKey: true
                }, function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should respond with valid quote object, requested with language set to English", function(done) {
                forismatic.getQuote({
                    lang: "en"
                }, function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should respond with valid quote object, requested with language set to English and manually set key", function(done) {
                forismatic.getQuote({
                    lang: "en",
                    key: 123456
                }, function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should respond with valid quote object, requested with language set to English and generated key", function(done) {
                forismatic.getQuote({
                    lang: "en",
                    generateKey: true
                }, function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should respond with valid quote object, requested with language set to Russian", function(done) {
                forismatic.getQuote({
                    lang: "ru"
                }, function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should respond with valid quote object, requested with language set to Russian and manually set key", function(done) {
                forismatic.getQuote({
                    lang: "ru",
                    key: 123456
                }, function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should respond with valid quote object, requested with language set to Russian and generated key", function(done) {
                forismatic.getQuote({
                    lang: "ru",
                    generateKey: true
                }, function(error, quote) {
                    if(!error) {
                        validateQuote(quote);
                    } else {
                        assert.doesNotThrow(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it("should fail on calling #getQuote() without arguments", function() {
                assert.throws(function() {
                    forismatic.getQuote();
                }, Error);
            });

            it("should fail on calling #getQuote() with options only", function() {
                assert.throws(function() {
                    forismatic.getQuote({
                        lang: "ru",
                        key: 123456
                    });
                }, Error);
            });

            it("should not override #getQuote()", function() {
                forismatic.getQuote = function() {
                    return "#getQuote()";
                };

                assert.throws(function() {
                    assert.notEqual(forismatic.getQuote(), "#getQuote()", "#getQuote() should not be overridden");
                }, Error);
            });
        });
    });
});