"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keysOf = exports.distinct = void 0;
/**
 * Returns the distinct (unique) values from an array. The comparison
 * method is very simplistic: all values are converted to strings
 * before comparison.
 * @param arr
 */
function distinct(arr) {
    var map = {};
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        map["".concat(item)] = item;
    }
    return Object.values(map);
}
exports.distinct = distinct;
/**
 * Returns the names of properties (i.e. the keys) in an object, statically
 * typed so each has the string literal type of one of the properties. This
 * is not always correct, because the type will include properties inherited
 * from the prototype, where as the values returned at runtime will never
 * include inherited properties. But it's a useful approximation in situations
 * where prototype inheritance can be ignored.
 *
 * @param obj The object to obtain keys from.
 */
function keysOf(obj) {
    return Object.keys(obj);
}
exports.keysOf = keysOf;
//# sourceMappingURL=arrayHelpers.js.map