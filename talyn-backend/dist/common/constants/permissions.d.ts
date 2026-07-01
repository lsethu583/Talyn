export declare enum Permission {
    MENTOR_CREATE = "mentor:create",
    MENTOR_UPDATE = "mentor:update",
    MENTOR_DELETE = "mentor:delete",
    BOOKING_CREATE = "booking:create",
    WALLET_VIEW = "wallet:view",
    WALLET_CREDIT = "wallet:credit",
    ADMIN_USERS = "admin:users"
}
import { Role } from './roles.enum';
export declare const ROLE_PERMISSIONS: Record<Role, Permission[]>;
