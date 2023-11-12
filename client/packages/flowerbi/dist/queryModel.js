"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnsOnly = exports.getColumnPropsOnly = exports.getAggregatePropsOnly = void 0;
var arrayHelpers_1 = require("./arrayHelpers");
var QueryColumn_1 = require("./QueryColumn");
/**
 * Returns the names of properties in a query that refer to aggregated columns.
 * The result is an array of strings, but type-constrained to string literal types:
 *
 * ```ts
 * getAggregatePropsOnly({
 *    customer: Customer.Name,
 *    spend: Invoice.Amount.sum()
 * }) // ["spend"]
 * ```
 *
 * @param select the `select` object from a query
 */
function getAggregatePropsOnly(select) {
    var keys = (0, arrayHelpers_1.keysOf)(select).filter(function (x) { return !(select[x] instanceof QueryColumn_1.QueryColumn); });
    return keys;
}
exports.getAggregatePropsOnly = getAggregatePropsOnly;
/**
 * Returns the names of properties in a query that refer to plain columns. The
 * result is an array of strings, but type-constrained to string literal types:
 *
 * ```ts
 * getColumnPropsOnly({
 *    customer: Customer.Name,
 *    spend: Invoice.Amount.sum()
 * }) // ["customer"]
 * ```
 *
 * @param select the `select` object from a query
 */
function getColumnPropsOnly(select) {
    var keys = (0, arrayHelpers_1.keysOf)(select).filter(function (x) { return select[x] instanceof QueryColumn_1.QueryColumn; });
    return keys;
}
exports.getColumnPropsOnly = getColumnPropsOnly;
/**
 * Returns the plain column objects referred to in a query, ignoring
 * aggregated columns.
 * @param select the `select` object from a query
 */
function getColumnsOnly(select) {
    return (0, arrayHelpers_1.keysOf)(select)
        .map(function (k) { return select[k]; })
        .filter(function (x) { return x instanceof QueryColumn_1.QueryColumn; })
        .map(function (x) { return x; });
}
exports.getColumnsOnly = getColumnsOnly;
//# sourceMappingURL=queryModel.js.map