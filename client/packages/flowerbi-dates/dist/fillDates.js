"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartDates = exports.fillDates = exports.detectDateType = exports.dateTypes = void 0;
var moment_1 = __importDefault(require("moment"));
function parseDate(val) {
    // Ensure a numeric year is not interpreted as offset from 1970!
    if (typeof val === "number") {
        val = "" + val;
    }
    return (0, moment_1.default)(val);
}
var days = {
    round: function (d) {
        return d.clone().startOf("day");
    },
    format: function (d) {
        return d.format("ll");
    },
    increment: function (d) {
        return d.clone().add(1, "day");
    },
};
var months = {
    round: function (d) {
        return d.clone().startOf("month");
    },
    format: function (d) {
        return d.format("MMM YYYY");
    },
    increment: function (d) {
        return d.clone().add(1, "month");
    },
};
var quarters = {
    round: function (d) {
        return d.clone().startOf("quarter");
    },
    format: function (d) {
        var monthFirst = d.format("MMM");
        var monthLast = d.clone().add(2, "months").format("MMM");
        var year = d.format("YYYY");
        return "".concat(monthFirst, "-").concat(monthLast, " ").concat(year);
    },
    increment: function (d) {
        return d.clone().add(3, "months");
    },
};
var years = {
    round: function (d) {
        return d.clone().startOf("year");
    },
    format: function (d) {
        return d.format("YYYY");
    },
    increment: function (d) {
        return d.clone().add(1, "year");
    },
};
/**
 * Standard built-in date types. To customise, implement the {@link FillDateType} interface.
 */
exports.dateTypes = {
    days: days,
    months: months,
    quarters: quarters,
    years: years,
};
/**
 * Examines a set of dates and chooses the most specific type that includes them all. If
 * all fall on Jan, 1 then `years` is chosen, and so on.
 */
function detectDateType(dates) {
    return !dates.every(function (x) { return x.date() === 1; })
        ? exports.dateTypes.days
        : !dates.every(function (x) { return x.month() % 3 === 0; })
            ? exports.dateTypes.months
            : !dates.every(function (x) { return x.month() === 0; })
                ? exports.dateTypes.quarters
                : exports.dateTypes.years;
}
exports.detectDateType = detectDateType;
/**
 * When querying for a time series chart, e.g. x-axis is _Month_ and y-axis is
 * _Total Sales_, there may be months where nothing was sold so they are
 * missing from the list of records.
 *
 * To render a proper time-series, we need these gaps to be filled in with
 * runs of fake records that give zero amounts for those months. e.g.
 *
 * ```ts
 * const filled = fillDates({
 *     records: [
 *         { date: '2020-04-01', totalSales: 10 },
 *         { date: '2020-06-01', totalSales: 4 },
 *         { date: '2020-07-01', totalSales: 9 },
 *     ],
 *     type: dateTypes.months,
 *     getDate: rec => rec.date,
 *     fill: (label, rec) => ({
 *         label,
 *         totalSales: 0,
 *         ...rec
 *     })
 * });
 * ```
 *
 * In the above example we add a `label` property to all the records, and
 * for the records that fill the gaps we set the `totalSales` property to 0.
 * For the real records, `...rec` will copy the real value of `totalSales`.
 *
 * To do this, we need to know:
 *
 * - how to round a date to the start of a unit (year, month, quarter),
 * - how to increment a date by that unit,
 * - how to format a date to a string for display.
 *
 * These operations are encapsulated by the {@link FillDateType} interface.
 * Several built-in types are provided in {@link dateTypes}, but you can
 * implement your own.
 *
 * Optionally you can also pass `min` and `max` dates, which will cause
 * extra records to be added at the start and end of the range if necessary.
 *
 * If you don't pass a `type`, a suitable type will be detected based on
 * how the input record dates fall on unit boundaries.
 */
function fillDates(_a) {
    var records = _a.records, getDate = _a.getDate, fill = _a.fill, min = _a.min, max = _a.max, type = _a.type;
    records = __spreadArray([], records, true);
    records.sort(function (x, y) { return parseDate(getDate(x)).diff(parseDate(getDate(y))); });
    type = type !== null && type !== void 0 ? type : detectDateType(records.map(function (d) { return parseDate(getDate(d)); }));
    var results = [];
    var latest = undefined;
    var lower = min ? type.round(parseDate(min)) : undefined;
    for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
        var record = records_1[_i];
        var d = getDate(record);
        if (!d)
            continue;
        var current = parseDate(d);
        for (;;) {
            latest = latest ? type.increment(latest) : lower;
            if (!latest || latest >= current) {
                break;
            }
            results.push(fill(type.format(latest), undefined));
        }
        results.push(fill(type.format(current), record));
        latest = current;
    }
    if (latest && max) {
        var upper = type.round(parseDate(max));
        for (;;) {
            latest = type.increment(latest);
            if (latest > upper) {
                break;
            }
            results.push(fill(type.format(latest), undefined));
        }
    }
    return results;
}
exports.fillDates = fillDates;
/** @deprecated */
function smartDates(records, min, max, getDate, fill) {
    return fillDates({ records: records, min: min, max: max, getDate: getDate, fill: fill });
}
exports.smartDates = smartDates;
//# sourceMappingURL=fillDates.js.map