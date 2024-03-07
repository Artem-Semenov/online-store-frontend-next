import {
	DASHBOARD_PAGES,
	DASHBOARD_ACCESS_GROUPS,
} from "@/config/pages-url.config";
import { useServerUserRole } from "@/hooks/server/useUserRole";
import { tokensEnum } from "@/services/auth/auth.helper";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const { url, cookies } = request;

	const refreshToken = cookies.get(tokensEnum.refreshToken)?.value;
	// console.log("accessToken", refreshToken);

	const isLoginPage = url.includes("/login");
	console.log(url);

	//add role based access
	const role = await useServerUserRole();

	if (refreshToken && isLoginPage) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
	}

	if (isLoginPage) {
		return NextResponse.next();
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (
		url.includes(DASHBOARD_PAGES.ORDERS) &&
		!DASHBOARD_ACCESS_GROUPS.ORDERS.includes(role)
	) {
		return NextResponse.redirect(new URL("/404", request.url));
	}

	if (
		url.includes(DASHBOARD_PAGES.SETTINGS) &&
		!DASHBOARD_ACCESS_GROUPS.SETTINGS.includes(role)
	) {
		return NextResponse.redirect(new URL("/404", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login/:path"],
};
