/**
 * @module helpers
 * @description Helper methods for forismatic module.
 * @version 1.0.3
 * @author Anatoliy Gatt [anatoliy.gatt@aol.com]
 * @copyright Copyright (c) 2015 Anatoliy Gatt
 * @license MIT
 */

"use strict";

/**
 * @private
 * @function escapeJSONString
 * @description Unescape apostrophes and escape nested double quotes within JSON strings.
 * @param {String} JSONString - JSON string with possibly unescaped double quotes and escaped apostrophes.
 * @returns {String} - Escaped JSON string.
 */

function escapeJSONString(JSONString) {
    JSONString = JSONString.replace(new RegExp("\\'".replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), "'");
    JSONString = JSONString.replace(/"((?:"[^"]*"|[^"])*?)"(?=[:},])(?=(?:"[^"]*"|[^"])*$)/gm, function(match, group) {
        return '"' + group.replace(/"/g, '\\"') + '"'
    });
    return JSONString;
}

/**
 * @private
 * @function deepTrimJSONObject
 * @description Deep trim strings within JSON object.
 * @param {Object} JSONObject - JSON object with possibly untrimmed properties of type {String}.
 * @returns {Object} - JSON object with trimmed properties of type {String}.
 */

function deepTrimJSONObject(JSONObject) {
    for(var property in JSONObject) {
        if(JSONObject.hasOwnProperty(property)) {
            if((typeof JSONObject[property] === "object") || (JSONObject[property] instanceof Object)) {
                deepTrimJSONObject(JSONObject[property]);
            } else if((typeof JSONObject[property] === "string") || (JSONObject[property] instanceof String)) {
                JSONObject[property] = JSONObject[property].trim();
            }
        }
    }
    return JSONObject;
}

/**
 * @private
 * @function deepFreezeObject
 * @description Deep freeze object.
 * @param {Object} object - Object to deep freeze.
 * @returns {Object} - Deep frozen object.
 */

function deepFreezeObject(object) {
    var property, propertyKey;
    object = Object.freeze(object);
    for (propertyKey in object) {
        property = object[propertyKey];
        if (!object.hasOwnProperty(propertyKey) || (!(typeof property === "object") || !(property instanceof Object)) || Object.isFrozen(property)) {
            continue;
        }
        deepFreezeObject(property);
    }
    return object;
}

/**
 * @private
 * @description Expose object with helper functions.
 * @returns {Object} - Object with helper functions.
 */

module.exports = {
    escapeJSONString: escapeJSONString,
    deepTrimJSONObject: deepTrimJSONObject,
    deepFreezeObject: deepFreezeObject
};