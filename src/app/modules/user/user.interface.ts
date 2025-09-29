
export enum Role {
    ADMIN = "Admin",
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: Role;
};