import { Query, QueryFetch, QuerySelect, ExpandedQueryResult, QueryCalculations } from "flowerbi";
export declare type UseQueryState = "init" | "ready" | "refresh" | "error";
export interface UseQueryResult<S extends QuerySelect, C extends QueryCalculations<S>> extends ExpandedQueryResult<S, C> {
    /**
     * The state of the query operation:
     *
     * - `init` - no result has been downloaded yet
     * - `ready` - result has been downloaded
     * - `refresh` - a new result is being downloaded
     * - `error` - most recent query attempt failed
     */
    state: UseQueryState;
}
/**
 * Defines another query on which our query depends - for example a
 * first query may return the top 10 vendors, and a subsequent query
 * may then use an `in` filter to get details about those 10 vendors.
 */
export declare type QueryDependency = {
    /**
     * The result of the query we depend on
     */
    dependency: UseQueryResult<QuerySelect, QueryCalculations<QuerySelect>>;
    /**
     * If true (default is false) then if the dependency query produces
     * an empty result, our query should also produce an empty result,
     * so there is no need to execute it.
     */
    nonEmpty?: boolean;
};
/**
 * A custom React hook that evaluates to the result of a
 * [Query](../flowerbi/interfaces/query.html), making it easy to perform a
 * query from within a component.
 *
 * The returned object has a strongly-typed `records` array, and optionally
 * a `totals` object. It has a `state` of type {@link UseQueryState} that
 * can be used to show a loading indicator.
 *
 * @param fetch The fetch function to use.
 * @param query The [Query](../flowerbi/interfaces/query.html) specification.
 * @param dependencies Optionally, a list of one or more other queries whose
 * results are used to build this query, so we wait for them before executing,
 * and optionally short-circuit to an empty result if the dependency is empty.
 */
export declare function useFlowerBI<S extends QuerySelect, C extends QueryCalculations<S>>(fetch: QueryFetch, query: Query<S, C>, dependencies?: QueryDependency[]): UseQueryResult<S, C>;
/**
 * Alias of useFlowerBI for backward compatibility.
 */
export declare const useQuery: typeof useFlowerBI;
