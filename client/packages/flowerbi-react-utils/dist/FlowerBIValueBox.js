"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowerBIValueBox = void 0;
var react_1 = __importDefault(require("react"));
var FlowerBIChartBox_1 = require("./FlowerBIChartBox");
function FlowerBIValueBox(_a) {
    var id = _a.id, value = _a.value, title = _a.title, label = _a.label;
    return (react_1.default.createElement(FlowerBIChartBox_1.FlowerBIChartBox, { id: id, title: title },
        react_1.default.createElement("div", { className: "value-box" },
            react_1.default.createElement("div", { className: "value" }, value),
            react_1.default.createElement("div", { className: "title" }, label))));
}
exports.FlowerBIValueBox = FlowerBIValueBox;
//# sourceMappingURL=FlowerBIValueBox.js.map