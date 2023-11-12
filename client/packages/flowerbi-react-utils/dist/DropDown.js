"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDown = exports.useDropDown = void 0;
var react_1 = require("react");
var react_2 = __importDefault(require("react"));
function useDropDown(options) {
    var _a = (0, react_1.useState)(options[0].label), selectedLabel = _a[0], setSelectedLabel = _a[1];
    return {
        options: options.map(function (x) { return x.label; }),
        value: selectedLabel,
        onChange: function (e) {
            setSelectedLabel(e.target.value);
        },
        get selected() {
            var _a, _b;
            return (_b = (_a = options.find(function (x) { return x.label === selectedLabel; })) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : options[0].value;
        }
    };
}
exports.useDropDown = useDropDown;
function DropDown(_a) {
    var options = _a.options, value = _a.value, onChange = _a.onChange;
    return (react_2.default.createElement("select", { value: value, onChange: onChange }, options.map(function (x) { return react_2.default.createElement("option", { key: x }, x); })));
}
exports.DropDown = DropDown;
//# sourceMappingURL=DropDown.js.map