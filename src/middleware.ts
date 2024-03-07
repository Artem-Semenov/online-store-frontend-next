import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useServerUserRole } from "@/hooks/server/useUserRole";
import { tokensEnum } from "@/services/auth/auth.helper";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const { url, cookies } = request;

	const refreshToken = cookies.get(tokensEnum.refreshToken)?.value;
	// console.log("accessToken", refreshToken);

	const isLoginPage = url.includes("/login");

	//add role based access
	//const role = await useServerUserRole();

	if (refreshToken && isLoginPage) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
	}

	if (isLoginPage) {
		return NextResponse.next();
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login/:path"],
};
