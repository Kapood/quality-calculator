"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowerBITable = void 0;
var react_1 = __importDefault(require("react"));
var flowerbi_1 = require("flowerbi");
function renderCell(key, def) {
    var value = typeof def === "string" ? def : def[0];
    var align = typeof def === "string" ? "left" : def[1];
    return (react_1.default.createElement("td", { key: key, className: align }, value));
}
function FlowerBITable(_a) {
    var data = _a.data, columns = _a.columns;
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null, Object.keys(columns).map(function (column) { return (react_1.default.createElement("th", { key: column }, column)); }))),
        react_1.default.createElement("tbody", null, data.records.map(function (record, i) {
            var _a;
            return (react_1.default.createElement("tr", { key: (_a = JSON.stringify(record.selected)) !== null && _a !== void 0 ? _a : i }, Object.keys(columns).map(function (column) { return renderCell(column, columns[column](new flowerbi_1.QueryValuesRow(record, data.totals))); })));
        })),
        data.totals && (react_1.default.createElement("tfoot", null,
            react_1.default.createElement("tr", null, Object.keys(columns).map(function (column) { return renderCell(column, columns[column](new flowerbi_1.QueryValuesTotal(data.totals))); }))))));
}
exports.FlowerBITable = FlowerBITable;
//# sourceMappingURL=FlowerBITable.js.map