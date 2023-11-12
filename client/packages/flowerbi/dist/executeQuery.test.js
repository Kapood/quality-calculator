"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bug = exports.Customer = void 0;
var executeQuery_1 = require("./executeQuery");
var QueryColumn_1 = require("./QueryColumn");
exports.Customer = {
    Id: new QueryColumn_1.IntegerQueryColumn("Customer.Id"),
    CustomerName: new QueryColumn_1.QueryColumn("Customer.CustomerName"),
};
exports.Bug = {
    Id: new QueryColumn_1.QueryColumn("Bug.Id"),
    CustomerId: new QueryColumn_1.QueryColumn("Bug.CustomerId"),
    Fixed: new QueryColumn_1.QueryColumn("Bug.Fixed"),
};
test("jsonifies mixed columns", function () {
    expect((0, executeQuery_1.jsonifyQuery)({
        select: {
            customer: exports.Customer.CustomerName,
            bugCount: exports.Bug.Id.count(),
        },
    })).toStrictEqual({
        select: ["Customer.CustomerName"],
        aggregations: [
            {
                column: "Bug.Id",
                function: "Count",
                filters: undefined,
            },
        ],
        calculations: undefined,
        filters: [],
        orderBy: [],
        skip: 0,
        take: 100,
        totals: false,
        allowDuplicates: undefined,
        comment: undefined,
        fullJoins: undefined,
    });
});
test("jsonifies select", function () {
    expect((0, executeQuery_1.jsonifyQuery)({
        select: {
            customer: exports.Customer.CustomerName,
        },
    })).toStrictEqual({
        select: ["Customer.CustomerName"],
        aggregations: [],
        calculations: undefined,
        filters: [],
        orderBy: [],
        skip: 0,
        take: 100,
        totals: false,
        allowDuplicates: undefined,
        comment: undefined,
        fullJoins: undefined,
    });
});
test("jsonifies params", function () {
    expect((0, executeQuery_1.jsonifyQuery)({
        select: {},
        skip: 3,
        take: 42,
        totals: true,
        allowDuplicates: true,
        comment: "a comment",
    })).toStrictEqual({
        select: [],
        aggregations: [],
        calculations: undefined,
        filters: [],
        orderBy: [],
        skip: 3,
        take: 42,
        totals: true,
        allowDuplicates: true,
        comment: "a comment",
        fullJoins: undefined,
    });
});
test("jsonifies filters", function () {
    expect((0, executeQuery_1.jsonifyQuery)({
        select: {
            bugCount: exports.Bug.Id.count([exports.Customer.CustomerName.lessThan("z")]),
        },
        filters: [exports.Customer.CustomerName.greaterThan("a"), exports.Customer.Id.bitsIn(4 | 8, [0, 4])],
    })).toStrictEqual({
        select: [],
        aggregations: [
            {
                column: "Bug.Id",
                function: "Count",
                filters: [
                    {
                        column: "Customer.CustomerName",
                        operator: "<",
                        value: "z",
                    },
                ],
            },
        ],
        calculations: undefined,
        filters: [
            {
                column: "Customer.CustomerName",
                operator: ">",
                value: "a",
            },
            {
                column: "Customer.Id",
                operator: "BITS IN",
                constant: 12,
                value: [0, 4],
            },
        ],
        orderBy: [],
        skip: 0,
        take: 100,
        totals: false,
        allowDuplicates: undefined,
        comment: undefined,
        fullJoins: undefined,
    });
});
test("jsonifies orderBy", function () {
    expect((0, executeQuery_1.jsonifyQuery)({
        select: {},
        orderBy: [exports.Customer.CustomerName.descending()],
    })).toStrictEqual({
        select: [],
        aggregations: [],
        calculations: undefined,
        filters: [],
        orderBy: [
            {
                column: "Customer.CustomerName",
                descending: true,
            },
        ],
        skip: 0,
        take: 100,
        totals: false,
        allowDuplicates: undefined,
        comment: undefined,
        fullJoins: undefined,
    });
});
test("jsonifies calculations and ordering by keys", function () {
    expect((0, executeQuery_1.jsonifyQuery)({
        select: {
            customer: exports.Customer.CustomerName,
            bugCount: exports.Bug.Id.count(),
            bugsFixed: exports.Bug.Id.count([exports.Bug.Fixed.equalTo(true)]),
        },
        calculations: {
            successRate: [100, "*", ["bugsFixed", "/", "bugCount"]],
            failureRate: [100, "-", [100, "*", ["bugsFixed", "/", "bugCount"]]],
        },
        orderBy: [
            { select: "customer" },
            { select: "bugsFixed", descending: true },
            { calculation: "successRate" },
            { calculation: "failureRate", descending: true },
        ],
    })).toStrictEqual({
        select: ["Customer.CustomerName"],
        aggregations: [
            {
                column: "Bug.Id",
                function: "Count",
                filters: undefined,
            },
            {
                column: "Bug.Id",
                function: "Count",
                filters: [
                    {
                        column: "Bug.Fixed",
                        operator: "=",
                        value: true,
                    },
                ],
            },
        ],
        calculations: [
            {
                first: { value: 100 },
                operator: "*",
                second: {
                    first: { aggregation: 1 },
                    operator: "/",
                    second: { aggregation: 0 },
                },
            },
            {
                first: { value: 100 },
                operator: "-",
                second: {
                    first: { value: 100 },
                    operator: "*",
                    second: {
                        first: { aggregation: 1 },
                        operator: "/",
                        second: { aggregation: 0 },
                    },
                },
            },
        ],
        filters: [],
        orderBy: [
            { type: "Select", index: 0, descending: undefined },
            { type: "Value", index: 1, descending: true },
            { type: "Calculation", index: 0, descending: undefined },
            { type: "Calculation", index: 1, descending: true },
        ],
        skip: 0,
        take: 100,
        totals: false,
        allowDuplicates: undefined,
        comment: undefined,
        fullJoins: undefined,
    });
});
test("passes through JSON orderBy", function () {
    expect((0, executeQuery_1.jsonifyQuery)({
        select: {},
        orderBy: [exports.Customer.CustomerName.descending()],
    })).toStrictEqual({
        select: [],
        aggregations: [],
        calculations: undefined,
        filters: [],
        orderBy: [
            {
                column: "Customer.CustomerName",
                descending: true,
            },
        ],
        skip: 0,
        take: 100,
        totals: false,
        allowDuplicates: undefined,
        comment: undefined,
        fullJoins: undefined,
    });
});
function formatResultsFromQuery(query, result) {
    return (0, executeQuery_1.expandQueryResult)(query.select, result, query.calculations);
}
test("generates typed results", function () {
    var result = formatResultsFromQuery({
        select: {
            customer: exports.Customer.CustomerName,
            bugCount: exports.Bug.Id.count(),
            bugsFixed: exports.Bug.Id.count([exports.Bug.Fixed.equalTo(true)]),
        },
        calculations: {
            successRate: [100, "*", ["bugsFixed", "/", "bugCount"]],
            failureRate: [100, "-", [100, "*", ["bugsFixed", "/", "bugCount"]]],
        },
        orderBy: [
            { select: "customer" },
            { select: "bugsFixed", descending: true },
            { calculation: "successRate" },
            { calculation: "failureRate", descending: true },
        ],
    }, {
        records: [
            {
                selected: ["woolworths"],
                aggregated: [3, 1, 33.33, 66.67],
            },
        ],
    });
    expect(result).toStrictEqual({
        records: [{ customer: "woolworths", bugCount: 3, bugsFixed: 1, successRate: 33.33, failureRate: 66.67 }],
        totals: undefined,
    });
});
test("generates typed results with totals", function () {
    var result = formatResultsFromQuery({
        select: {
            customer: exports.Customer.CustomerName,
            bugCount: exports.Bug.Id.count(),
            bugsFixed: exports.Bug.Id.count([exports.Bug.Fixed.equalTo(true)]),
        },
        calculations: {
            successRate: [100, "*", ["bugsFixed", "/", "bugCount"]],
            failureRate: [100, "-", [100, "*", ["bugsFixed", "/", "bugCount"]]],
        },
        orderBy: [
            { select: "customer" },
            { select: "bugsFixed", descending: true },
            { calculation: "successRate" },
            { calculation: "failureRate", descending: true },
        ],
    }, {
        records: [
            {
                selected: ["woolworths"],
                aggregated: [3, 1, 33.33, 66.67],
            },
        ],
        totals: {
            selected: [""],
            aggregated: [4, 2, 50, 50],
        },
    });
    expect(result).toStrictEqual({
        records: [{ customer: "woolworths", bugCount: 3, bugsFixed: 1, successRate: 33.33, failureRate: 66.67 }],
        totals: { bugCount: 4, bugsFixed: 2, successRate: 50, failureRate: 50 },
    });
});
//# sourceMappingURL=executeQuery.test.js.map