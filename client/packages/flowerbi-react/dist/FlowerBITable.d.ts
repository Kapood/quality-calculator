import { QueryValues, ExpandedQueryResult, QuerySelect, QueryCalculations } from "flowerbi";
export declare type ColumnDefinition = string | [string, "left" | "right"];
export declare type FlowerBITableProps<S extends QuerySelect, C extends QueryCalculations<S>> = {
    data: ExpandedQueryResult<S, C>;
    columns: {
        [label: string]: (record: QueryValues<S, C>) => ColumnDefinition;
    };
};
export declare function FlowerBITable<S extends QuerySelect, C extends QueryCalculations<S>>({ data, columns }: FlowerBITableProps<S, C>): JSX.Element;
