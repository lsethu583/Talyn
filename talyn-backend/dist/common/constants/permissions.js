"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = exports.Permission = void 0;
var Permission;
(function (Permission) {
    Permission["MENTOR_CREATE"] = "mentor:create";
    Permission["MENTOR_UPDATE"] = "mentor:update";
    Permission["MENTOR_DELETE"] = "mentor:delete";
    Permission["BOOKING_CREATE"] = "booking:create";
    Permission["WALLET_VIEW"] = "wallet:view";
    Permission["WALLET_CREDIT"] = "wallet:credit";
    Permission["ADMIN_USERS"] = "admin:users";
})(Permission || (exports.Permission = Permission = {}));
const roles_enum_1 = require("./roles.enum");
exports.ROLE_PERMISSIONS = {
    [roles_enum_1.Role.ADMIN]: Object.values(Permission),
    [roles_enum_1.Role.USER]: [Permission.BOOKING_CREATE, Permission.WALLET_VIEW],
    [roles_enum_1.Role.MENTOR]: [
        Permission.MENTOR_UPDATE,
        Permission.BOOKING_CREATE,
        Permission.WALLET_VIEW,
        Permission.WALLET_CREDIT,
    ],
    [roles_enum_1.Role.EXPERT]: [
        Permission.MENTOR_CREATE,
        Permission.MENTOR_UPDATE,
        Permission.BOOKING_CREATE,
        Permission.WALLET_VIEW,
        Permission.WALLET_CREDIT,
    ],
};
//# sourceMappingURL=permissions.js.map