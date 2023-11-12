"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryValuesTotal = exports.QueryValuesRow = void 0;
var QueryValuesRow = /** @class */ (function () {
    function QueryValuesRow(values, totals) {
        this.values = values;
        this.totals = totals;
    }
    QueryValuesRow.prototype.percentage = function (key) {
        var _a;
        if (!this.totals)
            return 0;
        var rawValue = this.values[key];
        var total = (_a = this.totals[key]) !== null && _a !== void 0 ? _a : 0;
        var percent = total === 0 ? 0 : (rawValue / total) * 100;
        return Math.round(percent * 100) / 100;
    };
    return QueryValuesRow;
}());
exports.QueryValuesRow = QueryValuesRow;
var QueryValuesTotal = /** @class */ (function () {
    function QueryValuesTotal(totals) {
        this.values = totals;
    }
    QueryValuesTotal.prototype.percentage = function () {
        return 100;
    };
    return QueryValuesTotal;
}());
exports.QueryValuesTotal = QueryValuesTotal;
//# sourceMappingURL=QueryValues.js.map