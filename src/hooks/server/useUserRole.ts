"use server";

import { tokensEnum } from "@/services/auth/auth.helper";
import { ITokenPayload } from "@/types/auth.interface";
import { UserRole } from "@/types/user.interface";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const useServerAccessTokenPayload = () => {
	const accessToken = cookies().get(tokensEnum.accessToken)?.value;
	if (!accessToken) return null;

	const decoded = jwtDecode<ITokenPayload>(accessToken);

	return decoded;
};

export async function useServerUserRole() {
	const accessTokenPayload = useServerAccessTokenPayload();
	if (!accessTokenPayload) return UserRole.user;

	let role = accessTokenPayload.role;

	return role;
}
