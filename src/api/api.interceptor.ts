import { errorCatch, getContentType } from "@/api/api.helper";
import {
	getAccessToken,
	removeTokensFromStorage,
} from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import axios, { CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
	baseURL: process.env.SERVER_URL,
	headers: getContentType(),
	withCredentials: true,
};

export const axiosClassic = axios.create(options);

export const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken();

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === "jwt expired" ||
				errorCatch(error) === "jwt must be provided") &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				await AuthService.getNewTokens();

				return axiosWithAuth.request(originalRequest);
			} catch (e) {
				if (errorCatch(e) === "jwt expired") {
					removeTokensFromStorage();
				}
			}
		}

		throw error;
	},
);
