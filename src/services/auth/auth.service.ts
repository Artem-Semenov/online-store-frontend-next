import { axiosClassic } from "@/api/api.interceptor";
import {
	saveToStorage,
	authEnum,
	removeTokensFromStorage,
} from "@/services/auth/auth.helper";
import { IAuthResponse } from "@/services/user/types/user.types";

import { IEmailPassword, AuthForm } from "@/types/auth.interface";

export const AuthService = {
	async main(type: authEnum, data: AuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data,
		);

		if (response.data.accessToken) saveToStorage(response.data);

		return response;
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			"/auth/login/access-token",
		);

		if (response.data.accessToken) saveToStorage(response.data);
		return response;
	},

	async logout() {
		const response = await axiosClassic.post<boolean>("auth/logout");

		if (response.data) removeTokensFromStorage();
	},
};
