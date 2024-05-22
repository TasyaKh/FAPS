"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeData = void 0;
const mappings_js_1 = __importDefault(require("../mappings.js"));
const getAddress_js_1 = require("./getAddress.js");
const normalizeData = (rows, haveAddress = false) => {
    for (const row of rows) {
        if (haveAddress) {
            row.address = (0, getAddress_js_1.getAddress)(row);
            delete row.region_name;
            delete row.locality_name;
            delete row.district_name;
            delete row.number_of_house;
            delete row.street;
        }
        for (const key of Object.keys(row)) {
            if (row[key] === null) {
                row[key] = '-';
            }
            else {
                for (const mapping of mappings_js_1.default) {
                    if (key === mapping.fullQueryName && mapping.binary) {
                        row[key] = parseInt(row[key]) === 1 ? 'Есть' : 'Нет';
                    }
                }
            }
        }
    }
};
exports.normalizeData = normalizeData;
//# sourceMappingURL=normalizeData.js.map