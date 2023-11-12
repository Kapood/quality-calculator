"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fillDates_1 = require("./fillDates");
var moment_1 = __importDefault(require("moment"));
test("detects days", function () {
    expect((0, fillDates_1.detectDateType)([(0, moment_1.default)("2021-04-01"), (0, moment_1.default)("2020-11-01"), (0, moment_1.default)("2020-11-02"), (0, moment_1.default)("2022-07-01")])).toBe(fillDates_1.dateTypes.days);
});
test("detects months", function () {
    expect((0, fillDates_1.detectDateType)([(0, moment_1.default)("2021-04-01"), (0, moment_1.default)("2020-11-01"), (0, moment_1.default)("2022-07-01")])).toBe(fillDates_1.dateTypes.months);
});
test("detects quarters", function () {
    expect((0, fillDates_1.detectDateType)([(0, moment_1.default)("2021-04-01"), (0, moment_1.default)("2020-10-01"), (0, moment_1.default)("2022-07-01")])).toBe(fillDates_1.dateTypes.quarters);
});
test("detects years", function () {
    expect((0, fillDates_1.detectDateType)([(0, moment_1.default)("2021-01-01"), (0, moment_1.default)("2020-01-01"), (0, moment_1.default)("2022-01-01")])).toBe(fillDates_1.dateTypes.years);
});
test("handles empty list", function () {
    expect((0, fillDates_1.fillDates)({
        records: [],
        getDate: function (x) { return 0; },
        fill: function () { return undefined; },
    })).toStrictEqual([]);
});
test("leaves complete months alone", function () {
    expect((0, fillDates_1.fillDates)({
        records: [
            { date: "2020-04-01", totalSales: 10 },
            { date: "2020-05-01", totalSales: 4 },
            { date: "2020-06-01", totalSales: 9 },
            { date: "2020-07-01", totalSales: 3 },
        ],
        getDate: function (rec) { return rec.date; },
        fill: function (label, rec) { return (__assign({ label: label, totalSales: 0 }, rec)); },
        min: "2020-04-12",
        max: "2020-07-06",
    })).toStrictEqual([
        { label: "Apr 2020", date: "2020-04-01", totalSales: 10 },
        { label: "May 2020", date: "2020-05-01", totalSales: 4 },
        { label: "Jun 2020", date: "2020-06-01", totalSales: 9 },
        { label: "Jul 2020", date: "2020-07-01", totalSales: 3 },
    ]);
});
test("fills in missing months", function () {
    expect((0, fillDates_1.fillDates)({
        records: [
            { date: "2020-04-01", totalSales: 10 },
            { date: "2020-06-01", totalSales: 4 },
            { date: "2020-07-01", totalSales: 9 },
            { date: "2020-11-01", totalSales: 3 },
        ],
        getDate: function (rec) { return rec.date; },
        fill: function (label, rec) { return (__assign({ label: label, totalSales: 0 }, rec)); },
    })).toStrictEqual([
        { label: "Apr 2020", date: "2020-04-01", totalSales: 10 },
        { label: "May 2020", totalSales: 0 },
        { label: "Jun 2020", date: "2020-06-01", totalSales: 4 },
        { label: "Jul 2020", date: "2020-07-01", totalSales: 9 },
        { label: "Aug 2020", totalSales: 0 },
        { label: "Sep 2020", totalSales: 0 },
        { label: "Oct 2020", totalSales: 0 },
        { label: "Nov 2020", date: "2020-11-01", totalSales: 3 },
    ]);
});
test("fills in missing months and min/max range", function () {
    expect((0, fillDates_1.fillDates)({
        records: [
            { date: "2020-04-01", totalSales: 10 },
            { date: "2020-06-01", totalSales: 4 },
            { date: "2020-07-01", totalSales: 9 },
            { date: "2020-11-01", totalSales: 3 },
        ],
        getDate: function (rec) { return rec.date; },
        fill: function (label, rec) { return (__assign({ label: label, totalSales: 0 }, rec)); },
        min: "2020-02-15",
        max: "2020-12-02",
    })).toStrictEqual([
        { label: "Feb 2020", totalSales: 0 },
        { label: "Mar 2020", totalSales: 0 },
        { label: "Apr 2020", date: "2020-04-01", totalSales: 10 },
        { label: "May 2020", totalSales: 0 },
        { label: "Jun 2020", date: "2020-06-01", totalSales: 4 },
        { label: "Jul 2020", date: "2020-07-01", totalSales: 9 },
        { label: "Aug 2020", totalSales: 0 },
        { label: "Sep 2020", totalSales: 0 },
        { label: "Oct 2020", totalSales: 0 },
        { label: "Nov 2020", date: "2020-11-01", totalSales: 3 },
        { label: "Dec 2020", totalSales: 0 },
    ]);
});
test("leaves complete quarters alone", function () {
    expect((0, fillDates_1.fillDates)({
        records: [
            { date: "2020-07-01", totalSales: 10 },
            { date: "2020-10-01", totalSales: 4 },
            { date: "2021-01-01", totalSales: 9 },
            { date: "2021-04-01", totalSales: 3 },
        ],
        getDate: function (rec) { return rec.date; },
        fill: function (label, rec) { return (__assign({ label: label, totalSales: 0 }, rec)); },
        min: "2020-07-12",
        max: "2020-04-06",
    })).toStrictEqual([
        { label: "Jul-Sep 2020", date: "2020-07-01", totalSales: 10 },
        { label: "Oct-Dec 2020", date: "2020-10-01", totalSales: 4 },
        { label: "Jan-Mar 2021", date: "2021-01-01", totalSales: 9 },
        { label: "Apr-Jun 2021", date: "2021-04-01", totalSales: 3 },
    ]);
});
test("fills in missing quarters", function () {
    expect((0, fillDates_1.fillDates)({
        records: [
            { date: "2020-04-01", totalSales: 10 },
            { date: "2020-10-01", totalSales: 4 },
            { date: "2021-01-01", totalSales: 9 },
            { date: "2021-10-01", totalSales: 3 },
        ],
        type: fillDates_1.dateTypes.quarters,
        getDate: function (rec) { return rec.date; },
        fill: function (label, rec) { return (__assign({ label: label, totalSales: 0 }, rec)); },
    })).toStrictEqual([
        { label: "Apr-Jun 2020", date: "2020-04-01", totalSales: 10 },
        { label: "Jul-Sep 2020", totalSales: 0 },
        { label: "Oct-Dec 2020", date: "2020-10-01", totalSales: 4 },
        { label: "Jan-Mar 2021", date: "2021-01-01", totalSales: 9 },
        { label: "Apr-Jun 2021", totalSales: 0 },
        { label: "Jul-Sep 2021", totalSales: 0 },
        { label: "Oct-Dec 2021", date: "2021-10-01", totalSales: 3 },
    ]);
});
test("fills in missing quarters and min/max range", function () {
    expect((0, fillDates_1.fillDates)({
        records: [
            { date: "2020-04-01", totalSales: 10 },
            { date: "2020-10-01", totalSales: 4 },
            { date: "2021-01-01", totalSales: 9 },
            { date: "2021-10-01", totalSales: 3 },
        ],
        type: fillDates_1.dateTypes.quarters,
        getDate: function (rec) { return rec.date; },
        fill: function (label, rec) { return (__assign({ label: label, totalSales: 0 }, rec)); },
        min: "2019-10-10",
        max: "2022-01-06",
    })).toStrictEqual([
        { label: "Oct-Dec 2019", totalSales: 0 },
        { label: "Jan-Mar 2020", totalSales: 0 },
        { label: "Apr-Jun 2020", date: "2020-04-01", totalSales: 10 },
        { label: "Jul-Sep 2020", totalSales: 0 },
        { label: "Oct-Dec 2020", date: "2020-10-01", totalSales: 4 },
        { label: "Jan-Mar 2021", date: "2021-01-01", totalSales: 9 },
        { label: "Apr-Jun 2021", totalSales: 0 },
        { label: "Jul-Sep 2021", totalSales: 0 },
        { label: "Oct-Dec 2021", date: "2021-10-01", totalSales: 3 },
        { label: "Jan-Mar 2022", totalSales: 0 },
    ]);
});
test("explicit type overrides detection", function () {
    expect((0, fillDates_1.fillDates)({
        records: [
            { date: "2020-07-01", totalSales: 10 },
            { date: "2020-10-01", totalSales: 4 },
            { date: "2021-01-01", totalSales: 9 },
            { date: "2021-04-01", totalSales: 3 },
        ],
        getDate: function (rec) { return rec.date; },
        fill: function (label, rec) { return (__assign({ label: label, totalSales: 0 }, rec)); },
        type: fillDates_1.dateTypes.months,
    })).toStrictEqual([
        { label: "Jul 2020", date: "2020-07-01", totalSales: 10 },
        { label: "Aug 2020", totalSales: 0 },
        { label: "Sep 2020", totalSales: 0 },
        { label: "Oct 2020", date: "2020-10-01", totalSales: 4 },
        { label: "Nov 2020", totalSales: 0 },
        { label: "Dec 2020", totalSales: 0 },
        { label: "Jan 2021", date: "2021-01-01", totalSales: 9 },
        { label: "Feb 2021", totalSales: 0 },
        { label: "Mar 2021", totalSales: 0 },
        { label: "Apr 2021", date: "2021-04-01", totalSales: 3 },
    ]);
});
test("skips any rogue null dates", function () {
    expect((0, fillDates_1.fillDates)({
        records: [
            { date: null, totalSales: 10 },
            { date: "2020-06-01", totalSales: 4 },
            { date: "2020-07-01", totalSales: 9 },
            { date: "2020-11-01", totalSales: 3 },
        ],
        getDate: function (rec) { return rec.date; },
        fill: function (label, rec) { return (__assign({ label: label, totalSales: 0 }, rec)); },
        type: fillDates_1.dateTypes.months,
    })).toStrictEqual([
        { label: "Jun 2020", date: "2020-06-01", totalSales: 4 },
        { label: "Jul 2020", date: "2020-07-01", totalSales: 9 },
        { label: "Aug 2020", totalSales: 0 },
        { label: "Sep 2020", totalSales: 0 },
        { label: "Oct 2020", totalSales: 0 },
        { label: "Nov 2020", date: "2020-11-01", totalSales: 3 },
    ]);
});
//# sourceMappingURL=fillDates.test.js.map