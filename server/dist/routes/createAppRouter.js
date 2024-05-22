"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const map_routes_1 = __importDefault(require("../routes/faps/map.routes"));
const filter_routes_1 = __importDefault(require("../routes/faps/filter.routes"));
const single_routes_1 = __importDefault(require("../routes/faps/single.routes"));
const org_routes_1 = __importDefault(require("../routes/faps/org.routes"));
const view_routes_1 = __importDefault(require("../routes/faps/view.routes"));
const medical_centers_routes_1 = __importDefault(require("../routes/faps/medical_centers.routes"));
const detail_routes_1 = __importDefault(require("../routes/faps/detail.routes"));
const reports_routes_1 = __importDefault(require("../routes/faps/reports.routes"));
const area_routes_1 = __importDefault(require("../routes/faps/area.routes"));
const pdf_routes_1 = __importDefault(require("../routes/faps/pdf.routes"));
const word_routes_1 = __importDefault(require("../routes/faps/word.routes"));
const upload_routes_1 = __importDefault(require("../routes/faps/upload.routes"));
const address_routes_1 = __importDefault(require("../routes/faps/address.routes"));
const location_routes_1 = __importDefault(require("../routes/faps/location.routes"));
// expert system
const dev_routes_1 = __importDefault(require("./expert_system/dev.routes"));
const distance_routes_1 = __importDefault(require("../routes/expert_system/distance.routes"));
const user_routes_1 = __importDefault(require("../routes/expert_system/user.routes"));
const edit_routes_1 = __importDefault(require("../routes/faps/edit.routes"));
const points_routes_1 = __importDefault(require("../routes/expert_system/points.routes"));
const uploads_routes_1 = __importDefault(require("../routes/expert_system/uploads.routes"));
const auth_routes_1 = __importDefault(require("./expert_system/auth.routes"));
// guaranteed to get dependencies
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, auth_routes_1.default)(app);
    (0, map_routes_1.default)(app);
    (0, filter_routes_1.default)(app);
    (0, single_routes_1.default)(app);
    (0, org_routes_1.default)(app);
    (0, view_routes_1.default)(app);
    (0, medical_centers_routes_1.default)(app);
    (0, detail_routes_1.default)(app);
    (0, reports_routes_1.default)(app);
    (0, area_routes_1.default)(app);
    (0, pdf_routes_1.default)(app);
    (0, word_routes_1.default)(app);
    (0, upload_routes_1.default)(app);
    (0, address_routes_1.default)(app);
    (0, location_routes_1.default)(app);
    (0, edit_routes_1.default)(app);
    // expert
    (0, dev_routes_1.default)(app);
    (0, distance_routes_1.default)(app);
    (0, points_routes_1.default)(app);
    (0, user_routes_1.default)(app);
    // reports
    (0, uploads_routes_1.default)(app);
    return app;
};
//# sourceMappingURL=createAppRouter.js.map