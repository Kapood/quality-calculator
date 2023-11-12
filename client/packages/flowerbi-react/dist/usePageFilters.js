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
exports.usePageFilters = void 0;
var react_1 = require("react");
var json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
var clearedState = {
    global: [],
    interactions: [],
    interactionKey: "",
};
function usePageFilters() {
    var _a = (0, react_1.useState)(clearedState), state = _a[0], set = _a[1];
    function setInteraction(interactionKey, interactions) {
        console.log(interactionKey, state.interactionKey, state.interactionKey === interactionKey, interactions, state.interactions, (0, json_stable_stringify_1.default)(state.interactions), (0, json_stable_stringify_1.default)(interactions), (0, json_stable_stringify_1.default)(state.interactions) === (0, json_stable_stringify_1.default)(interactions));
        if (state.interactionKey === interactionKey &&
            (0, json_stable_stringify_1.default)(state.interactions) === (0, json_stable_stringify_1.default)(interactions)) {
            clearInteraction();
        }
        else {
            set(__assign(__assign({}, state), { interactionKey: interactionKey, interactions: interactions }));
        }
    }
    function setGlobal(global) {
        set(__assign(__assign({}, state), { global: global }));
    }
    function clearInteraction() {
        set(__assign(__assign({}, state), { interactionKey: "", interactions: [] }));
    }
    function clearGlobal() {
        set(__assign(__assign({}, state), { global: [] }));
    }
    function clearAll() {
        set(clearedState);
    }
    function getFilters(key) {
        var result = state.global;
        return key !== state.interactionKey ? result.concat(state.interactions) : result;
    }
    return __assign(__assign({}, state), { setInteraction: setInteraction, setGlobal: setGlobal, clearInteraction: clearInteraction, clearGlobal: clearGlobal, clearAll: clearAll, getFilters: getFilters });
}
exports.usePageFilters = usePageFilters;
//# sourceMappingURL=usePageFilters.js.map