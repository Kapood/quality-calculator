import { Query, QuerySelect, ExpandedQueryRecord, AggregateValuesOnly, QueryCalculations, CalculationValues } from "./queryModel";
import { QueryJson } from "./QueryJson";
/**
 * The allowed data types for plain columns.
 */
export declare type QuerySelectValue = number | string | Date | boolean;
/**
 * The JSON format of a record returned from the API when executing a query.
 */
export interface QueryRecordJson {
    /**
     * The plain column values.
     */
    selected: QuerySelectValue[];
    /**
     * The aggregated column values.
     */
    aggregated: number[];
}
/**
 * The JSON format of the whole payload returned from the API when
 * executing a query.
 */
export interface QueryResultJson {
    /**
     * The records of the query result.
     */
    records: QueryRecordJson[];
    /**
     * Optional extra record, only available if {@link QueryJson.totals}
     * was specified as `true` in the query, containing the aggregation
     * totals.
     */
    totals?: QueryRecordJson;
}
/**
 * The function you need to implement to pass {@link QueryJson} payloads to
 * your API and get them executed. This will typically be a wrapper around
 * the `fetch` browser API, or something more high-level, and can make use
 * of whatever authentication method you prefer.
 */
export declare type QueryFetch = (queryJson: QueryJson) => Promise<QueryResultJson>;
/**
 * Converts a statically-typed {@link Query} into the {@link QueryJson}
 * format, ready to be sent to your API.
 * @param query
 */
export declare function jsonifyQuery<S extends QuerySelect, C extends QueryCalculations<S>>(query: Query<S, C>): QueryJson;
/**
 * Converts the `QueryRecordJson` for a single record into a strongly-typed record
 * with named properties, using the {@link Query.select} from the query to perform
 * the necessary mapping.
 * @param select The {@link Query.select} property from the query.
 * @param record The record returned from your API.
 */
export declare function expandQueryRecord<S extends QuerySelect, C extends QueryCalculations<S>>(select: S, record: QueryRecordJson, calcs?: C): ExpandedQueryRecord<S, C>;
/**
 * Converts the `QueryRecordJson` from the `totals` record into a strongly-typed
 * record named properties for the aggregated values only, using the
 * {@link Query.select} from the query to perform the necessary mapping.
 *
 * @param select The {@link Query.select} property from the query.
 * @param record The {@link QueryResultJson.totals} record returned from your API.
 */
export declare function getAggregateValuesOnly<S extends QuerySelect, C extends QueryCalculations<S>>(select: S, record: QueryRecordJson, calcs?: C): AggregateValuesOnly<S> & CalculationValues<C>;
/**
 * The statically-typed result of a {@link Query}.
 */
export interface ExpandedQueryResult<S extends QuerySelect, C extends QueryCalculations<S>> {
    /**
     * The set of records returned, each having named properties
     * corresponding to the plain and aggregated columns selected
     * in the query.
     */
    records: ExpandedQueryRecord<S, C>[];
    /**
     * Optional extra record, only available if {@link QueryJson.totals}
     * was specified as `true` in the query, containing the aggregation
     * totals.
     */
    totals?: AggregateValuesOnly<S> & CalculationValues<C>;
}
/**
 * Converts the payload returned from the API into the statically-typed
 * form appropriate for the query.
 * @param select The {@link Query.select} property from the query.
 * @param result The response payload from the API call.
 */
export declare function expandQueryResult<S extends QuerySelect, C extends QueryCalculations<S>>(select: S, result: QueryResultJson, calcs?: C): ExpandedQueryResult<S, C>;
/**
 * The complete statically typed query mechanism.
 *
 * @param fetch Your API for performing FlowerBI queries in the JSON format
 * @param query The query in statically-typed form
 * @returns The query results in statically-typed form
 */
export declare function executeQuery<S extends QuerySelect, C extends QueryCalculations<S>>(fetch: QueryFetch, query: Query<S, C>): Promise<ExpandedQueryResult<S, C>>;
