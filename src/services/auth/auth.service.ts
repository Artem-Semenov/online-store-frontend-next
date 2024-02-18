import { getContentType } from "@/api/api.helper";
import { instance } from "@/api/api.interceptor";
import {
	getRefreshToken,
	saveToStorage,
	authEnum,
} from "@/services/auth/auth.helper";

import { IAuthResponse, IEmailPassword } from "@/types/auth.interface";

import axios from "axios";

export const AuthService = {
	async main(type: authEnum, data: IEmailPassword) {
		const response = await instance<IAuthResponse>({
			url: `/auth/${type}`,
			method: "Post",
			data,
		});

		if (response.data.accessToken) saveToStorage(response.data);

		return response.data;
	},

	async getNewTokens() {
		const refreshToken = getRefreshToken();
		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + "/auth/login/access-token",
			{ refreshToken },
			{
				headers: getContentType(),
			},
		);

		if (response.data.accessToken) saveToStorage(response.data);
		return response;
	},
};
