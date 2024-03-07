export interface IUser {
	id: string;
	email: string;
	name: string;
	avatarPath: string;
	phone: string;
}

export enum UserRole {
	admin = "ADMIN",
	manager = "MANAGER",
	user = "USER",
}
