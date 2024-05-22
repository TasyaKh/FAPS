import { User } from "../entities/user.entity";
import { Roles } from "../roles";
import express from "express";
import { UserDto } from "../dto/user.dto";
export declare const signup: (newUser: {
    password: string;
    name: string;
    email: string;
}) => Promise<string>;
export declare const login: (findUser: {
    nameEmail?: string;
    password: string;
}) => Promise<string>;
export declare const verifyUserToken: (req: any, res: any, next: any) => any;
export declare function forgotPassword(email: string): Promise<void>;
export declare function resetPassword(token: string, password: string): Promise<void>;
export declare const getUser: (id: number) => Promise<User>;
export declare const checkUserRoleOrErr: (req: express.Request, res: express.Response, requiredRole: Roles) => boolean;
export declare const grantRole: (dto: UserDto) => Promise<import("typeorm").UpdateResult>;
export declare const findUsers: (dto: UserDto) => Promise<[User[], number]>;
