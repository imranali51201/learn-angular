import { IUser } from "./user.model";

export type LoginInput = {
    email: string;
    password: string;
    remember: boolean;
}

export interface LoginResponse extends IUser {
    token: string;
    refreshToken: string;
}