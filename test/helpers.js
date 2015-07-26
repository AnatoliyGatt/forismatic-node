var assert = require("assert");
var helpers = require("../lib/helpers");

describe("helpers", function() {
    describe("init", function() {
        describe("should not override helper functions", function() {
            describe("#escapeJSONString()", function() {
                it("should not override #escapeJSONString()", function() {
                    helpers.escapeJSONString = function(value) {
                        return "#escapeJSONString(): " + value;
                    };

                    assert.notEqual(helpers.escapeJSONString("1"), "#escapeJSONString(): 1", "#escapeJSONString() should not be overridden");
                });
            });

            describe("#deepTrimJSONObject()", function() {
                it("should not override #deepTrimJSONObject()", function() {
                    helpers.deepTrimJSONObject = function(value) {
                        return "#deepTrimJSONObject(): " + value;
                    };

                    assert.notEqual(helpers.deepTrimJSONObject("1"), "#deepTrimJSONObject(): 1", "#deepTrimJSONObject() should not be overridden");
                });
            });

            describe("#deepFreezeObject()", function() {
                it("should not override #deepFreezeObject()", function() {
                    helpers.deepFreezeObject = function(value) {
                        return "#deepFreezeObject(): " + value;
                    };

                    assert.notEqual(helpers.deepTrimJSONObject("1"), "#deepFreezeObject(): 1", "#deepFreezeObject() should not be overridden");
                });
            });
        });
    });

    describe("interface", function() {
        describe("#escapeJSONString()", function() {
            it("should not modify JSON string which is not containing any apostrophes or double quotes", function() {
                var originalJSONString = "{\"quoteText\": \"How far that little candle throws its beams! So shines a " +
                    "good deed in a naughty world.\", \"quoteAuthor\": \"William Shakespeare\", \"senderName\": \"\", " +
                    "\"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/cd6494b494/\"}";
                var escapedJSONString = helpers.escapeJSONString("{\"quoteText\": \"How far that little candle throws its beams! So shines a " +
                "good deed in a naughty world.\", \"quoteAuthor\": \"William Shakespeare\", \"senderName\": \"\", " +
                "\"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/cd6494b494/\"}");
                assert.equal(escapedJSONString, originalJSONString, "JSON string should not be modified");
            });

            it("should unescape apostrophe within JSON string", function() {
                var escapedJSONString = helpers.escapeJSONString("{\"quoteText\": \"Interesting when rain falls " +
                "somewhere only to recognize that it isn\'t falling some place else.\", " +
                "\"quoteAuthor\": \"Byron Pulsifer\", \"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/eff5cb33f1/\"}");
                var expectedEscapedJSONString = "{\"quoteText\": \"Interesting when rain falls somewhere only to " +
                    "recognize that it isn\'t falling some place else.\", \"quoteAuthor\": \"Byron Pulsifer\", " +
                    "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/eff5cb33f1/\"}";
                assert.equal(escapedJSONString, expectedEscapedJSONString, "apostrophe should be unescaped within JSON string");
            });

            it("should unescape apostrophes withing JSON string", function() {
                var escapedJSONString = helpers.escapeJSONString("{\"quoteText\": \"Don\'t turn away from possible futures before you\'re certain you " +
                "don\'t have anything to learn from them.\", \"quoteAuthor\": \"Richard Bach\", \"senderName\": \"\", " +
                "\"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/bc8ee1f756/\"}");
                var expectedEscapedJSONString = "{\"quoteText\": \"Don't turn away from possible futures before you're certain you " +
                    "don't have anything to learn from them.\", \"quoteAuthor\": \"Richard Bach\", \"senderName\": \"\", " +
                    "\"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/bc8ee1f756/\"}";
                assert.equal(escapedJSONString, expectedEscapedJSONString, "apostrophes should be unescaped within JSON string");
            });

            it("should escape nested double quotes within JSON string", function() {
                var escapedJSONString = helpers.escapeJSONString("{\"quoteText\": \"If you have made mistakes, there is " +
                "always another chance for you. You may have a fresh start any moment you choose, for this thing we " +
                "call \"failure\" is not the falling down, but the staying down.\", \"quoteAuthor\": \"Mary Pickford\", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/4258e034fe/\"}");
                var expectedEscapedJSONString = "{\"quoteText\": \"If you have made mistakes, there is " +
                    "always another chance for you. You may have a fresh start any moment you choose, for this thing we " +
                    "call \\\"failure\\\" is not the falling down, but the staying down.\", \"quoteAuthor\": \"Mary Pickford\", " +
                    "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/4258e034fe/\"}";
                assert.equal(escapedJSONString, expectedEscapedJSONString, "nested double quotes should be escaped within JSON string");
            });

            it("should escape nested double quotes and unescape apostrophe within JSON string", function() {
                var escapedJSONString = helpers.escapeJSONString("{\"quoteText\": \"'Acceptance says, \"True, this is " +
                "my situation at the moment. I\'ll look unblinkingly at the reality of it. But I will also open my " +
                "hands to accept willingly whatever a loving Father sends me.\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\"}");
                var expectedEscapedJSONString = "{\"quoteText\": \"'Acceptance says, \\\"True, this is " +
                    "my situation at the moment. I'll look unblinkingly at the reality of it. But I will also open my " +
                    "hands to accept willingly whatever a loving Father sends me.\\\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                    "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\"}";
                assert.equal(escapedJSONString, expectedEscapedJSONString, "nested double quotes should be escaped and apostrophe should be unescaped within JSON string");
            });

            it("should escape nested double quotes and unescape apostrophes within JSON string", function() {
                var escapedJSONString = helpers.escapeJSONString("{\"quoteText\": \"'Acceptance says, \"True, this is " +
                "my situation at the moment. I\'ll look unblinkingly at the reality of it. But I\'ll also open my " +
                "hands to accept willingly whatever a loving Father sends me.\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\"}");
                var expectedEscapedJSONString = "{\"quoteText\": \"'Acceptance says, \\\"True, this is " +
                    "my situation at the moment. I'll look unblinkingly at the reality of it. But I'll also open my " +
                    "hands to accept willingly whatever a loving Father sends me.\\\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                    "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\"}";
                assert.equal(escapedJSONString, expectedEscapedJSONString, "nested double quotes should be escaped and apostrophes should be unescaped within JSON string");
            });

            it("should escape multiple nested double quotes and unescape apostrophes within JSON string", function() {
                var escapedJSONString = helpers.escapeJSONString("{\"quoteText\": \"'Acceptance says, \"True, this is " +
                "my situation at the moment. I\'ll look \"unblinkingly\" at the reality of it. But I\'ll also open my " +
                "hands to accept willingly whatever a loving Father sends me.\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\"}");
                var expectedEscapedJSONString = "{\"quoteText\": \"'Acceptance says, \\\"True, this is " +
                    "my situation at the moment. I'll look \\\"unblinkingly\\\" at the reality of it. But I'll also open my " +
                    "hands to accept willingly whatever a loving Father sends me.\\\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                    "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\"}";
                assert.equal(escapedJSONString, expectedEscapedJSONString, "multiple nested double quotes should be escaped and apostrophes should be unescaped within JSON string");
            });
        });

        describe("#trimJSONObject()", function() {
            it("should trim all strings within JSON object", function() {
                var parsedObjectWithTrimmedStrings = helpers.deepTrimJSONObject(JSON.parse("{\"quoteText\": \"   'Acceptance says, \\\"True, this is " +
                "my situation at the moment. I'll look unblinkingly at the reality of it. But I'll also open my " +
                "hands to accept willingly whatever a loving Father sends me.\\\"   \", \"quoteAuthor\": \"  Catharine Marshall  \", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\"}"));
                var expectedParsedObjectWithTrimmedStrings = JSON.parse("{\"quoteText\": \"'Acceptance says, \\\"True, this is " +
                "my situation at the moment. I'll look unblinkingly at the reality of it. But I'll also open my " +
                "hands to accept willingly whatever a loving Father sends me.\\\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\"}");
                assert.deepEqual(parsedObjectWithTrimmedStrings, expectedParsedObjectWithTrimmedStrings, "JSON object strings should be trimmed");
            });

            it("should trim all strings within JSON object and its nested objects", function() {
                var parsedObjectWithTrimmedStrings = helpers.deepTrimJSONObject(JSON.parse("{\"quoteText\": \"   'Acceptance says, \\\"True, this is " +
                "my situation at the moment. I'll look unblinkingly at the reality of it. But I'll also open my " +
                "hands to accept willingly whatever a loving Father sends me.\\\"   \", \"quoteAuthor\": \"  Catharine Marshall  \", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\", " +
                "\"quoteDetails\": {\"seller\": \"Catharine Marshall\"}}"));
                var expectedParsedObjectWithTrimmedStrings = JSON.parse("{\"quoteText\": \"'Acceptance says, \\\"True, this is " +
                "my situation at the moment. I'll look unblinkingly at the reality of it. But I'll also open my " +
                "hands to accept willingly whatever a loving Father sends me.\\\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\", " +
                "\"quoteDetails\": {\"seller\": \"Catharine Marshall\"}}");
                assert.deepEqual(parsedObjectWithTrimmedStrings, expectedParsedObjectWithTrimmedStrings, "JSON object and its nested objects strings should be trimmed");
            });

            it("should trim all strings within JSON object and its nested objects, ignoring all non-string property values", function() {
                var parsedObjectWithTrimmedStrings = helpers.deepTrimJSONObject(JSON.parse("{\"quoteText\": \"   'Acceptance says, \\\"True, this is " +
                "my situation at the moment. I'll look unblinkingly at the reality of it. But I'll also open my " +
                "hands to accept willingly whatever a loving Father sends me.\\\"   \", \"quoteAuthor\": \"  Catharine Marshall  \", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\", " +
                "\"quoteDetails\": {\"public\": true, \"id\": 1, \"price\": 3.25, \"buyers\": null, " +
                "\"seller\": \"Catharine Marshall\"}}"));
                var expectedParsedObjectWithTrimmedStrings = JSON.parse("{\"quoteText\": \"'Acceptance says, \\\"True, this is " +
                "my situation at the moment. I'll look unblinkingly at the reality of it. But I'll also open my " +
                "hands to accept willingly whatever a loving Father sends me.\\\"\", \"quoteAuthor\": \"Catharine Marshall\", " +
                "\"senderName\": \"\", \"senderLink\": \"\", \"quoteLink\": \"http://forismatic.com/en/18e744e1c7/\", " +
                "\"quoteDetails\": {\"public\": true, \"id\": 1, \"price\": 3.25, \"buyers\": null, " +
                "\"seller\": \"Catharine Marshall\"}}");
                assert.deepEqual(parsedObjectWithTrimmedStrings, expectedParsedObjectWithTrimmedStrings, "JSON object and its nested objects strings should be trimmed, ignoring all non-string property values");
            });
        });

        describe("#deepFreezeObject()", function() {
            it("should not override any object properties", function() {
                var object = {
                    firstProperty: "1",
                    secondProperty: 2,
                    firstObject: {
                        firstProperty: "1",
                        secondProperty: 2
                    }
                };

                object = helpers.deepFreezeObject(object);

                object.firstProperty = "2";
                object.secondProperty = 1;
                object.firstObject = {
                    firstProperty: "2",
                    secondProperty: 1
                };

                var expectedObject = {
                    firstProperty: "1",
                    secondProperty: 2,
                    firstObject: {
                        firstProperty: "1",
                        secondProperty: 2
                    }
                };

                assert.deepEqual(object, expectedObject, "any object properties should not be overridden");
            });
        });
    });
});