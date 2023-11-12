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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = exports.Column = exports.Row = void 0;
var react_1 = __importDefault(require("react"));
function LayoutElement(_a) {
    var _b, _c;
    var children = _a.children, type = _a.type, dimension = _a.dimension, sizes = _a.sizes, otherProps = __rest(_a, ["children", "type", "dimension", "sizes"]);
    var nonNullSizes = sizes !== null && sizes !== void 0 ? sizes : [];
    var totalSize = (_c = (_b = react_1.default.Children.map(children, (function (_, i) { var _a; return (_a = nonNullSizes[i]) !== null && _a !== void 0 ? _a : 1; }))) === null || _b === void 0 ? void 0 : _b.reduce(function (l, r) { return l + r; }, 0)) !== null && _c !== void 0 ? _c : 0;
    var unit = totalSize ? 100 / totalSize : 0;
    return (react_1.default.createElement("div", __assign({}, otherProps, { style: { display: "flex", flexDirection: type, width: "100%", height: "100%" } }), react_1.default.Children.map(children, (function (child, i) {
        var _a;
        var _b;
        return (react_1.default.createElement("div", { className: "layout-item", style: (_a = {}, _a[dimension] = "".concat(unit * ((_b = nonNullSizes[i]) !== null && _b !== void 0 ? _b : 1), "%"), _a) }, child));
    }))));
}
var Row = function (props) { return react_1.default.createElement(LayoutElement, __assign({ type: "row", dimension: "width" }, props)); };
exports.Row = Row;
var Column = function (props) { return react_1.default.createElement(LayoutElement, __assign({ type: "column", dimension: "height" }, props)); };
exports.Column = Column;
function Layout(_a) {
    var children = _a.children, otherProps = __rest(_a, ["children"]);
    return react_1.default.createElement("div", __assign({}, otherProps, { className: "layout" }), children);
}
exports.Layout = Layout;
//# sourceMappingURL=Layouts.js.map