import { IntegerQueryColumn, QueryColumn } from "./QueryColumn";
export declare const Customer: {
    Id: IntegerQueryColumn<number>;
    CustomerName: QueryColumn<string>;
};
export declare const Bug: {
    Id: QueryColumn<number>;
    CustomerId: QueryColumn<number>;
    Fixed: QueryColumn<boolean>;
};
