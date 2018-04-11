/**
 * parseQueryString
 * @param {string} queryString
 * @return {object} parsed key-values
 */
function parseQueryString(queryString) {
    var result = {};
    queryString.split('&').forEach(function(part) {
        var item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

/**
 * parseQueryString
 * @param {object} key-value object with parameters
 * @return {string} serialized parameters for query string
 */
function buildQueryString(obj) {
    var keys = Object.keys(obj);
    var params = [];
    for (var i = 0, l = keys.length; i < l; i++) {
        params.push(keys[i] + '=' + encodeURIComponent(obj[keys[i]]));
    }
    return params.join('&');
}

module.exports = {
    parseQueryString: parseQueryString,
    buildQueryString: buildQueryString
};
