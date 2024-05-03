export enum Roles{
    ADMIN="admin",
    EXPERT="expert",
    USER="user"
}

export const roleHierarchy = {
    admin: [Roles.ADMIN, Roles.USER, Roles.EXPERT],
    expert: [Roles.EXPERT, Roles.USER],
    user: [Roles.USER],
};
