import { fillDates, dateTypes, detectDateType } from "./fillDates";
import moment from "moment";

test("detects days", () => {
    expect(detectDateType([moment("2023-04-01"), moment("2023-11-01"), moment("2023-11-02"), moment("2023-07-01")])).toBe(dateTypes.days);
});

test("detects months", () => {
    expect(detectDateType([moment("2023-04-01"), moment("2023-11-01"), moment("2023-07-01")])).toBe(dateTypes.months);
});

test("detects quarters", () => {
    expect(detectDateType([moment("2023-04-01"), moment("2023-10-01"), moment("2023-07-01")])).toBe(dateTypes.quarters);
});

test("detects years", () => {
    expect(detectDateType([moment("2023-01-01"), moment("2023-01-01"), moment("2023-01-01")])).toBe(dateTypes.years);
});

test("handles empty list", () => {
    expect(
        fillDates({
            records: [],
            getDate: (x) => 0,
            fill: () => undefined,
        })
    ).toStrictEqual([]);
});

test("leaves complete months alone", () => {
    expect(
        fillDates({
            records: [
                { date: "2023-04-01", totalSales: 10 },
                { date: "2023-05-01", totalSales: 4 },
                { date: "2023-06-01", totalSales: 9 },
                { date: "2023-07-01", totalSales: 3 },
            ],
            getDate: (rec) => rec.date,
            fill: (label, rec) => ({
                label,
                totalSales: 0,
                ...rec,
            }),
            min: "2023-04-12",
            max: "2023-07-06",
        })
    ).toStrictEqual([
        { label: "Apr 2023", date: "2023-04-01", totalSales: 10 },
        { label: "May 2023", date: "2023-05-01", totalSales: 4 },
        { label: "Jun 2023", date: "2023-06-01", totalSales: 9 },
        { label: "Jul 2023", date: "2023-07-01", totalSales: 3 },
    ]);
});

test("fills in missing months", () => {
    expect(
        fillDates({
            records: [
                { date: "2023-04-01", totalSales: 10 },
                { date: "2023-06-01", totalSales: 4 },
                { date: "2023-07-01", totalSales: 9 },
                { date: "2023-11-01", totalSales: 3 },
            ],
            getDate: (rec) => rec.date,
            fill: (label, rec) => ({
                label,
                totalSales: 0,
                ...rec,
            }),
        })
    ).toStrictEqual([
        { label: "Apr 2023", date: "2023-04-01", totalSales: 10 },
        { label: "May 2023", totalSales: 0 },
        { label: "Jun 2023", date: "2023-06-01", totalSales: 4 },
        { label: "Jul 2023", date: "2023-07-01", totalSales: 9 },
        { label: "Aug 2023", totalSales: 0 },
        { label: "Sep 2023", totalSales: 0 },
        { label: "Oct 2023", totalSales: 0 },
        { label: "Nov 2023", date: "2023-11-01", totalSales: 3 },
    ]);
});

test("fills in missing months and min/max range", () => {
    expect(
        fillDates({
            records: [
                { date: "2023-04-01", totalSales: 10 },
                { date: "2023-06-01", totalSales: 4 },
                { date: "2023-07-01", totalSales: 9 },
                { date: "2023-11-01", totalSales: 3 },
            ],
            getDate: (rec) => rec.date,
            fill: (label, rec) => ({
                label,
                totalSales: 0,
                ...rec,
            }),
            min: "2023-02-15",
            max: "2023-12-02",
        })
    ).toStrictEqual([
        { label: "Feb 2023", totalSales: 0 },
        { label: "Mar 2023", totalSales: 0 },
        { label: "Apr 2023", date: "2023-04-01", totalSales: 10 },
        { label: "May 2023", totalSales: 0 },
        { label: "Jun 2023", date: "2023-06-01", totalSales: 4 },
        { label: "Jul 2023", date: "2023-07-01", totalSales: 9 },
        { label: "Aug 2023", totalSales: 0 },
        { label: "Sep 2023", totalSales: 0 },
        { label: "Oct 2023", totalSales: 0 },
        { label: "Nov 2023", date: "2023-11-01", totalSales: 3 },
        { label: "Dec 2023", totalSales: 0 },
    ]);
});

test("leaves complete quarters alone", () => {
    expect(
        fillDates({
            records: [
                { date: "2023-07-01", totalSales: 10 },
                { date: "2023-10-01", totalSales: 4 },
                { date: "2023-01-01", totalSales: 9 },
                { date: "2023-04-01", totalSales: 3 },
            ],
            getDate: (rec) => rec.date,
            fill: (label, rec) => ({
                label,
                totalSales: 0,
                ...rec,
            }),
            min: "2023-07-12",
            max: "2023-04-06",
        })
    ).toStrictEqual([
        { label: "Jul-Sep 2023", date: "2023-07-01", totalSales: 10 },
        { label: "Oct-Dec 2023", date: "2023-10-01", totalSales: 4 },
        { label: "Jan-Mar 2023", date: "2023-01-01", totalSales: 9 },
        { label: "Apr-Jun 2023", date: "2023-04-01", totalSales: 3 },
    ]);
});

test("fills in missing quarters", () => {
    expect(
        fillDates({
            records: [
                { date: "2023-04-01", totalSales: 10 },
                { date: "2023-10-01", totalSales: 4 },
                { date: "2023-01-01", totalSales: 9 },
                { date: "2023-10-01", totalSales: 3 },
            ],
            type: dateTypes.quarters,
            getDate: (rec) => rec.date,
            fill: (label, rec) => ({
                label,
                totalSales: 0,
                ...rec,
            }),
        })
    ).toStrictEqual([
        { label: "Apr-Jun 2023", date: "2023-04-01", totalSales: 10 },
        { label: "Jul-Sep 2023", totalSales: 0 },
        { label: "Oct-Dec 2023", date: "2023-10-01", totalSales: 4 },
        { label: "Jan-Mar 2023", date: "2023-01-01", totalSales: 9 },
        { label: "Apr-Jun 2023", totalSales: 0 },
        { label: "Jul-Sep 2023", totalSales: 0 },
        { label: "Oct-Dec 2023", date: "2023-10-01", totalSales: 3 },
    ]);
});

test("fills in missing quarters and min/max range", () => {
    expect(
        fillDates({
            records: [
                { date: "2023-04-01", totalSales: 10 },
                { date: "2023-10-01", totalSales: 4 },
                { date: "2023-01-01", totalSales: 9 },
                { date: "2023-10-01", totalSales: 3 },
            ],
            type: dateTypes.quarters,
            getDate: (rec) => rec.date,
            fill: (label, rec) => ({
                label,
                totalSales: 0,
                ...rec,
            }),
            min: "2013-10-10",
            max: "2023-01-06",
        })
    ).toStrictEqual([
        { label: "Oct-Dec 2023", totalSales: 0 },
        { label: "Jan-Mar 2023", totalSales: 0 },
        { label: "Apr-Jun 2023", date: "2023-04-01", totalSales: 10 },
        { label: "Jul-Sep 2023", totalSales: 0 },
        { label: "Oct-Dec 2023", date: "2023-10-01", totalSales: 4 },
        { label: "Jan-Mar 2023", date: "2023-01-01", totalSales: 9 },
        { label: "Apr-Jun 2023", totalSales: 0 },
        { label: "Jul-Sep 2023", totalSales: 0 },
        { label: "Oct-Dec 2023", date: "2023-10-01", totalSales: 3 },
        { label: "Jan-Mar 2023", totalSales: 0 },
    ]);
});

test("explicit type overrides detection", () => {
    expect(
        fillDates({
            records: [
                { date: "2023-07-01", totalSales: 10 },
                { date: "2023-10-01", totalSales: 4 },
                { date: "2023-01-01", totalSales: 9 },
                { date: "2023-04-01", totalSales: 3 },
            ],
            getDate: (rec) => rec.date,
            fill: (label, rec) => ({
                label,
                totalSales: 0,
                ...rec,
            }),
            type: dateTypes.months,
        })
    ).toStrictEqual([
        { label: "Jul 2023", date: "2023-07-01", totalSales: 10 },
        { label: "Aug 2023", totalSales: 0 },
        { label: "Sep 2023", totalSales: 0 },
        { label: "Oct 2023", date: "2023-10-01", totalSales: 4 },
        { label: "Nov 2023", totalSales: 0 },
        { label: "Dec 2023", totalSales: 0 },
        { label: "Jan 2023", date: "2023-01-01", totalSales: 9 },
        { label: "Feb 2023", totalSales: 0 },
        { label: "Mar 2023", totalSales: 0 },
        { label: "Apr 2023", date: "2023-04-01", totalSales: 3 },
    ]);
});

test("skips any rogue null dates", () => {
    expect(
        fillDates({
            records: [
                { date: null, totalSales: 10 },
                { date: "2023-06-01", totalSales: 4 },
                { date: "2023-07-01", totalSales: 9 },
                { date: "2023-11-01", totalSales: 3 },
            ],
            getDate: (rec) => rec.date!,
            fill: (label, rec) => ({
                label,
                totalSales: 0,
                ...rec,
            }),
            type: dateTypes.months,
        })
    ).toStrictEqual([
        { label: "Jun 2023", date: "2023-06-01", totalSales: 4 },
        { label: "Jul 2023", date: "2023-07-01", totalSales: 9 },
        { label: "Aug 2023", totalSales: 0 },
        { label: "Sep 2023", totalSales: 0 },
        { label: "Oct 2023", totalSales: 0 },
        { label: "Nov 2023", date: "2023-11-01", totalSales: 3 },
    ]);
});
