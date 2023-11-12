"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = exports.useFlowerBI = void 0;
var react_1 = require("react");
var flowerbi_1 = require("flowerbi");
var json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
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
function useFlowerBI(fetch, query, dependencies) {
    var queryJson = (0, flowerbi_1.jsonifyQuery)(query);
    var _a = (0, react_1.useState)("init"), state = _a[0], setState = _a[1];
    var _b = (0, react_1.useState)({ records: [] }), result = _b[0], setResult = _b[1];
    (0, react_1.useEffect)(function () {
        var disposed = false; // discard stale results
        if (dependencies === null || dependencies === void 0 ? void 0 : dependencies.length) {
            // if any not ready, neither are we
            if (dependencies.some(function (x) { return x.dependency.state !== "ready"; })) {
                if (state !== "init") {
                    setState("refresh");
                }
                return;
            }
            // if any with option nonEmpty produced empty result, so do we
            if (dependencies.filter(function (x) { return !!x.nonEmpty; }).some(function (x) { return !x.dependency.records.length; })) {
                setState("ready");
                setResult({ records: [] });
                return;
            }
        }
        if (state !== "init") {
            setState("refresh");
        }
        fetch(queryJson).then(function (x) {
            if (!disposed) {
                setState("ready");
                setResult(x);
            }
        }, function () {
            if (!disposed) {
                setState("error");
            }
        });
        return function () {
            disposed = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetch, (0, json_stable_stringify_1.default)(queryJson)]);
    return __assign(__assign({}, (0, flowerbi_1.expandQueryResult)(query.select, result, query.calculations)), { state: state });
}
exports.useFlowerBI = useFlowerBI;
/**
 * Alias of useFlowerBI for backward compatibility.
 */
exports.useQuery = useFlowerBI;
//# sourceMappingURL=useFlowerBI.js.map