import { IAuthResponse, ITokens } from "@/services/user/types/user.types";
import Cookies from "js-cookie";

export enum tokensEnum {
	accessToken = "accessToken",
	refreshToken = "refreshToken",
}

export enum authEnum {
	login = "login",
	register = "register",
}

/* export const getAccessToken = () => {
	const accessToken = Cookies.get(tokensEnum.accessToken);

	return accessToken || null;
}; */

export const getUserFromStorage = async () => {
	return JSON.parse(localStorage.getItem("user") || "{}");
};

/* export const saveTokensStorage = (data: ITokens) => {
	Cookies.set(tokensEnum.accessToken, data.accessToken);
};
 */
/* export const removeTokensFromStorage = () => {
	Cookies.remove(tokensEnum.accessToken);

	localStorage.removeItem("user");
}; */

export const saveToStorage = (data: IAuthResponse) => {
	// saveTokensStorage(data);
	localStorage.setItem("user", JSON.stringify(data.user));
};
