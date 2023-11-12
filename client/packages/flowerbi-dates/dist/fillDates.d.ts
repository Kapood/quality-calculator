import { Moment } from "moment";
export declare type FillDate = Date | string | number | Moment;
/**
 * Three operations on dates used by {@link fillDates}.
 */
export declare type FillDateType = {
    /** Round the given date down to the nearest whole unit (e.g. start of month, quarter, year) */
    round(d: Moment): Moment;
    /** Format the given date to a string */
    format(d: Moment): string;
    /** Increment the date by the unit. The given date will already be rounded down. */
    increment(d: Moment): Moment;
};
/**
 * Standard built-in date types. To customise, implement the {@link FillDateType} interface.
 */
export declare const dateTypes: {
    readonly days: FillDateType;
    readonly months: FillDateType;
    readonly quarters: FillDateType;
    readonly years: FillDateType;
};
/**
 * Examines a set of dates and chooses the most specific type that includes them all. If
 * all fall on Jan, 1 then `years` is chosen, and so on.
 */
export declare function detectDateType(dates: Moment[]): FillDateType;
/** Options for {@link fillDates} function. */
export interface FillDatesOptions<T, R> {
    /** The records to base the filled list on. */
    records: T[];
    /** The operations to use for rounding, incrementing and formatting dates. */
    type?: FillDateType;
    /** Extracts a date value from a record in the input list. */
    getDate(record: T): FillDate;
    /**
     * Generate a record for a date, from the formatted {@link dateText} and
     * the input record for that date, if any.
     */
    fill(dateText: string, record: T | undefined): R;
    /**
     * The minimum date to generate. It will be rounded down by the {@link type}
     * so doesn't need to be on an exact boundary.
     */
    min?: FillDate;
    /**
     * The maximum date to generate. It will be rounded down by the {@link type}
     * so doesn't need to be on an exact boundary.
     */
    max?: FillDate;
}
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
export declare function fillDates<T, R>({ records, getDate, fill, min, max, type }: FillDatesOptions<T, R>): R[];
/** @deprecated */
export declare function smartDates<T, R>(records: T[], min: FillDate | undefined, max: FillDate | undefined, getDate: (record: T) => FillDate, fill: (dateText: string, record: T | undefined) => R): R[];
