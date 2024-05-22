"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleHierarchy = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "admin";
    Roles["EXPERT"] = "expert";
    Roles["USER"] = "user";
})(Roles || (exports.Roles = Roles = {}));
exports.roleHierarchy = {
    admin: [Roles.ADMIN, Roles.USER, Roles.EXPERT],
    expert: [Roles.EXPERT, Roles.USER],
    user: [Roles.USER],
};
//# sourceMappingURL=roles.js.map