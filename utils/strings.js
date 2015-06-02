/*
 * File         :   strings.js
 * Description  :   Collection of useful string utilities.
 * ------------------------------------------------------------------------------------------------ */
module.exports = {
    lowerCaseFirst : (value) => {
        value = value || ((typeof this === "string" || this instanceof String) ? this.toString() : undefined);

        if (value && value.replace) {
            value = value.replace(/^\w/, (character) => character.toLowerCase());
        }

        return value;
    }
};