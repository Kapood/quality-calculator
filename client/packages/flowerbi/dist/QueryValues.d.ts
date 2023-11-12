import { QuerySelect, ExpandedQueryRecord, AggregateValuesOnly, AggregatePropsOnly, ExpandedQueryRecordWithOptionalColumns, QueryCalculations, CalculationValues } from "./queryModel";
/**
 * An abstract interface representing either a row from a dataset or
 * the {@link ExpandedQueryResult.totals} row, so that generic code can
 * format either of them in a consistent way.
 */
export interface QueryValues<S extends QuerySelect, C extends QueryCalculations<S>> {
    /**
     * The plain values of columns, which may be `undefined` if this
     * refers to the {@link ExpandedQueryResult.totals} record.
     */
    values: ExpandedQueryRecordWithOptionalColumns<S, C>;
    percentage<K extends AggregatePropsOnly<S>>(key: K): number;
}
export declare class QueryValuesRow<S extends QuerySelect, C extends QueryCalculations<S>> implements QueryValues<S, C> {
    readonly values: ExpandedQueryRecord<S, C>;
    readonly totals: (AggregateValuesOnly<S> & CalculationValues<C>) | undefined;
    constructor(values: ExpandedQueryRecord<S, C>, totals: (AggregateValuesOnly<S> & CalculationValues<C>) | undefined);
    percentage<K extends AggregatePropsOnly<S>>(key: K): number;
}
export declare class QueryValuesTotal<S extends QuerySelect, C extends QueryCalculations<S>> implements QueryValues<S, C> {
    readonly values: ExpandedQueryRecordWithOptionalColumns<S, C>;
    constructor(totals: AggregateValuesOnly<S> & CalculationValues<C>);
    percentage(): number;
}
