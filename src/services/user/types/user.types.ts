export const userBaseUrl = `user`;

export interface IUserUpdateData {
	email: string;

	password?: string;

	name?: string;

	avatarPath: string;

	phone?: string;
}
