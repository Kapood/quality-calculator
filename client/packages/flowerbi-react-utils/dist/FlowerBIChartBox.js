"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowerBIChartBox = void 0;
var react_1 = __importDefault(require("react"));
function FlowerBIChartBox(_a) {
    var id = _a.id, title = _a.title, children = _a.children, state = _a.state;
    return (react_1.default.createElement("div", { className: "chart-box", id: id },
        react_1.default.createElement("div", { className: "title" }, title),
        react_1.default.createElement("div", { className: "chart" }, state === "init" ? (react_1.default.createElement("div", { className: "loading" }, "Loading...")) : (react_1.default.createElement(react_1.default.Fragment, null, children)))));
}
exports.FlowerBIChartBox = FlowerBIChartBox;
//# sourceMappingURL=FlowerBIChartBox.js.map