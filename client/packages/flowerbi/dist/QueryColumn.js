"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringQueryColumn = exports.IntegerQueryColumn = exports.NumericQueryColumn = exports.QueryColumn = void 0;
/**
 * A column from the schema, with a name and a data type. A whole schema of
 * such declared columns can be auto-generated using the CLI.
 */
var QueryColumn = /** @class */ (function () {
    /**
     * @param name The name, of the form `table.column`.
     */
    function QueryColumn(name) {
        this.name = name;
    }
    QueryColumn.prototype.aggregation = function (aggregationType, filters) {
        return {
            column: this.name,
            function: aggregationType,
            filters: filters,
        };
    };
    /**
     * Aggregates the column by counting values.
     * @param filters Optional filters to apply.
     */
    QueryColumn.prototype.count = function (filters) {
        return this.aggregation("Count", filters);
    };
    /**
     * Aggregates the column by counting distinct values.
     * @param filters Optional filters to apply.
     */
    QueryColumn.prototype.countDistinct = function (filters) {
        return this.aggregation("CountDistinct", filters);
    };
    /**
     * Aggregates the column by selecting the minimum value.
     * @param filters Optional filters to apply.
     */
    QueryColumn.prototype.min = function (filters) {
        return this.aggregation("Min", filters);
    };
    /**
     * Aggregates the column by selecting the maximum value.
     * @param filters Optional filters to apply.
     */
    QueryColumn.prototype.max = function (filters) {
        return this.aggregation("Max", filters);
    };
    QueryColumn.prototype.filter = function (operator, value) {
        return {
            column: this.name,
            operator: operator,
            value: value,
        };
    };
    /**
     * Sorts by the column in ascending order.
     */
    QueryColumn.prototype.ascending = function () {
        return { column: this.name, descending: false };
    };
    /**
     * Sorts by the column in descending order.
     */
    QueryColumn.prototype.descending = function () {
        return { column: this.name, descending: true };
    };
    /**
     * Produces a filter that requires this column to be equal to some value.
     */
    QueryColumn.prototype.equalTo = function (value) {
        return this.filter("=", value);
    };
    /**
     * Produces a filter that requires this column to be not equal to some value.
     */
    QueryColumn.prototype.notEqualTo = function (value) {
        return this.filter("<>", value);
    };
    /**
     * Produces a filter that requires this column to be greater than to some
     * value.
     */
    QueryColumn.prototype.greaterThan = function (value) {
        return this.filter(">", value);
    };
    /**
     * Produces a filter that requires this column to be less than to some value.
     */
    QueryColumn.prototype.lessThan = function (value) {
        return this.filter("<", value);
    };
    /**
     * Produces a filter that requires this column to be greater than or equal to
     * some value.
     */
    QueryColumn.prototype.greaterThanOrEqualTo = function (value) {
        return this.filter(">=", value);
    };
    /**
     * Produces a filter that requires this column to be less than or equal to
     * some value.
     */
    QueryColumn.prototype.lessThanOrEqualTo = function (value) {
        return this.filter("<=", value);
    };
    /**
     * Produces a filter that requires this column's value to appear in the list.
     * Only supported for number or string columns.
     */
    QueryColumn.prototype.in = function (value) {
        return {
            column: this.name,
            operator: "IN",
            value: value,
        };
    };
    /**
     * Produces a filter that requires this column's value to not appear in the list.
     * Only supported for number or string columns.
     */
    QueryColumn.prototype.notIn = function (value) {
        return {
            column: this.name,
            operator: "NOT IN",
            value: value,
        };
    };
    return QueryColumn;
}());
exports.QueryColumn = QueryColumn;
var NumericQueryColumn = /** @class */ (function (_super) {
    __extends(NumericQueryColumn, _super);
    /**
     * @param name The name, of the form `table.column`.
     */
    function NumericQueryColumn(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    /**
     * Aggregates the column by summing values.
     * @param filters Optional filters to apply.
     */
    NumericQueryColumn.prototype.sum = function (filters) {
        return this.aggregation("Sum", filters);
    };
    /**
     * Aggregates the column by averaging values.
     * @param filters Optional filters to apply.
     */
    NumericQueryColumn.prototype.avg = function (filters) {
        return this.aggregation("Avg", filters);
    };
    return NumericQueryColumn;
}(QueryColumn));
exports.NumericQueryColumn = NumericQueryColumn;
var IntegerQueryColumn = /** @class */ (function (_super) {
    __extends(IntegerQueryColumn, _super);
    /**
     * @param name The name, of the form `table.column`.
     */
    function IntegerQueryColumn(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    IntegerQueryColumn.prototype.bitsIn = function (mask, value) {
        return {
            column: this.name,
            operator: "BITS IN",
            constant: mask,
            value: value,
        };
    };
    return IntegerQueryColumn;
}(NumericQueryColumn));
exports.IntegerQueryColumn = IntegerQueryColumn;
var StringQueryColumn = /** @class */ (function (_super) {
    __extends(StringQueryColumn, _super);
    /**
     * @param name The name, of the form `table.column`.
     */
    function StringQueryColumn(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    /**
     * Produces a filter that requires this column to match a LIKE expression.
     */
    StringQueryColumn.prototype.like = function (value) {
        return this.filter("LIKE", value);
    };
    return StringQueryColumn;
}(QueryColumn));
exports.StringQueryColumn = StringQueryColumn;
//# sourceMappingURL=QueryColumn.js.map