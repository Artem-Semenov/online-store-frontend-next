export const userBaseUrl = `users`;

export interface IUserUpdateData {
	email: string;

	password?: string;

	name?: string;

	avatarPath: string;

	phone?: string;
}

import { IUser } from "@/types/user.interface";

export interface ITokens {
	accessToken: string;
}

export interface IEmailPassword {
	email: string;
	password: string;
}

export interface IAuthResponse extends ITokens {
	user: IUser;
}
