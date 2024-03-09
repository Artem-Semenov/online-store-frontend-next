"use server";

import { ITokenPayload } from "@/types/auth.interface";
import { Ttokens } from "@/types/tokens.interface";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function useServerUserRole() {
	const refreshTokenPayload = await useServerRefreshTokenPayload();
	if (!refreshTokenPayload) return null;

	let role = refreshTokenPayload.role;

	return role;
}

export const useServerRefreshTokenPayload = async () => {
	const jwe = cookies().get(process.env.JWE_COOKIE_NAME!)?.value;
	if (!jwe) return null;
	const decoded = await decrypt(jwe);
	if (!decoded) return null;
	const { refreshToken } = decoded;
	// console.log("refreshToken", refreshToken);
	const refreshTokenPayload = jwtDecode<ITokenPayload>(refreshToken);

	return refreshTokenPayload;
};

export const decrypt = async (jwe: string): Promise<Ttokens | null> => {
	try {
		const privateKey = process.env.JWE_ECRYPTION_SECRET!;
		const decrypted = JSON.parse(
			AES.decrypt(jwe, privateKey).toString(enc.Utf8),
		).payload;

		// console.log("decrypted", decrypted);

		return decrypted;
	} catch (error) {
		console.log(error);
		return null;
	}
};
