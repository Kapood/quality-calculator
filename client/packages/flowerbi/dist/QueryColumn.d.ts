import { FilterValue, AggregationType, FilterJson, AggregationJson, FilterOperator, OrderingJson } from "./QueryJson";
/**
 * A column from the schema, with a name and a data type. A whole schema of
 * such declared columns can be auto-generated using the CLI.
 */
export declare class QueryColumn<T extends FilterValue> {
    readonly name: string;
    /**
     * @param name The name, of the form `table.column`.
     */
    constructor(name: string);
    protected aggregation(aggregationType: AggregationType, filters?: FilterJson[]): AggregationJson;
    /**
     * Aggregates the column by counting values.
     * @param filters Optional filters to apply.
     */
    count(filters?: FilterJson[]): AggregationJson;
    /**
     * Aggregates the column by counting distinct values.
     * @param filters Optional filters to apply.
     */
    countDistinct(filters?: FilterJson[]): AggregationJson;
    /**
     * Aggregates the column by selecting the minimum value.
     * @param filters Optional filters to apply.
     */
    min(filters?: FilterJson[]): AggregationJson;
    /**
     * Aggregates the column by selecting the maximum value.
     * @param filters Optional filters to apply.
     */
    max(filters?: FilterJson[]): AggregationJson;
    protected filter(operator: FilterOperator, value: T): FilterJson;
    /**
     * Sorts by the column in ascending order.
     */
    ascending(): OrderingJson;
    /**
     * Sorts by the column in descending order.
     */
    descending(): OrderingJson;
    /**
     * Produces a filter that requires this column to be equal to some value.
     */
    equalTo(value: T): FilterJson;
    /**
     * Produces a filter that requires this column to be not equal to some value.
     */
    notEqualTo(value: T): FilterJson;
    /**
     * Produces a filter that requires this column to be greater than to some
     * value.
     */
    greaterThan(value: T): FilterJson;
    /**
     * Produces a filter that requires this column to be less than to some value.
     */
    lessThan(value: T): FilterJson;
    /**
     * Produces a filter that requires this column to be greater than or equal to
     * some value.
     */
    greaterThanOrEqualTo(value: T): FilterJson;
    /**
     * Produces a filter that requires this column to be less than or equal to
     * some value.
     */
    lessThanOrEqualTo(value: T): FilterJson;
    /**
     * Produces a filter that requires this column's value to appear in the list.
     * Only supported for number or string columns.
     */
    in(value: T extends number | string ? T[] : never): FilterJson;
    /**
     * Produces a filter that requires this column's value to not appear in the list.
     * Only supported for number or string columns.
     */
    notIn(value: T extends number | string ? T[] : never): FilterJson;
}
export declare class NumericQueryColumn<T extends number | null = number> extends QueryColumn<T> {
    readonly name: string;
    /**
     * @param name The name, of the form `table.column`.
     */
    constructor(name: string);
    /**
     * Aggregates the column by summing values.
     * @param filters Optional filters to apply.
     */
    sum(filters?: FilterJson[]): AggregationJson;
    /**
     * Aggregates the column by averaging values.
     * @param filters Optional filters to apply.
     */
    avg(filters?: FilterJson[]): AggregationJson;
}
export declare class IntegerQueryColumn<T extends number | null = number> extends NumericQueryColumn<T> {
    readonly name: string;
    /**
     * @param name The name, of the form `table.column`.
     */
    constructor(name: string);
    bitsIn(mask: number, value: NonNullable<T>[]): FilterJson;
}
export declare class StringQueryColumn<T extends string | null = string> extends QueryColumn<T> {
    readonly name: string;
    /**
     * @param name The name, of the form `table.column`.
     */
    constructor(name: string);
    /**
     * Produces a filter that requires this column to match a LIKE expression.
     */
    like(value: T): FilterJson;
}
