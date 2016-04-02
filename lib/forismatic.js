/**
 * @module forismatic
 * @description Client for Forismatic API.
 * @version 1.1.4
 * @author Anatoliy Gatt [anatoliy.gatt@aol.com]
 * @copyright Copyright (c) 2015-2016 Anatoliy Gatt
 * @license MIT
 */

'use strict';

/**
 * @private
 * @description Module dependencies.
 */

var http = require('http');
var querystring = require('querystring');
var escapeJSON = require('escape-json-node');
var trim = require('deep-trim-node');

/**
 * @private
 * @constant {String}
 * @description Module version.
 */

var VERSION = require('../package.json').version;

/**
 * @public
 * @constructor
 * @description Initialize instance of Forismatic with default request options.
 * @property {Object} defaultRequestOptions - Default request options.
 * @property {String} defaultRequestOptions.hostname - Default request hostname.
 * @property {Number} defaultRequestOptions.port - Default request port.
 * @property {String} defaultRequestOptions.basePath - Default request base path.
 */

function Forismatic() {
    this.defaultRequestOptions = {
        hostname: 'api.forismatic.com',
        port: 80,
        basePath: '/api/1.0/'
    };
}

/**
 * @public
 * @function getQuote
 * @description Request random quote.
 * @param {Object} [options] - Optional request parameters.
 * @param {String} [options.lang] - Response language ('en' or 'ru').
 * @param {Number|String} [options.key] - Influence the choice of quotation, the maximum length is 6 characters.
 * @param {Boolean} [options.generateKey] - Determine whether numeric key is auto-generated.
 * @param {getQuote~callback} callback - Callback when response comes in.
 */

Forismatic.prototype.getQuote = function (options, callback) {
    if ((typeof options === 'function') || (options instanceof Function)) {
        callback = options;
    } else if ((typeof callback !== 'function') || !(callback instanceof Function)) {
        throw new Error('getQuote(): callback is undefined or contains non-function value');
    }

    var requestParameters = {
        method: 'getQuote',
        format: 'json',
        lang: options.lang || 'en'
    };

    if (options.generateKey === true) {
        requestParameters.key = generateKey();
    } else {
        if(options.key) {
            requestParameters.key = options.key;
        }
    }

    var request = http.get({
        hostname: this.defaultRequestOptions.hostname,
        port: this.defaultRequestOptions.port,
        path: this.defaultRequestOptions.basePath + '?' + querystring.stringify(requestParameters),
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': '*',
            'Accept-Language': options.lang ? options.lang : 'en',
            'Accept-Datetime': new Date().toUTCString(),
            'Cache-Control': 'no-cache',
            'Connection': 'close',
            'Date': new Date().toUTCString(),
            'Host': this.defaultRequestOptions.hostname,
            'Max-Forwards': 1,
            'Pragma': 'no-cache',
            'TE': 'trailers, deflate',
            'User-Agent': 'forismatic-node/' + VERSION
        },
        agent: false,
        keepAlive: false
    }, function (response) {
        var rawResponse = '';
        response.on('data', function (data) {
            rawResponse += data;
        });
        response.on('end', function () {
            var parsedResponse;
            try {
                parsedResponse = JSON.parse(escapeJSON(rawResponse));
            } catch (error) {
                return callback(error);
            }
            callback(null, trim(parsedResponse));
        });
        response.on('error', function (error) {
            callback(error);
        });
    });
    request.on('error', function (error) {
        callback(error);
    });
};

/**
 * @callback getQuote~callback
 * @description Use as callback in getQuote function.
 * @param {Object} error - Generic error object.
 * @param {Object} quote - Quote object.
 */

/**
 * @private
 * @function generateKey
 * @description Generate numeric key with maximum length of 6 digits.
 * @returns {Number} - Generated numeric key.
 */

function generateKey() {
    return Math.floor(Math.random() * (999999 - 1 + 1)) + 1;
}

/**
 * @public
 * @description Expose instance of Forismatic.
 * @returns {Object} - Instance of Forismatic.
 */

module.exports = function () {
    return new Forismatic();
};