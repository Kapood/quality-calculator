"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = exports.expandQueryResult = exports.getAggregateValuesOnly = exports.expandQueryRecord = exports.jsonifyQuery = void 0;
var queryModel_1 = require("./queryModel");
var arrayHelpers_1 = require("./arrayHelpers");
function jsonifyCalculation(calculation, props) {
    if (typeof calculation === "string") {
        var aggregation = props.indexOf(calculation);
        if (aggregation === -1) {
            throw new Error("Not a valid aggregation name: ".concat(calculation));
        }
        return { aggregation: aggregation };
    }
    if (typeof calculation === "number") {
        return {
            value: calculation,
        };
    }
    if (calculation instanceof Array) {
        return {
            first: jsonifyCalculation(calculation[0], props),
            operator: calculation[1],
            second: jsonifyCalculation(calculation[2], props),
        };
    }
    throw new Error("Invalid calculation");
}
function jsonifyOrdering(ordering, selects, values, calculations) {
    if ("select" in ordering) {
        var index = selects.indexOf(ordering.select);
        if (index !== -1) {
            return {
                type: "Select",
                index: index,
                descending: ordering.descending,
            };
        }
        index = values.indexOf(ordering.select);
        if (index !== -1) {
            return {
                type: "Value",
                index: index,
                descending: ordering.descending,
            };
        }
        throw new Error("Invalid ordering select key: ".concat(String(ordering.select)));
    }
    if ("calculation" in ordering) {
        var index = calculations.indexOf(ordering.calculation);
        if (index !== -1) {
            return {
                type: "Calculation",
                index: index,
                descending: ordering.descending,
            };
        }
        throw new Error("Invalid ordering calculation key: ".concat(String(ordering.calculation)));
    }
    return ordering;
}
/**
 * Converts a statically-typed {@link Query} into the {@link QueryJson}
 * format, ready to be sent to your API.
 * @param query
 */
function jsonifyQuery(query) {
    var _a;
    var select = query.select, filters = query.filters, calculations = query.calculations, orderBy = query.orderBy, totals = query.totals, take = query.take, skip = query.skip, comment = query.comment, allowDuplicates = query.allowDuplicates, fullJoins = query.fullJoins;
    var columnProps = (0, queryModel_1.getColumnPropsOnly)(select);
    var aggregationProps = (0, queryModel_1.getAggregatePropsOnly)(select);
    var calculationProps = calculations ? (0, arrayHelpers_1.keysOf)(calculations) : [];
    return {
        select: columnProps.map(function (key) { return select[key].name; }),
        aggregations: aggregationProps.map(function (key) { return select[key]; }),
        calculations: calculations ? calculationProps.map(function (key) { return jsonifyCalculation(calculations[key], aggregationProps); }) : undefined,
        filters: filters !== null && filters !== void 0 ? filters : [],
        orderBy: (_a = orderBy === null || orderBy === void 0 ? void 0 : orderBy.map(function (o) { return jsonifyOrdering(o, columnProps, aggregationProps, calculationProps); })) !== null && _a !== void 0 ? _a : [],
        totals: totals !== null && totals !== void 0 ? totals : false,
        skip: skip !== null && skip !== void 0 ? skip : 0,
        take: take !== null && take !== void 0 ? take : 100,
        comment: comment,
        allowDuplicates: allowDuplicates,
        fullJoins: fullJoins,
    };
}
exports.jsonifyQuery = jsonifyQuery;
/**
 * Converts the `QueryRecordJson` for a single record into a strongly-typed record
 * with named properties, using the {@link Query.select} from the query to perform
 * the necessary mapping.
 * @param select The {@link Query.select} property from the query.
 * @param record The record returned from your API.
 */
function expandQueryRecord(select, record, calcs) {
    var result = {};
    var n = 0;
    for (var _i = 0, _a = (0, queryModel_1.getAggregatePropsOnly)(select); _i < _a.length; _i++) {
        var key = _a[_i];
        result[key] = record.aggregated[n++];
    }
    var calculationProps = calcs ? (0, arrayHelpers_1.keysOf)(calcs) : [];
    for (var _b = 0, calculationProps_1 = calculationProps; _b < calculationProps_1.length; _b++) {
        var key = calculationProps_1[_b];
        result[key] = record.aggregated[n++];
    }
    n = 0;
    for (var _c = 0, _d = (0, queryModel_1.getColumnPropsOnly)(select); _c < _d.length; _c++) {
        var key = _d[_c];
        result[key] = record.selected[n++];
    }
    return result;
}
exports.expandQueryRecord = expandQueryRecord;
/**
 * Converts the `QueryRecordJson` from the `totals` record into a strongly-typed
 * record named properties for the aggregated values only, using the
 * {@link Query.select} from the query to perform the necessary mapping.
 *
 * @param select The {@link Query.select} property from the query.
 * @param record The {@link QueryResultJson.totals} record returned from your API.
 */
function getAggregateValuesOnly(select, record, calcs) {
    var result = {};
    var n = 0;
    for (var _i = 0, _a = (0, queryModel_1.getAggregatePropsOnly)(select); _i < _a.length; _i++) {
        var key = _a[_i];
        result[key] = record.aggregated[n++];
    }
    var calculationProps = calcs ? (0, arrayHelpers_1.keysOf)(calcs) : [];
    for (var _b = 0, calculationProps_2 = calculationProps; _b < calculationProps_2.length; _b++) {
        var key = calculationProps_2[_b];
        result[key] = record.aggregated[n++];
    }
    return result;
}
exports.getAggregateValuesOnly = getAggregateValuesOnly;
/**
 * Converts the payload returned from the API into the statically-typed
 * form appropriate for the query.
 * @param select The {@link Query.select} property from the query.
 * @param result The response payload from the API call.
 */
function expandQueryResult(select, result, calcs) {
    return {
        records: result.records.map(function (r) { return expandQueryRecord(select, r, calcs); }),
        totals: result.totals && getAggregateValuesOnly(select, result.totals, calcs),
    };
}
exports.expandQueryResult = expandQueryResult;
/**
 * The complete statically typed query mechanism.
 *
 * @param fetch Your API for performing FlowerBI queries in the JSON format
 * @param query The query in statically-typed form
 * @returns The query results in statically-typed form
 */
function executeQuery(fetch, query) {
    return __awaiter(this, void 0, void 0, function () {
        var queryJson, resultJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryJson = jsonifyQuery(query);
                    return [4 /*yield*/, fetch(queryJson)];
                case 1:
                    resultJson = _a.sent();
                    return [2 /*return*/, expandQueryResult(query.select, resultJson, query.calculations)];
            }
        });
    });
}
exports.executeQuery = executeQuery;
//# sourceMappingURL=executeQuery.js.map