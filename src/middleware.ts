import {
	DASHBOARD_PAGES,
	DASHBOARD_ACCESS_GROUPS,
	CABINET_PAGES,
} from "@/config/pages-url.config";
import { useServerUserRole } from "@/hooks/server/useUserRole";
import { tokensEnum } from "@/services/auth/auth.helper";
import { UserRole } from "@/types/user.interface";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const { url } = request;

	const isLoginPage = url.includes("/login");
	const isDashboardPage = url.includes(DASHBOARD_PAGES.HOME);
	const isCabinetPage = url.includes(CABINET_PAGES.HOME);
	const isPublicPage = !isCabinetPage && !isDashboardPage;

	if (isPublicPage) {
		return NextResponse.next();
	}

	//TODO - check for saved language in cookie and redirect appropriate;

	const role = await useServerUserRole();
	console.log("middleware role", role);
	const isUser = role === UserRole.user;

	if (role && isLoginPage) {
		if (isUser) {
			return NextResponse.redirect(new URL(CABINET_PAGES.HOME, request.url));
		}
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
	}

	if (isLoginPage) {
		return NextResponse.next();
	}

	if (!role) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (isDashboardPage && isUser) {
		return NextResponse.redirect(new URL(CABINET_PAGES.HOME, request.url));
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
	matcher: ["/login/:path", "/dashboard/:path*", "/cabinet/:path*"],
};
